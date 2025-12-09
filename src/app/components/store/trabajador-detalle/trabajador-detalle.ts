import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, TitleCasePipe, NgIf, NgFor } from '@angular/common';
import { storeService } from '../../../services/store.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-trabajador-detalle',
  standalone: true,
  imports: [CommonModule, TitleCasePipe, NgIf, NgFor, RouterModule],
  templateUrl: './trabajador-detalle.html',
  styleUrls: ['./trabajador-detalle.css'],
})
export class TrabajadorDetalleComponent implements OnInit {

  trabajador: any = null;
  resenas: any[] = [];
  habilidades: string[] = [];

  id!: number;
  puedeContactar = false;

  promedio = 0;
  totalResenas = 0;
  stars = [1, 2, 3, 4, 5];

  urlBackend = environment.url;

  constructor(
    private route: ActivatedRoute,
    private _storeService: storeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    // Si viene de /store/payment con pago exitoso
    const pago = history.state?.pago;
    if (pago) this.puedeContactar = true;

    this.obtenerTrabajador();
  }

  obtenerTrabajador(): void {
    this._storeService.getTrabajadorDetalle(this.id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.trabajador = res.trabajador;
          this.resenas = res.resenas || [];

          // Habilidades → array
          const rawHabs = this.trabajador?.habilidades as string;
          this.habilidades = rawHabs
            ? rawHabs.split(',').map((h: string) => h.trim()).filter((h: string) => h.length > 0)
            : [];

          // Promedio de reseñas
          this.totalResenas = this.resenas.length;
          if (this.totalResenas > 0) {
            const suma = this.resenas.reduce(
              (acc: number, r: any) => acc + (r.calificacion || 0),
              0
            );
            this.promedio = Number((suma / this.totalResenas).toFixed(1));
          }
        }
      },
      error: (err) => console.error(err),
    });
  }

  abrirWhatsApp() {
    if (!this.puedeContactar || !this.trabajador?.telefono) return;

    const numero = this.trabajador.telefono;
    const mensaje = encodeURIComponent(
      `Hola ${this.trabajador.nombre}, vi tu perfil en ServiLocal y me interesa tu servicio.`
    );

    window.open(`https://wa.me/${numero}?text=${mensaje}`, '_blank');
  }

  llamar() {
    if (!this.puedeContactar || !this.trabajador?.telefono) return;
    window.location.href = `tel:${this.trabajador.telefono}`;
  }

  enviarCorreo() {
    if (!this.puedeContactar || !this.trabajador?.correo) return;
    window.location.href = `mailto:${this.trabajador.correo}`;
  }

  contratar() {
    // NO se toca el pago: se mantiene igual que ya tenías
    this.router.navigate(['/store/payment'], {
      state: { trabajador: this.trabajador }
    });
  }
}




