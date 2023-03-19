import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Productos } from 'src/app/shared/interfaces/productos';
import { Usuarios } from 'src/app/shared/interfaces/usuarios';
import { ProductoService } from 'src/app/shared/services/producto.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';

@Component({
  selector: 'usuario',
  templateUrl: './detalles-usuario.component.html',
  styleUrls: ['./detalles-usuario.component.css']
})
export class DetallesUsuarioComponent implements OnInit {

  usuario: Usuarios = new Usuarios();
  productos!: Productos[];

  page = 0;
  size = 3;
  totalElements = 0;
  
  constructor(private usuarioService: UsuarioService, private productoService: ProductoService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const idUsuario = params['id'];
      this.usuarioService.obtenerUsuarioPorId(idUsuario).subscribe(data => {
        this.usuario = data;
        this.getProductosUsuario();
      });
    });
  }

  getProductosUsuario(): void {
    if (this.usuario != null) {
      this.productoService.obtenerProductosDeUsuario(this.page, this.size, this.usuario.id).subscribe((page: any) => {
        this.productos = page.content;
        this.totalElements = page.totalElements;
      });
    }
  }

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.getProductosUsuario();
  }

}
