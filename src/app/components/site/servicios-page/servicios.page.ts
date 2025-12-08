import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-servicios-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.css']
})
export class ServiciosPage {

  constructor(private router: Router) {}

  servicios = [
    {
      nombre: 'Albañilería',
      tipo: 'albañiles',
      imagen: 'assets/img/albañil.png',
      descripcion: 'Construcción, remodelación, acabados y mantenimiento general.'
    },
    {
      nombre: 'Electricidad',
      tipo: 'electricistas',
      imagen: 'assets/img/electricos.png',
      descripcion: 'Instalación, reparación y mantenimiento eléctrico profesional.'
    },
    {
      nombre: 'Tutorías',
      tipo: 'tutores',
      imagen: 'assets/img/tutores.jpg',
      descripcion: 'Apoyo escolar, regularización y clases personalizadas.'
    }
  ];

  proximos = [
    'Plomería',
    'Carpintería',
    'Cerrajería',
    'Limpieza del hogar',
    'Climatización'
  ];

  verProfesionales(tipo: string) {
    this.router.navigate(['/store/services', tipo]);
  }

  volver() {
  this.router.navigate(['/main']);
}

}


