import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Direcciones } from '../interfaces/direcciones';

@Injectable({
  providedIn: 'root'
})

export class DireccionService {

  private baseURL = "http://localhost:8080/api/direcciones";

  constructor(private httpClient: HttpClient) { }

  crearDireccion(direccion: String, idUsuario: number): Observable<Object> {
    const params = {
      idUsuario: idUsuario
    };
    const options = {
      params: new HttpParams().set('idUsuario', params.idUsuario),
      headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`).append('content-type', 'application/json')
    };
    return this.httpClient.post(`${this.baseURL}`, direccion, options);
  };

  actualizarDireccion(direccion: String): Observable<Object> {
    const options = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`).append('content-type', 'application/json')
    };
    return this.httpClient.put(`${this.baseURL}`, direccion, options);
  };
}
