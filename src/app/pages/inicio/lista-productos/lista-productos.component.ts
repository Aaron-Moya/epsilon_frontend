import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Productos } from 'src/app/shared/interfaces/productos';
import { ProductoService } from 'src/app/shared/services/producto.service';

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

  constructor(private productoService: ProductoService) { }

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

}
