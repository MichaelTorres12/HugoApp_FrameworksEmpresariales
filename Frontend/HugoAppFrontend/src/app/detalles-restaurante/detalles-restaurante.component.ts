import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestauranteService } from '../services/restaurante.service';
import { PedidoService } from '../services/pedido.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-detalles-restaurante',
  templateUrl: './detalles-restaurante.component.html',
  styleUrls: ['./detalles-restaurante.component.css'],
})
export class DetallesRestauranteComponent implements OnInit {
  restaurante: any = {};
  menu: any[] = [];
  pedidoTemporal: any[] = [];
  direccionEntrega: string = '';
  metodoPago: string = 'Efectivo'; // Valor predeterminado
  totalPedido: number = 0; // Calcula el total en base a los ítems en pedidoTemporal

  constructor(
    private restauranteService: RestauranteService,
    private pedidoService: PedidoService,
    private route: ActivatedRoute,
    private router: Router, // Inyectar Router aquí
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

  agregarAlPedido(itemSeleccionado: any) {
    // Verificar si el ítem ya existe en el pedidoTemporal
    const itemExistente = this.pedidoTemporal.find(item => item.MenuID === itemSeleccionado.MenuID);
  
    if (itemExistente) {
      // Si el ítem ya existe, incremento su cantidad
      itemExistente.cantidad += 1;
    } else {
      // Si el ítem no existe en el pedido, lo añado con cantidad inicial de 1, asumiendo que cada ítem tiene un campo 'cantidad' para este propósito
      const itemConCantidad = { ...itemSeleccionado, cantidad: 1 };
      this.pedidoTemporal.push(itemConCantidad);
    }
  
    // Recalcular el total del pedido
    this.calcularTotalPedido();
  }
  
  calcularTotalPedido() {
    this.totalPedido = this.pedidoTemporal.reduce((total, item) => total + (item.Precio * item.cantidad), 0);
  }
  

  //Finalizo el pedido
  finalizarPedido(): void {
    const usuarioId = localStorage.getItem('UsuarioID');
    if (!usuarioId) {
      alert('Por favor, inicia sesión para realizar un pedido.');
      return;
    }
  
    const pedido = {
      UsuarioID: usuarioId,
      DireccionEntrega: this.direccionEntrega,
      MetodoPago: this.metodoPago,
    };
  
    this.pedidoService.crearPedido(pedido).subscribe({
      next: (respuestaPedido) => {
        const pedidoId = respuestaPedido.PedidoID;
        this.pedidoTemporal.forEach(item => {
          this.pedidoService.agregarItemDetallePedido({
            PedidoID: pedidoId,
            MenuID: item.MenuID,
            Cantidad: item.cantidad,
            Precio: item.Precio // Envio el precio al backend por si lo requiero
          }).subscribe({
            next: (response) => console.log('Ítem agregado con éxito', response),
            error: (error) => console.error('Error agregando ítem al pedido:', error)
          });
        });
  
        // Limpieza post-pedido de todos los campos
        this.pedidoTemporal = [];
        this.totalPedido = 0;
        this.direccionEntrega = '';
        this.metodoPago = 'Efectivo';
        alert('Pedido finalizado con éxito.');
        // Redirige al usuario o actualiza la UI como sea necesario
        this.router.navigate(['/gestionar-pedido', pedidoId]);
      },
      error: (error) => console.error('Error creando el pedido:', error)
    });
  }  


}
