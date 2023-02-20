import { AfterViewInit, Component, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Usuarios } from '../../interfaces/usuarios';
import { UsuarioLogueadoService } from '../../services/usuario-logueado.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  usuarioLogueado: any;

  constructor(private usuarioLogueadoService: UsuarioLogueadoService, private router:Router) { }

  ngOnInit(): void {
    // Actualiza el usuario logueado si se han detectado cambios
    this.usuarioLogueadoService.usuarioLogueado$.subscribe(usuario => {
      this.usuarioLogueado = usuario;
      const usuarioLogueado = localStorage.getItem('usuarioLogueado');
      if (usuarioLogueado) {
        this.usuarioLogueado = JSON.parse(usuarioLogueado);
      }
    })
  }

  cerrarSesion(): void {
    this.usuarioLogueadoService.cerrarSesion();
    this.router.navigate(['/']);
  }
}
