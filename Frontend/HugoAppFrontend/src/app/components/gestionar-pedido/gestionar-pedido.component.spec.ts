import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarPedidoComponent } from './gestionar-pedido.component';

describe('GestionarPedidoComponent', () => {
  let component: GestionarPedidoComponent;
  let fixture: ComponentFixture<GestionarPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestionarPedidoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionarPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
