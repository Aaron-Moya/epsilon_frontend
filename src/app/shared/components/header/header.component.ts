import { AfterViewInit, Component, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Usuarios } from '../../interfaces/usuarios';
import { UsuarioLogueadoService } from '../../services/usuario-logueado.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  usuarioLogueado!: Usuarios;

  constructor(private usuarioService: UsuarioService, private usuarioLogueadoService: UsuarioLogueadoService, private router:Router) { }

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

  cerrarSesion(): void {
    this.usuarioLogueadoService.cerrarSesion();
    this.router.navigate(['/']);
  }
}
