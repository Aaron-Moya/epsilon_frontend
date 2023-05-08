import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductoCantidadDTO } from '../interfaces/ProductoCantidadDTO';
import { Ventas } from '../interfaces/ventas';
import { VentasProductosDTO } from '../interfaces/ventasProductosDTO';

@Injectable({
  providedIn: 'root'
})

export class VentaService {

  private baseURL = "http://localhost:8080/api/ventas";

  constructor(private httpClient: HttpClient) { }

  obtenerPedidos(idUsuario: number): Observable<Ventas[]> {
    const headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.httpClient.get<Ventas[]>(`${this.baseURL + "/comprador/" + idUsuario}`, {
      headers: headers
    });
  }

  obtenerVentas(idUsuario: number): Observable<VentasProductosDTO[]> {
    const headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.httpClient.get<VentasProductosDTO[]>(`${this.baseURL + "/vendedor/" + idUsuario}`, {
      headers: headers
    });
  }

  crearVenta(productosCantidadDTOs: ProductoCantidadDTO[], idUsuarioComprador: number, /*idUsuarioVendedor: number,*/ total: number): Observable<Object> {
    const params = {
        idUsuarioComprador: idUsuarioComprador,
        total: total
    };
    const options = {
      params: new HttpParams().set('idUsuarioComprador', params.idUsuarioComprador).set('total', params.total),
      headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`).append('content-type', 'application/json')
    };
    return this.httpClient.post(`${this.baseURL}`, productosCantidadDTOs, options);
  };

}
