import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Categorias } from 'src/app/shared/interfaces/categorias';
import { Productos } from 'src/app/shared/interfaces/productos';
import { CategoriaService } from 'src/app/shared/services/categoria.service';
import { CestaService } from 'src/app/shared/services/cesta.service';
import { ProductoService } from 'src/app/shared/services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {

  categorias!: Categorias[];
  productos!: Productos[];
  page = 0;
  size = 6;
  totalElements = 0;

  hayFiltros: boolean = false;

  formFiltros: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    descripcion: new FormControl(''),
    estado: new FormControl(''),
    categoria: new FormControl(''),
    stock: new FormControl(''),
    precio: new FormControl('')
  });

  constructor(private productoService: ProductoService, private categoriaService: CategoriaService, private cestaService: CestaService) {
    this.categoriaService.obtenerCategorias().subscribe(categorias => {
      this.categorias = categorias;
    });
    if (ProductoService.hayFiltros()) {
      this.hayFiltros = true;
      this.rellenarCamposFiltros();
    }
  }

  ngOnInit(): void {
    if (!this.hayFiltros)
      this.getProductos();
    else
      this.getProductosPorFiltro();
  }

  getProductos(): void {
    this.productoService.obtenerProductos(this.page, this.size).subscribe((data: any) => {
      this.productos = data.content;
      this.totalElements = data.totalElements;
    });

  }

  getProductosPorFiltro(): void {
    this.productoService.obtenerProductosPorFiltro(this.page, this.size).subscribe((data: any) => {
      this.productos = data.content;
      this.totalElements = data.totalElements;
    });
  }


  getProductosPorFiltroCategoria(categoria: string): void {
    ProductoService.filtros.categoria = categoria;

    this.productoService.obtenerProductosPorFiltro(this.page, this.size).subscribe((data: any) => {
      this.productos = data.content;
      this.totalElements = data.totalElements;
    });
    this.hayFiltros = true;
    this.rellenarCamposFiltros();
  }

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.getProductosPorFiltro();
  }

  addProductoFavorito(idProducto: number): void {
    const idUsuario = localStorage.getItem('idUsuarioLogueado');
    let error = false;

    if (idUsuario != null) {
      this.productos.forEach(prod => {
        if (prod.id == idProducto && prod.usuarios.id === parseInt(idUsuario)) {
          Swal.fire({
            icon: 'info',
            title: '¡No puedes añadir tu propio producto a favoritos!',
          });
          error = true;
        }
      })
    }

    if (idUsuario != null && !error) {
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

  addProductoCesta(idProducto: number): void {
    const idUsuario = localStorage.getItem('idUsuarioLogueado');
    let error = false;

    if (idUsuario != null) {
      this.productos.forEach(prod => {
        if (prod.id == idProducto && prod.usuarios.id === parseInt(idUsuario)) {
          Swal.fire({
            icon: 'info',
            title: '¡No puedes añadir tu propio producto a la cesta!',
          });
          error = true;
        }
      });
    }

    if (!error) {
      this.productos.forEach(prod => {
        if (prod.id == idProducto && prod.stock <= 0) {
          Swal.fire({
            icon: 'info',
            title: '¡No puedes añadir un producto sin stock a la cesta!',
          });
          error = true;
        }
      })
    }

    if (idUsuario != null && !error) {
      this.cestaService.addProductoCesta(parseInt(idUsuario), idProducto).subscribe(data => {
        Swal.fire({
          icon: 'info',
          title: '¡Producto añadido a la cesta!',
        });
        console.log(data);
      }, err => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: '¡Error al añadir el producto a la cesta!',
        });
      });
    }
  }

  onSubmitFiltros(): void {
    if (this.formFiltros.valid) {
      if (this.formFiltros.controls['nombre'].value != undefined && this.formFiltros.controls['nombre'] != null && this.formFiltros.controls['nombre'].value.length > 0) {
        ProductoService.filtros.nombre = this.formFiltros.controls['nombre'].value;
      } else {
        ProductoService.filtros.nombre = undefined;
      }

      if (this.formFiltros.controls['estado'].value != undefined && this.formFiltros.controls['estado'] != null && this.formFiltros.controls['estado'].value.length > 0) {
        ProductoService.filtros.estado = this.formFiltros.controls['estado'].value;
      } else {
        ProductoService.filtros.estado = undefined;
      }
      if (this.formFiltros.controls['stock'].value != undefined && this.formFiltros.controls['stock'] != null && this.formFiltros.controls['stock'].value > 0) {
        ProductoService.filtros.stock = this.formFiltros.controls['stock'].value;
      } else {
        ProductoService.filtros.stock = undefined;
      }

      if (this.formFiltros.controls['precio'].value != undefined && this.formFiltros.controls['precio'] != null && this.formFiltros.controls['precio'].value > 0) {
        ProductoService.filtros.precio = this.formFiltros.controls['precio'].value;
      } else {
        ProductoService.filtros.precio = undefined;
      }

      this.getProductosPorFiltro();
    }
  }

  rellenarCamposFiltros(): void {
    if (ProductoService.filtros.nombre != undefined) {
        this.formFiltros.controls['nombre'].setValue(ProductoService.filtros.nombre);  
    }
  }

  limpiarFiltros(): void {
    this.formFiltros.controls['nombre'].setValue('');
    this.formFiltros.controls['estado'].setValue('');
    this.formFiltros.controls['stock'].setValue('');
    this.formFiltros.controls['precio'].setValue('');
    ProductoService.filtros.nombre = undefined;
    ProductoService.filtros.categoria = undefined;
    ProductoService.filtros.estado = undefined;
    ProductoService.filtros.stock = undefined;
    ProductoService.filtros.precio = undefined;

    this.getProductos();
  }
}
