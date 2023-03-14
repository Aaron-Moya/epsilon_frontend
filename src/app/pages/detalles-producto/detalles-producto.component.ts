import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Productos } from 'src/app/shared/interfaces/productos';
import { ProductoService } from 'src/app/shared/services/producto.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalles-producto',
  templateUrl: './detalles-producto.component.html',
  styleUrls: ['./detalles-producto.component.css']
})
export class DetallesProductoComponent implements OnInit {

  producto: Productos = new Productos();

  constructor(private productoService: ProductoService, private usuarioService: UsuarioService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const idProducto = params['id'];
      this.productoService.obtenerProductoPorId(idProducto).subscribe(prod => {
        this.producto = prod;
      });
    });
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
