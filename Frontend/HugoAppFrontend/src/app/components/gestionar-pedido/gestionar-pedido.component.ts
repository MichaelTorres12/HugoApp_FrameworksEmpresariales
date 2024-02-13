// En src/app/components/gestionar-pedido/gestionar-pedido.component.ts

import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-gestionar-pedido',
  templateUrl: './gestionar-pedido.component.html',
  styleUrls: ['./gestionar-pedido.component.css']
})
export class GestionarPedidoComponent implements OnInit {
  pedido: any;

  constructor(
    private pedidoService: PedidoService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const pedidoId = +this.route.snapshot.params['pedidoId'];
    this.pedidoService.obtenerDetallesPedido(pedidoId).subscribe(pedido => {
      this.pedido = pedido;
    });
  }

  //Para que el boton me ayude regresar al incio de todo
  regresarAlInicio() {
    this.router.navigate(['/buscador-restaurante']);
  }
}
