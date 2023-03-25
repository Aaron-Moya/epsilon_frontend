import { AfterViewInit, Component, OnInit, SimpleChanges } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Usuarios } from '../../interfaces/usuarios';
import { ProductoService } from '../../services/producto.service';
import { UsuarioLogueadoService } from '../../services/usuario-logueado.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  usuarioLogueado!: Usuarios;
  nombreProducto: String = "";

  constructor(private usuarioService: UsuarioService, private usuarioLogueadoService: UsuarioLogueadoService, private router: Router) { }

  ngOnInit(): void {
    // Actualiza el usuario logueado si se han detectado cambios
    this.usuarioLogueadoService.usuarioLogueado$.subscribe(usuario => {
      this.usuarioLogueado = usuario;
      const idUsuarioLogueado = localStorage.getItem('idUsuarioLogueado');
      if (idUsuarioLogueado != null && idUsuarioLogueado.length > 0) {
        this.usuarioService.obtenerUsuarioPorId(parseInt(idUsuarioLogueado)).subscribe(usuario => {
          this.usuarioLogueado = usuario;
        });
      }
    })
  }

  irAInicio(): void {
    ProductoService.filtros = new Map();
    this.router.navigate(['/']);
  }

  irAFavoritos(): void {
    this.router.navigate(['/favoritos']);
  }

  clickMenuItem(opcion: string): void {
    const extras: NavigationExtras = {
      state: {
        opcionMenu: opcion
      }
    };
    if (opcion == "cerrarSesion") this.cerrarSesion();
    else {
      this.router.navigate(['/me'], extras);
    }

  }

  cerrarSesion(): void {
    this.usuarioLogueadoService.cerrarSesion();
    this.router.navigate(['/']);
  }

  filtrarProductos(): void {
    const filtros: { [id: string]: String; } = {};
    filtros['nombre'] = this.nombreProducto;

    ProductoService.filtros.set('nombre', this.nombreProducto);

    /*const extras: NavigationExtras = {
      state: {
        filtros: filtros
      }
    };*/
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    this.router.onSameUrlNavigation = 'reload';
    //this.router.navigate(['/anuncios'], extras);
    this.router.navigate(['/anuncios']);
  }
}
