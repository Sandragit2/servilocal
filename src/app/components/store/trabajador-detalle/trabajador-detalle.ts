import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, TitleCasePipe, NgIf, NgFor } from '@angular/common';
import { storeService } from '../../../services/store.service';
import { RouterModule } from '@angular/router';   // 👈 IMPORTANTE


@Component({
  selector: 'app-trabajador-detalle',
  standalone: true,
  imports: [CommonModule, TitleCasePipe, NgIf, NgFor, RouterModule],
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
      next: (res) => {
        if (res.status === 'success') {
          this.trabajador = res.trabajador;
          this.resenas = res.resenas || [];
        }
      },
      error: (err) => console.error(err)
    });
  }
}



