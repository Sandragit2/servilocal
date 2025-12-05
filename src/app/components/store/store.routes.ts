import { Routes } from '@angular/router';
import { Store } from './store/store';
import { TrabajadorDetalleComponent } from './trabajador-detalle/trabajador-detalle';
import { Payment } from './payment/payment';

export const storeRoutes: Routes = [
  {
    path: '',
    children: [
      { path: 'services/:tipo', component: Store },
      { path: 'product/:id', component: TrabajadorDetalleComponent },
      { path: 'payment', component: Payment }
    ]
  }
];
