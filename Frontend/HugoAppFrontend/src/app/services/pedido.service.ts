import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private baseUrl = 'http://localhost:3000/api/pedidos';

  constructor(private http: HttpClient) { }

  crearPedido(datosPedido: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/crear`, datosPedido);
  }

  agregarItemDetallePedido(datosDetalle: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/detalle`, datosDetalle);
  }

  obtenerPedidosPorUsuario(usuarioId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/usuario/${usuarioId}`);
  }
}
