import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; // 👈 agrega Router
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css']
})
export class Menu implements OnInit {
  isLoggedIn = false;
  usuario: any = null;

  constructor(private auth: AuthService, private router: Router) {} // 👈 agrega router

  ngOnInit() {
    this.isLoggedIn = this.auth.isLoggedIn();
    this.usuario = this.auth.getUsuario();

    this.auth.token$.subscribe(token => {
      this.isLoggedIn = !!token;
      this.usuario = this.auth.getUsuario();
    });
  }

  logout() {
    this.auth.logout();
    // 👇 usamos el router, NO window.location
    this.router.navigate(['/select-role']);
  }

  

  getAvatarColor(nombre: string): string {
    const colores = ['#FF8A80', '#FFB74D', '#81C784', '#4FC3F7', 
      '#9575CD', '#F06292', '#AED581', '#64B5F6'];
    const indice = nombre ? nombre.charCodeAt(0) % colores.length : 0;
    return colores[indice];
  }
}





