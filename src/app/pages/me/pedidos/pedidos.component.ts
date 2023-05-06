import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Ventas } from 'src/app/shared/interfaces/ventas';
import { VentaService } from 'src/app/shared/services/venta.service';

@Component({
  selector: 'pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  pedidos: Ventas[] = [];
  columnas: string[] = ['id', 'fechaVenta', 'totalProductos', 'total'];
  dataSource!: MatTableDataSource<Ventas>;
  
  constructor(private ventaService: VentaService) {
    const idUsuario = localStorage.getItem('idUsuarioLogueado');
    if (idUsuario != null) {
      this.ventaService.obtenerPedidos(parseInt(idUsuario)).subscribe(data => {
        this.pedidos = data;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;

      });
    }
   }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
  }
  
  ngOnInit(): void {
    
    
  }

}
