import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioLogueadoService {

  usuarioLogueado: any; // Propiedad para almacenar los datos del usuario

  constructor() { }

  getUsuarioLogueado() {
    return this.usuarioLogueado;
  }
}
