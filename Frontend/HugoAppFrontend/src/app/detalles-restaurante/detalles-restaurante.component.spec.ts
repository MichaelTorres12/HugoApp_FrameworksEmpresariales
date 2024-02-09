import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesRestauranteComponent } from './detalles-restaurante.component';

describe('DetallesRestauranteComponent', () => {
  let component: DetallesRestauranteComponent;
  let fixture: ComponentFixture<DetallesRestauranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetallesRestauranteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetallesRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
