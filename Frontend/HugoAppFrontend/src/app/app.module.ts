import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BuscadorRestauranteComponent } from './components/buscador-restaurante/buscador-restaurante.component';
import { MenuComponent } from './components/menu/menu.component';
import { GestionarPedidoComponent } from './components/gestionar-pedido/gestionar-pedido.component';
import { FormsModule } from '@angular/forms';
import { DetallesRestauranteComponent } from './detalles-restaurante/detalles-restaurante.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BuscadorRestauranteComponent,
    MenuComponent,
    GestionarPedidoComponent,
    DetallesRestauranteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
