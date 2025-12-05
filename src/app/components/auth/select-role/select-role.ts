import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-role',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-role.html',
  styleUrls: ['./select-role.css']
})
export class SelectRole {
  constructor(private router: Router) {}

  seleccionarRol(rol: string) {
    localStorage.setItem('rolSeleccionado', rol);
    this.router.navigate(['/login']); // 🔹 redirige al login
  }
}




