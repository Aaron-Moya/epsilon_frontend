import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cestas } from '../interfaces/cestas';
import { Productos } from '../interfaces/productos';

@Injectable({
  providedIn: 'root'
})

export class CestaService {

  private baseURL = "http://localhost:8080/api/cesta";

  constructor(private httpClient: HttpClient) { }

  obtenerCestasUsuario(idUsuario: number): Observable<Cestas[]> {
    const headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.httpClient.get<Cestas[]>(`${this.baseURL + "/usuario/" + idUsuario}`, {
      headers: headers
    });
  }

  addProductoCesta(idUsuario: number, idProducto: number): Observable<Object> {
    const params = {
      idUsuario: idUsuario,
      idProducto: idProducto,
    };
    const options = {
      params: new HttpParams().set('idUsuario', params.idUsuario).set('idProducto', params.idProducto),
      headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`)
    };
    return this.httpClient.post(`${this.baseURL}`, null, options);
  }

  disminuirCantidad(idUsuario: number, idProducto: number): Observable<Object> {
    const params = {
      idUsuario: idUsuario,
      idProducto: idProducto,
    };
    const options = {
      params: new HttpParams().set('idUsuario', params.idUsuario).set('idProducto', params.idProducto),
      headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`)
    };
    return this.httpClient.put(`${this.baseURL + "/disminuirCantidad"}`, null, options);
  }

  deleteProductoCesta(idCesta: number): Observable<Object> {
    const params = {
      idCesta: idCesta
    };
    const options = {
      params: new HttpParams().set('idCesta', params.idCesta),
      headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`)
    };
    return this.httpClient.delete(`${this.baseURL}`, options)
  }

}
