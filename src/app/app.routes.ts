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

  {
    path: 'servicios',
    loadComponent: () =>
      import('./components/site/servicios-page/servicios.page').then((m) => m.ServiciosPage),
  },

  // ⭐ Cliente (público)
  { path: 'main', component: Main },

  // ⭐ Catálogo de trabajadores (PÚBLICO)
  {
    path: 'trabajadores',
    loadComponent: () =>
      import('./components/site/trabajadores-lista/trabajadores.lista').then(
        (m) => m.TrabajadoresLista
      ),
  },

  // ⭐ Perfil del cliente (protegido)
  {
    path: 'perfil',
    loadComponent: () =>
      import('./components/cliente/perfil-cliente/perfil-cliente').then((m) => m.PerfilCliente),
    canActivate: [authGuard],
  },

  // ⭐ Dashboard trabajador
  {
    path: 'trabajador/home',
    loadComponent: () =>
      import('./components/trabajador/home/trabajador-home/trabajador-home').then(
        (m) => m.TrabajadorHome
      ),
  },

  // ⭐ Dashboard admin
  {
    path: 'admin/home',
    loadComponent: () =>
      import('./components/admin/home/admin-home/admin-home').then((m) => m.AdminHome),
  },

  // ⭐ Página Nosotros
  {
    path: 'nosotros',
    loadComponent: () => import('./components/site/nosotros/nosotros').then((m) => m.Nosotros),
  },

  // ⭐ Página Contacto
  {
    path: 'contacto',
    loadComponent: () => import('./components/site/contacto/contacto').then((m) => m.Contacto),
  },

  {
    path: 'admin/trabajadores',
    loadComponent: () =>
      import('./components/admin/trabajadores/admin-trabajadores').then((c) => c.AdminTrabajadores),
  },

  {
    path: 'admin/usuarios',
    loadComponent: () =>
      import('./components/admin/usuarios/admin-usuarios').then((c) => c.AdminUsuarios),
  },

  {
    path: 'admin/config',
    loadComponent: () =>
      import('./components/admin/config/admin-config').then((c) => c.AdminConfig),
  },

  {
    path: 'admin/reportes',
    loadComponent: () =>
      import('./components/admin/reportes/admin-reportes').then((c) => c.AdminReportes),
  },

  // ⭐ Store protegido (solo usuarios registrados)
  {
    path: 'store',
    canActivate: [authGuard],
    loadChildren: () => import('./components/store/store.routes').then((m) => m.storeRoutes),
  },

  { path: '**', redirectTo: 'select-role' },
];
