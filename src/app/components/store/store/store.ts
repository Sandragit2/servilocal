import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { storeService } from '../../../services/store.service';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './store.html',
  styleUrls: ['./store.css']
})
export class Store implements OnInit {
  trabajadores: any[] = [];
  tipoServicio: string = '';
cargando: any;

  constructor(
    private route: ActivatedRoute,
    private storeService: storeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tipoServicio = params['tipo'];
      this.cargarTrabajadores();
    });
  }

  cargarTrabajadores() {
    this.storeService.getTrabajadores().subscribe({
      next: (response) => {
        if (response.status === 'success') {
          // 🔥 FILTRO CORRECTO
          this.trabajadores = response.lista_trabajadores.filter((t: any) =>
            t.categoria?.toLowerCase() === this.tipoServicio.toLowerCase()
          );
        }
      },
      error: (error) => {
        console.error('Error al obtener trabajadores:', error);
      }
    });
  }
}




