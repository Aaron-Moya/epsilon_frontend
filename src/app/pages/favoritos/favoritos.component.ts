import { Component, OnInit } from '@angular/core';
import { Productos } from 'src/app/shared/interfaces/productos';
import { ProductoService } from 'src/app/shared/services/producto.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {

  productos!: Productos[];
  
  constructor(private productoService: ProductoService, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    let idUsuario = localStorage.getItem('idUsuarioLogueado');
    if (idUsuario != null) {
      this.usuarioService.obtenerProductosFavoritos(parseInt(idUsuario)).subscribe((data: any ) => {
        this.productos = data;
        console.log(this.productos);
      });
    }
  }

}
