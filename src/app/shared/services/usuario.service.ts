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

  obtenerProductosFavoritos(idUsuario: number): Observable<Productos[]> {
    const headers: HttpHeaders = new HttpHeaders().set('Authorization',  `Bearer ${localStorage.getItem('token')}`);
    return this.httpClient.get<Productos[]>(`${this.baseURL + "/favoritos"}`, {
      params: {idUsuario: idUsuario},
      headers : headers
    });
  }

  registrarUsuario(formData: FormData): Observable<Object> {
    return this.httpClient.post(`${this.baseURL + "/registro"}`, formData);
  };

  addProductoFavorito(idUsuario: number, idProducto: number): Observable<Object> {
    const params = {
      idUsuario: idUsuario,
      idProducto: idProducto,
    };
    const options = {
      params: new HttpParams().set('idUsuario', params.idUsuario).set('idProducto', params.idProducto),
      headers: new HttpHeaders().set('Authorization',  `Bearer ${localStorage.getItem('token')}`)
    };
    return this.httpClient.put(`${this.baseURL + "/favorito"}`, null, options)
  }

  deleteProductoFavorito(idUsuario: number, idProducto: number): Observable<Object> {
    const params = {
      idUsuario: idUsuario,
      idProducto: idProducto,
    };
    const options = {
      params: new HttpParams().set('idUsuario', params.idUsuario).set('idProducto', params.idProducto),
      headers: new HttpHeaders().set('Authorization',  `Bearer ${localStorage.getItem('token')}`)
    };
    return this.httpClient.delete(`${this.baseURL + "/favorito"}`, options)
  }
}
