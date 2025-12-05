import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, TitleCasePipe, NgIf, NgFor } from '@angular/common';
import { storeService } from '../../../services/store.service';

@Component({
  selector: 'app-trabajador-detalle',
  standalone: true,
  imports: [CommonModule, TitleCasePipe, NgIf, NgFor],
  templateUrl: './trabajador-detalle.html',
  styleUrls: ['./trabajador-detalle.css']
})
export class TrabajadorDetalleComponent implements OnInit {

  trabajador: any = null;
  resenas: any[] = [];
  id!: number;
  urlBackend = 'http://127.0.0.1:5000/';

  constructor(
    private route: ActivatedRoute,
    private _storeService: storeService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.obtenerTrabajador();
  }

  obtenerTrabajador(): void {
    this._storeService.getTrabajadorDetalle(this.id).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.trabajador = response.trabajador;
          this.resenas = response.resenas || []; // ← pequeño ajuste opcional
        } else {
          console.error('Error:', response.mensaje);
        }
      },
      error: (error) => {
        console.error('Error al obtener trabajador:', error);
      }
    });
  }
}


