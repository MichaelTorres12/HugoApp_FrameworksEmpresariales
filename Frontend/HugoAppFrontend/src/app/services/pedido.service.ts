//pedido.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private baseUrl = 'http://localhost:3000/api/pedidos';

  constructor(private http: HttpClient) { }

  //Crear un nuevo pedido
  crearPedido(datosPedido: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/crear`, datosPedido);
  }

  //Guardar los detalles del pedido actual
  agregarItemDetallePedido(datosDetalle: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/detalle`, datosDetalle);
  }

  //Obtener los detalles de un pedido en especifico
  obtenerDetallesPedido(pedidoId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${pedidoId}`);
  }
}
