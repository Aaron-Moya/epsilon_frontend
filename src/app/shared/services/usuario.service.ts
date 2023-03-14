import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuarios } from '../interfaces/usuarios';
import { Productos } from '../interfaces/productos';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  // Esta URL obtiene el listado de todos los usuarios en el backend
  private baseURL = "http://localhost:8080/api/usuarios";
  private authURL = "http://localhost:8080/auth/login";

  constructor(private httpClient: HttpClient) { }

  obtenerUsuarioPorId(id: number): Observable<Usuarios> {
    // const headers: HttpHeaders = new HttpHeaders().set('Authorization',  `Bearer ${localStorage.getItem('token')}`);
    return this.httpClient.get<Usuarios>(`${this.baseURL + "/id/" + id}`);
  }

  obtenerUsuarioPorCorreo(correo: string): Observable<Usuarios> {
    // const headers: HttpHeaders = new HttpHeaders().set('Authorization',  `Bearer ${localStorage.getItem('token')}`);
    return this.httpClient.get<Usuarios>(`${this.baseURL + "/correo/" + correo}`);
  }

  obtenerUsuarioLogin(correo: string, password: string): Observable<Usuarios> {
    return this.httpClient.get<Usuarios>(`${this.authURL}`, {
      params: { correo: correo, password: password },
    });
  }

  

  registrarUsuario(formData: FormData): Observable<Object> {
    return this.httpClient.post(`${this.baseURL + "/registro"}`, formData);
  };
}
