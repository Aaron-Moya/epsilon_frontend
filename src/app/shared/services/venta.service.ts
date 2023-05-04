import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductoCantidadDTO } from '../interfaces/ProductoCantidadDTO';

@Injectable({
  providedIn: 'root'
})

export class VentaService {

  private baseURL = "http://localhost:8080/api/ventas";

  constructor(private httpClient: HttpClient) { }

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
