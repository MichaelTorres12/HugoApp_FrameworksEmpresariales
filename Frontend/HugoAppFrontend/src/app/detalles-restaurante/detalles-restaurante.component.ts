import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestauranteService } from '../services/restaurante.service';

@Component({
  selector: 'app-detalles-restaurante',
  templateUrl: './detalles-restaurante.component.html',
  styleUrl: './detalles-restaurante.component.css'
})
export class DetallesRestauranteComponent implements OnInit {
  restaurante: any = {};
  menu: any[] = [];
  pedido: any[] = [];

  constructor(
    private restauranteService: RestauranteService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const restauranteId = this.route.snapshot.params['restauranteId'];
    this.obtenerDetalles(restauranteId);
    this.obtenerMenu(restauranteId);
  }

  obtenerDetalles(restauranteId: number) {
    this.restauranteService.obtenerDetallesRestaurante(restauranteId).subscribe(data => {
      this.restaurante = data;
    });
  }

  obtenerMenu(restauranteId: number) {
    this.restauranteService.obtenerMenuRestaurante(restauranteId).subscribe(data => {
      this.menu = data;
    });
  }

  agregarAlPedido(item: any) {
    this.pedido.push(item);
    // Aquí podrías implementar lógica adicional, como mostrar un mensaje de confirmación
    console.log(this.pedido); // Para propósitos de depuración
  }

}