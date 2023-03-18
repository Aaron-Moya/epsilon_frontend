import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Productos } from 'src/app/shared/interfaces/productos';
import { ProductoService } from 'src/app/shared/services/producto.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'mis-anuncios',
  templateUrl: './mis-anuncios.component.html',
  styleUrls: ['./mis-anuncios.component.css']
})
export class MisAnunciosComponent implements OnInit {

  productos!: Productos[];
  idUsuario = localStorage.getItem('idUsuarioLogueado');
  page = 0;
  size = 3;
  totalElements = 0;
  constructor(private productoService: ProductoService, private router: Router) { }

  ngOnInit(): void {
      this.getProductosUsuario();
  }

  getProductosUsuario(): void {
    if (this.idUsuario != null) {
      this.productoService.obtenerProductosDeUsuario(this.page, this.size, parseInt(this.idUsuario)).subscribe((page: any) => {
        this.productos = page.content;
        this.totalElements = page.totalElements;
      });
    }
  }

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.getProductosUsuario();
  }

  editarProducto(idProducto: number) : void {
    this.router.navigate(['/editar-anuncio', idProducto]);
  }

  eliminarProducto(idProducto: number) : void {
    this.productoService.deleteProducto(idProducto).subscribe(data => {
      Swal.fire({
        icon: 'success',
        title: '¡Anuncio borrado correctamente!',
      });
      this.getProductosUsuario();
    }, err => {
      Swal.fire({
        icon: 'error',
        title: '¡Error al borrar el anuncio!',
      });
      console.log(err);
    });
  }
}
