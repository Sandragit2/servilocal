import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { storeService } from '../../../services/store.service';
import { environment } from '../../../../environments/environment';

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
  cargando: boolean = true;
  urlBackend = environment.url;   // ⭐ IMPORTANTE

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
    this.cargando = true;

    this.storeService.getTrabajadores().subscribe({
      next: (response) => {
        if (response.status === 'success') {

          this.trabajadores = response.lista_trabajadores.filter((t: any) =>
            t.categoria?.toLowerCase() === this.tipoServicio.toLowerCase()
          );
        }
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al obtener trabajadores:', error);
        this.cargando = false;
      }
    });
  }
}






