import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-home.html',
  styleUrls: ['./admin-home.css']
})
export class AdminHome {
  titulo = 'Panel de Administración';

  stats = [
    { icon: 'fas fa-users', label: 'Usuarios Registrados', value: 13 },
    { icon: 'fas fa-briefcase', label: 'Trabajadores Activos', value: 6 },
    { icon: 'fas fa-shopping-cart', label: 'Servicios Solicitados', value: 3 },
    { icon: 'fas fa-star', label: 'Reseñas Totales', value: 9 }
  ];

  accesos = [
    { icon: 'fas fa-user-tie', name: 'Trabajadores', route: '/admin/trabajadores' },
    { icon: 'fas fa-user', name: 'Usuarios', route: '/admin/usuarios' },
    { icon: 'fas fa-cogs', name: 'Configuración', route: '/admin/config' },
    { icon: 'fas fa-chart-line', name: 'Reportes', route: '/admin/reportes' },
  ];
}
