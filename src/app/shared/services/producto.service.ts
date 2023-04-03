import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Productos } from '../interfaces/productos';
import { FiltroCategoria } from '../interfaces/filtroCategoria';
import { Page } from '../interfaces/page';

@Injectable({
  providedIn: 'root'
})

export class ProductoService {

  // Esta URL obtiene el listado de todas las categorias en el backend
  private baseURL = "http://localhost:8080/api/productos";

  public static filtros: FiltroCategoria = new FiltroCategoria();
  
  public static comprobarFiltrosVacios(): boolean { 
    if (this.filtros.nombre == undefined && this.filtros.categoria == undefined)
      return true;
    else 
      return false
  }

  constructor(private httpClient: HttpClient) { }

  obtenerProductos(page: number, size: number): any {
    return this.httpClient.get<Page<Productos>>(`${this.baseURL + "?page=" + page + "&size=" + size}`);
  };

  obtenerProductosPorFiltro(page: number, size: number/*, filtro: FiltroCategoria*/): any {
    let urlExtra = `${"?page=" + page + "&size=" + size}`;

    if (ProductoService.filtros.nombre != undefined)
      urlExtra += `${"&" + 'nombre' + "=" + ProductoService.filtros.nombre}`;
    if (ProductoService.filtros.categoria != undefined)
      urlExtra += `${"&" + 'categoria' + "=" + ProductoService.filtros.categoria}`;

    return this.httpClient.get<Page<Productos>>(`${this.baseURL + "/filtro" + urlExtra}`);
  };

  obtenerProductoPorId(id: number): Observable<Productos> {
    return this.httpClient.get<Productos>(`${this.baseURL + "/id/" + id}`);
  }

  obtenerProductosFavoritos(idUsuario: number): Observable<Productos[]> {
    const headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.httpClient.get<Productos[]>(`${this.baseURL + "/favoritos"}`, {
      params: { idUsuario: idUsuario },
      headers: headers
    });
  }

  obtenerProductosDeUsuario(page: number, size: number, idUsuario: number): Observable<Productos[]> {
    const headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.httpClient.get<Productos[]>(`${this.baseURL + "/usuario" + "?page=" + page + "&idUsuario=" + idUsuario + "&size=" + size}`, {
      headers: headers
    });
  }

  addProductoFavorito(idUsuario: number, idProducto: number): Observable<Object> {
    const params = {
      idUsuario: idUsuario,
      idProducto: idProducto,
    };
    const options = {
      params: new HttpParams().set('idUsuario', params.idUsuario).set('idProducto', params.idProducto),
      headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`)
    };
    return this.httpClient.put(`${this.baseURL + "/favorito"}`, null, options)
  }

  crearAnuncio(formData: FormData): Observable<Object> {
    const headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.httpClient.post(`${this.baseURL}`, formData, { headers });
  };

  modificarAnuncio(formData: FormData): Observable<Object> {
    const headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.httpClient.put(`${this.baseURL}`, formData, { headers });
  };

  deleteProducto(idProducto: number): Observable<Object> {
    const params = {
      idProducto: idProducto
    };
    const options = {
      params: new HttpParams().set('idProducto', params.idProducto),
      headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`)
    };
    return this.httpClient.delete(`${this.baseURL}`, options)
  }

  deleteProductoFavorito(idUsuario: number, idProducto: number): Observable<Object> {
    const params = {
      idUsuario: idUsuario,
      idProducto: idProducto
    };
    const options = {
      params: new HttpParams().set('idUsuario', params.idUsuario).set('idProducto', params.idProducto),
      headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`)
    };
    return this.httpClient.delete(`${this.baseURL + "/favorito"}`, options)
  }
}
