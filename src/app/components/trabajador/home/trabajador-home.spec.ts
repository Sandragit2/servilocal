import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrabajadorHome } from './trabajador-home';

describe('TrabajadorHome', () => {
  let component: TrabajadorHome;
  let fixture: ComponentFixture<TrabajadorHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrabajadorHome]   
    }).compileComponents();

    fixture = TestBed.createComponent(TrabajadorHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
