import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Productos } from 'src/app/shared/interfaces/productos';
import { ProductoService } from 'src/app/shared/services/producto.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {

  productos!: Productos[];
  page = 0;
  size = 6;
  totalElements = 0;

  constructor(private productoService: ProductoService, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.productoService.obtenerProductos(this.page, this.size).subscribe((data: any )=> {
      this.productos = data.content;
      this.totalElements = data.totalElements;
    })
  }

  getProductos(): void {
    this.productoService.obtenerProductos(this.page, this.size).subscribe((page: any) => {
      this.productos = page.content;
      this.totalElements = page.totalElements;
    });
  }

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.getProductos();
  }

  addProductoFavorito(idProducto: number): void {
      const idUsuario = localStorage.getItem('idUsuarioLogueado');
      if (idUsuario != null) {
        this.productoService.addProductoFavorito(parseInt(idUsuario), idProducto).subscribe(data => {
          Swal.fire({
            icon: 'info',
            title: '¡Producto añadido a favoritos!',
          });
          console.log(data);
        }, err => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: '¡Error al añadir el producto a favoritos!',
          });
        });
      }
  }

}
