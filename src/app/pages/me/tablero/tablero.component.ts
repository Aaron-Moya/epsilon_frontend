import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { ProductoBibliotecaDTO } from 'src/app/shared/interfaces/ProductoBibliotecaDTO';
import { Ventas } from 'src/app/shared/interfaces/ventas';
import { VentasProductosDTO } from 'src/app/shared/interfaces/ventasProductosDTO';
import { ProductoService } from 'src/app/shared/services/producto.service';
import { VentaService } from 'src/app/shared/services/venta.service';

@Component({
  selector: 'tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {

  idUsuario!: number;
  ventas: VentasProductosDTO[] = [];
  pedidos: Ventas[] = [];
  productos!: ProductoBibliotecaDTO[];

  totalPedidosRealizados: number = 0;
  pedidosRealizadosMes: number = 0;
  ventasRealizadasMes: number = 0;
  totalProductosComprados: number = 0;
  totalDineroGastado: number = 0;
  totalDineroGanado: number = 0;


  constructor(private productoService: ProductoService, private ventasService: VentaService) {
    this.idUsuario = parseInt(localStorage.getItem('idUsuarioLogueado')!);
   }

  ngOnInit(): void {
    this.ventasService.obtenerVentas(this.idUsuario).subscribe(data => {
      this.ventas = data;
      this.setVentasRealizadasMes();
      this.setTotalDineroGanado();
    });

    this.ventasService.obtenerPedidos(this.idUsuario).subscribe(data => {
      this.pedidos = data;
      this.setTotalPedidosRealizados();
      this.setPedidosRealizadosMes();
      this.setTotalDineroGastado();
    });

    this.setTotalProductosBiblioteca();
  }

  setTotalPedidosRealizados(): void {
    this.totalPedidosRealizados = this.pedidos.length;
  }

  setPedidosRealizadosMes(): void {
    this.pedidos.forEach(p =>  {
      let fecha = new Date(p.fechaVenta);

      if (fecha.getMonth() === new Date().getMonth()) {
        this.pedidosRealizadosMes++;
      }
    });
  }

  setVentasRealizadasMes(): void {
    this.ventas.forEach(p =>  {
      let fecha = new Date(p.fechaVenta);

      if (fecha.getMonth() === new Date().getMonth()) {
        this.ventasRealizadasMes++;
      }
    });
  }

  setTotalProductosBiblioteca(): void {
    this.productoService.obtenerProductosBiblioteca(this.idUsuario)
    .pipe(
      finalize(() => {
        this.productos.forEach(p => this.totalProductosComprados += p.cantidad);
      })
    )
    .subscribe((data: any ) => {
      this.productos = data;
    });
  }

  setTotalDineroGastado(): void {
    this.pedidos.forEach(p => {
      this.totalDineroGastado += p.total;
      let fecha = new Date(p.fechaVenta);
      if (fecha.getMonth() === new Date().getMonth()) {
        this.totalDineroGastado += p.total;
      }
    });
  }

  setTotalDineroGanado(): void {
    this.ventas.forEach(v => {
      let fecha = new Date(v.fechaVenta);
      if (fecha.getMonth() === new Date().getMonth()) {
        this.totalDineroGanado += v.total;
      }
    });
  }
}
