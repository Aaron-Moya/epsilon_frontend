import { Component, OnInit } from '@angular/core';
import { Productos } from 'src/app/shared/interfaces/productos';
import { ProductoService } from 'src/app/shared/services/producto.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'cesta',
  templateUrl: './cesta.component.html',
  styleUrls: ['./cesta.component.css']
})
export class CestaComponent implements OnInit {

  productos!: Productos[];
  idUsuario!: any;
  constructor(private productoService: ProductoService, private usuarioService: UsuarioService) { 
    this.idUsuario = localStorage.getItem('idUsuarioLogueado');

  }

  ngOnInit(): void {
    /*if (this.idUsuario != null) {
      this.productoService.obtenerProductosCesta(parseInt(this.idUsuario)).subscribe((data: any ) => {
        this.productos = data;
        this.productos.sort((a,b) => a.nombre.localeCompare(b.nombre));
      });
    }*/
  }

  eliminarProductoCesta(idProducto: number) : void {
    
  }

  /*eliminarProductoFavorito(idProducto: number) {
    const idUsuario = localStorage.getItem('idUsuarioLogueado');
      if (idUsuario != null) {
        this.productoService.deleteProductoFavorito(parseInt(idUsuario), idProducto).subscribe(data => {
          Swal.fire({
            icon: 'info',
            title: '¡Producto eliminado de cesta!',
          });
          this.productoService.obtenerProductoscesta(parseInt(idUsuario)).subscribe((data: any ) => {
            this.productos = data;
            this.productos.sort((a,b) => a.nombre.localeCompare(b.nombre));
          });
          console.log(data);
        }, err => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: '¡Error al eliminar el producto de cesta!',
          });
        });
      }
  }*/
}
