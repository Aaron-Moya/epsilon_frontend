import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Productos } from 'src/app/shared/interfaces/productos';
import { ProductoService } from 'src/app/shared/services/producto.service';

@Component({
  selector: 'app-detalles-producto',
  templateUrl: './detalles-producto.component.html',
  styleUrls: ['./detalles-producto.component.css']
})
export class DetallesProductoComponent implements OnInit {

  producto!: Productos;

  constructor(private productoService: ProductoService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const idProducto = params['id'];
      this.productoService.obtenerProductoPorId(idProducto).subscribe(prod => {
        this.producto = prod;
        console.log(this.producto);
      });
    });

  }

}
