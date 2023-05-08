import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { VentasProductosDTO } from 'src/app/shared/interfaces/ventasProductosDTO';
import { VentaService } from 'src/app/shared/services/venta.service';

@Component({
  selector: 'ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  ventas: VentasProductosDTO[] = [];
  columnas: string[] = ['idVenta', 'fechaVenta', 'nombre', 'estado', 'precio', 'descuento', 'cantidad', 'total'];
  dataSource!: MatTableDataSource<VentasProductosDTO>;
  
  constructor(private ventaService: VentaService) {
    const idUsuario = localStorage.getItem('idUsuarioLogueado');
    if (idUsuario != null) {
      this.ventaService.obtenerVentas(parseInt(idUsuario)).subscribe(data => {
        this.ventas = data;
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
