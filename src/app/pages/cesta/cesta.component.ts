import { Component, OnInit } from '@angular/core';
import { Cestas } from 'src/app/shared/interfaces/cestas';
import { Productos } from 'src/app/shared/interfaces/productos';
import { CestaService } from 'src/app/shared/services/cesta.service';
import { ProductoService } from 'src/app/shared/services/producto.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'cesta',
  templateUrl: './cesta.component.html',
  styleUrls: ['./cesta.component.css']
})
export class CestaComponent implements OnInit {

  productos: Productos[] = [];
  cestas: Cestas[] = [];
  idUsuario!: any;

  total: number = 0;
  subtotal: number = 0;

  constructor(private cestaService: CestaService, private productoService: ProductoService, private usuarioService: UsuarioService) { 
    this.idUsuario = localStorage.getItem('idUsuarioLogueado');
  }

  ngOnInit(): void {
    if (this.idUsuario != null) {
      this.cestaService.obtenerCestasUsuario(parseInt(this.idUsuario)).subscribe((data: any ) => {
        this.cestas = data;
        data.forEach((d: { idProducto: number; }) => {
          this.productoService.obtenerProductoPorId(d.idProducto).subscribe((prod: Productos ) => {
            this.productos.push(prod);
            this.cambiarTotal();
            this.productos.sort((a,b) => a.nombre.localeCompare(b.nombre));
          });
        });
      });
    }

    
  }

  getCantidadCesta(idProducto: number) : number {
    let cantidad = 1;
    this.cestas.forEach(cesta => {
      if (cesta.idProducto == idProducto) cantidad = cesta.cantidad;
    });
    return cantidad;
  }

  addProductoCesta(idProducto: number): void {
    let producto = new Productos();
    this.productos.forEach(prod => {
      if (prod.id == idProducto) producto = prod;
    });

    this.cestas.forEach(cesta => {
      if (cesta.idProducto == idProducto) {
        if (cesta.cantidad == producto.stock) {
          console.log("No se puede aumentar la cantidad ya que excede el stock");
        }
        else {
          this.cestaService.addProductoCesta(this.idUsuario, idProducto).subscribe((data : any) => {
            if (data.mensaje == "Producto añadido a la cesta correctamente") {
              cesta.cantidad++;
              this.cambiarTotal();
            }
          });
        }
      }
    });
  }

  disminuirCantidad(idProducto: number): void {
    let producto = new Productos();
    this.productos.forEach(prod => {
      if (prod.id == idProducto) producto = prod;
    });

    this.cestas.forEach(cesta => {
      if (cesta.idProducto == idProducto) {
        if (cesta.cantidad == 1) {
          console.log("La cantidad no puede ser 0");
        }
        else {
          this.cestaService.disminuirCantidad(this.idUsuario, idProducto).subscribe((data : any) => {
            if (data.mensaje == "Cantidad disminuida correctamente") {
              cesta.cantidad--;
              this.cambiarTotal();
            }
          });
        }
      }
    });
  }

  eliminarProductoCesta(idProducto: number) : void {
    const idUsuario = localStorage.getItem('idUsuarioLogueado');
    let idCesta = null;
    this.cestas.forEach(cesta => {
      if (cesta.idProducto == idProducto) idCesta = cesta.id;
    });


      if (idUsuario != null && idCesta != null) {
        this.cestaService.deleteProductoCesta(idCesta).subscribe(data => {
          Swal.fire({
            icon: 'info',
            title: '¡Producto eliminado de la cesta!',
          });
          this.cestaService.obtenerCestasUsuario(parseInt(this.idUsuario)).subscribe((data: any ) => {
            this.cestas = data;
            this.productos = [];
            data.forEach((d: { idProducto: number; }) => {
              this.productoService.obtenerProductoPorId(d.idProducto).subscribe((prod: Productos ) => {
                this.productos.push(prod);
                this.cambiarTotal();
              });
            });
          });
        }, err => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: '¡Error al eliminar el producto de la cesta!',
          });
        });
      }
  }

  cambiarTotal(): void {
    this.total = 0;
    this.subtotal = 0;
    this.productos.forEach(prod => {
      this.cestas.forEach(cesta => {
        if (cesta.idProducto == prod.id) {
          this.total += prod.precio * cesta.cantidad;
          this.subtotal += (prod.precio * cesta.cantidad) - (prod.descuento * cesta.cantidad);
        }
      });
    });
    /*this.total = this.productos.map(prod => prod.precio).reduce((total, item) => total + item);
    this.subtotal = (this.productos.map(prod => prod.precio).reduce((total, item) => total + item))
                      - (this.productos.map(prod => prod.descuento).reduce((total, item) => total + item));*/

  }
}
