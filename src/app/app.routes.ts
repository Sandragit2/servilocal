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

  // Cliente
  { path: 'main', component: Main },

  // ⭐ Mi perfil de cliente
 {
  path: 'perfil',
  loadComponent: () =>
    import('./components/cliente/perfil-cliente/perfil-cliente')
      .then(m => m.PerfilCliente),
  canActivate: [authGuard]
},


  // Trabajador
  {
    path: 'trabajador/home',
    loadComponent: () =>
      import('./components/trabajador/home/trabajador-home/trabajador-home')
        .then(m => m.TrabajadorHome)
  },

  // Admin
  {
    path: 'admin/home',
    loadComponent: () =>
      import('./components/admin/home/admin-home/admin-home')
        .then(m => m.AdminHome)
  },

  // Store protegido
  {
    path: 'store',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./components/store/store.routes').then(m => m.storeRoutes),
  },

  { path: '**', redirectTo: 'select-role' },
];

