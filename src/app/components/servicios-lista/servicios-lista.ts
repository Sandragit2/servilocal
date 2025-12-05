import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-servicios-lista',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './servicios-lista.html',
  styleUrls: ['./servicios-lista.css']
})
export class ServiciosLista implements OnInit, OnDestroy {
  servicios = [
    {
      nombre: 'Albañilería',
      tipo: 'albañiles',
      imagen: 'assets/img/albañil.png',
      descripcion: 'Construcción y acabados'
    },
    {
      nombre: 'Electricidad',
      tipo: 'electricistas',
      imagen: 'assets/img/electricos.png',
      descripcion: 'Instalaciones y mantenimiento'
    },
    {
      nombre: 'Tutorías',
      tipo: 'tutores',
      imagen: 'assets/img/tutores.jpg',
      descripcion: 'Apoyo académico'
    }
  ];

  isLoggedIn = false;
  private subToken?: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // valor inicial
    this.isLoggedIn = this.authService.isLoggedIn();

    // se actualiza cuando haya login/logout
    this.subToken = this.authService.token$.subscribe(token => {
      this.isLoggedIn = !!token;
    });
  }

  ngOnDestroy() {
    this.subToken?.unsubscribe();
  }

  verProfesionales(tipo: string) {
    // por si acaso alguien manipula el DOM
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }

    this.router.navigate(['/store/services', tipo]);
  }
}







