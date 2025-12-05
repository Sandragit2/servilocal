import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements OnInit {
  token: string | null = null;
  usuario: any = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.token = this.authService.getToken();
    this.usuario = this.authService.getUsuario();

    this.authService.token$.subscribe((tk) => (this.token = tk));
    this.authService.identity$.subscribe((usr) => (this.usuario = usr));
  }

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
