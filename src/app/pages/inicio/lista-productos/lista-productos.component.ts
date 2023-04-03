import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Categorias } from 'src/app/shared/interfaces/categorias';
import { Productos } from 'src/app/shared/interfaces/productos';
import { CategoriaService } from 'src/app/shared/services/categoria.service';
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

  constructor(private productoService: ProductoService, private categoriaService: CategoriaService) {
    this.categoriaService.obtenerCategorias().subscribe(categorias => {
      this.categorias = categorias;
    });
  }

  ngOnInit(): void {
    if (ProductoService.comprobarFiltrosVacios())
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
}
