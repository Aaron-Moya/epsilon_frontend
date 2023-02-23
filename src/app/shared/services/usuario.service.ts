import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuarios } from '../interfaces/usuarios';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  // Esta URL obtiene el listado de todos los usuarios en el backend
  private baseURL = "http://localhost:8080/api/usuarios";

  constructor(private httpClient: HttpClient) { }

  obtenerUsuarioPorId(id: number): Observable<Usuarios> {
    return this.httpClient.get<Usuarios>(`${this.baseURL + "/id/" + id}`);
  }

  obtenerUsuarioPorCorreo(correo: string): Observable<Usuarios> {
    return this.httpClient.get<Usuarios>(`${this.baseURL + "/correo/" + correo}`);
  }

  obtenerUsuarioLogin(correo: string, password: string): Observable<Usuarios> {
    return this.httpClient.get<Usuarios>(`${this.baseURL + "/login"}`, {
      params: { correo: correo, password: password }
    });
  }

  registrarUsuario(formData: FormData): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}`, formData);
  };
}