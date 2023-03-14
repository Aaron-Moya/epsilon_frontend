import { Component, OnInit } from '@angular/core';
import { Productos } from 'src/app/shared/interfaces/productos';
import { ProductoService } from 'src/app/shared/services/producto.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {

  productos!: Productos[];
  
  constructor(private productoService: ProductoService, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    let idUsuario = localStorage.getItem('idUsuarioLogueado');
    if (idUsuario != null) {
      this.productoService.obtenerProductosFavoritos(parseInt(idUsuario)).subscribe((data: any ) => {
        this.productos = data;
        this.productos.sort((a,b) => a.nombre.localeCompare(b.nombre));
      });
    }
  }

  eliminarProductoFavorito(idProducto: number) {
    const idUsuario = localStorage.getItem('idUsuarioLogueado');
      if (idUsuario != null) {
        this.productoService.deleteProductoFavorito(parseInt(idUsuario), idProducto).subscribe(data => {
          Swal.fire({
            icon: 'info',
            title: '¡Producto eliminado de favoritos!',
          });
          this.productoService.obtenerProductosFavoritos(parseInt(idUsuario)).subscribe((data: any ) => {
            this.productos = data;
            this.productos.sort((a,b) => a.nombre.localeCompare(b.nombre));
          });
          console.log(data);
        }, err => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: '¡Error al eliminar el producto de favoritos!',
          });
        });
      }
  }
}
