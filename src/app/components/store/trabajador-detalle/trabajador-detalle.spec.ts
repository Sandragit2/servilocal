import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabajadorDetalle } from './trabajador-detalle';

describe('TrabajadorDetalle', () => {
  let component: TrabajadorDetalle;
  let fixture: ComponentFixture<TrabajadorDetalle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrabajadorDetalle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrabajadorDetalle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
