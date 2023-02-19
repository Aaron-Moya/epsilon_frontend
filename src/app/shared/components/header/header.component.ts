import { Component, OnInit } from '@angular/core';
import { UsuarioLogueadoService } from '../../services/usuario-logueado.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  usuarioLogueado: any;

  constructor(private usuarioLogueadoService: UsuarioLogueadoService) { }

  ngOnInit(): void {
    this.usuarioLogueado = this.usuarioLogueadoService.getUsuarioLogueado();
  }

}
