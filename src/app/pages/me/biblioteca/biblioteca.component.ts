import { Component, OnInit } from '@angular/core';
import { ProductoBibliotecaDTO } from '../../../shared/interfaces/ProductoBibliotecaDTO';
import { ProductoService } from 'src/app/shared/services/producto.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';

@Component({
  selector: 'biblioteca',
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.css']
})
export class BibliotecaComponent implements OnInit {

  productos: ProductoBibliotecaDTO[] = [];
  idUsuario!: any;
  constructor(private productoService: ProductoService, private usuarioService: UsuarioService) {
    this.idUsuario = localStorage.getItem('idUsuarioLogueado');

  }

  ngOnInit(): void {
    if (this.idUsuario != null) {
      this.productoService.obtenerProductosBiblioteca(parseInt(this.idUsuario)).subscribe((data: any ) => {
        this.productos = data;
        this.productos.sort((a,b) => a.nombre.localeCompare(b.nombre));
      });
    }
  }

}
