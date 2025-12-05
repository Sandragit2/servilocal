import { Routes } from '@angular/router';
import { SelectRole } from './components/auth/select-role/select-role';
import { Login } from './components/auth/login/login';
import { Register } from './components/auth/register/register';
import { Main } from './components/site/main/main';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'select-role', pathMatch: 'full' },

  { path: 'select-role', component: SelectRole },
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  // Pantalla principal del cliente
  { path: 'main', component: Main },

  // Pantalla del trabajador
  {
    path: 'trabajador/home',
    loadComponent: () =>
      import('./components/trabajador/home/trabajador-home').then(m => m.TrabajadorHome)
  },

  // Pantalla del admin
  {
    path: 'admin/home',
    loadComponent: () =>
      import('./components/admin/home/admin-home').then(m => m.AdminHome)
  },

  // Store protegido
  {
    path: 'store',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./components/store/store.routes').then((m) => m.storeRoutes),
  },

  { path: '**', redirectTo: 'select-role' }
];
