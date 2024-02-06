import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorRestauranteComponent } from './buscador-restaurante.component';

describe('BuscadorRestauranteComponent', () => {
  let component: BuscadorRestauranteComponent;
  let fixture: ComponentFixture<BuscadorRestauranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorRestauranteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuscadorRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
