import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { BuscadorRestauranteComponent } from './components/buscador-restaurante/buscador-restaurante.component';
import { DetallesRestauranteComponent } from './detalles-restaurante/detalles-restaurante.component';
import { GestionarPedidoComponent } from './components/gestionar-pedido/gestionar-pedido.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'buscador-restaurante', component: BuscadorRestauranteComponent},
  { path: 'restaurantes/:restauranteId', component: DetallesRestauranteComponent },
  { path: 'gestionar-pedido/:pedidoId', component: GestionarPedidoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
