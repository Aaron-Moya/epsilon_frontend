import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Productos } from 'src/app/shared/interfaces/productos';
import { Usuarios } from 'src/app/shared/interfaces/usuarios';
import { CestaService } from 'src/app/shared/services/cesta.service';
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

  constructor(private productoService: ProductoService, private cestaService: CestaService, private activatedRoute: ActivatedRoute) { }

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
    let error = false;

    if (idUsuario != null) {
      if (this.producto.usuarios.id == parseInt(idUsuario)) {
        Swal.fire({
          icon: 'info',
          title: '¡No puedes añadir tu propio producto a favoritos!',
        });
        error = true;
      }
    }

    if (idUsuario != null && !error) {
      this.productoService.addProductoFavorito(parseInt(idUsuario), idProducto).subscribe(data => {
        Swal.fire({
          icon: 'info',
          title: '¡Producto añadido a favoritos!',
        });
      }, err => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: '¡Error al añadir el producto a favoritos!',
        });
      });
    }
  }

  addProductoCesta(idProducto: number): void {
    const idUsuario = localStorage.getItem('idUsuarioLogueado');
    let error = false;

    if (idUsuario != null) {
        if (this.producto.usuarios.id === parseInt(idUsuario)) {
          Swal.fire({
            icon: 'info',
            title: '¡No puedes añadir tu propio producto a la cesta!',
          });
          error = true;
        }
    }

    if (!error) {
      if (this.producto.stock <= 0) {
        Swal.fire({
          icon: 'info',
          title: '¡No puedes añadir un producto sin stock a la cesta!',
        });
        error = true;
      }
    }

    if (idUsuario != null && !error) {
      this.cestaService.addProductoCesta(parseInt(idUsuario), idProducto).subscribe(data => {
        Swal.fire({
          icon: 'info',
          title: '¡Producto añadido a la cesta!',
        });
      }, err => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: '¡Error al añadir el producto a la cesta!',
        });
      });
    }
  }

}
