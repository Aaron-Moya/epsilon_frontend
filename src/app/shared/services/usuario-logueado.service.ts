import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuarios } from '../interfaces/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuarioLogueadoService {

  private usuarioLogueadoSubject = new BehaviorSubject<any>(null);
  usuarioLogueado$: Observable<any> = this.usuarioLogueadoSubject.asObservable();

  constructor() { }

  updateUsuarioLogueado(usuario: Usuarios) {
    this.usuarioLogueadoSubject.next(usuario);
    localStorage.setItem('idUsuarioLogueado', JSON.stringify(usuario.id));
    localStorage.setItem('token', usuario.accessToken);
  }

  cerrarSesion() {
    localStorage.clear();
    this.usuarioLogueadoSubject.next(null);
  }
}
