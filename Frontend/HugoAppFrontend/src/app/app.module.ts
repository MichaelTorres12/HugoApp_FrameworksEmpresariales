import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BuscadorRestauranteComponent } from './components/buscador-restaurante/buscador-restaurante.component';
import { MenuComponent } from './components/menu/menu.component';
import { GestionarPedidoComponent } from './components/gestionar-pedido/gestionar-pedido.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BuscadorRestauranteComponent,
    MenuComponent,
    GestionarPedidoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
