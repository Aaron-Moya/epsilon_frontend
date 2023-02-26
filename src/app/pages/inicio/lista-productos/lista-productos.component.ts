import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/shared/services/producto.service';

@Component({
  selector: 'lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {

  data!: any[];
  length = 0;
  pageSize = 5;
  pageIndex = 0;

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.productoService.obtenerProductos(this.pageIndex, this.pageSize).subscribe((data: any )=> {
      this.data = data.content;
      // console.log(this.data);
    })
  }

}
