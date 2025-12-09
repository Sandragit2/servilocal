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
  id!: number;
  puedeContactar = false;

  urlBackend = environment.url;

  constructor(
    private route: ActivatedRoute,
    private _storeService: storeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

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
        }
      },
      error: (err) => console.error(err),
    });
  }

  abrirWhatsApp() {
    if (!this.puedeContactar || !this.trabajador?.telefono) return;

    const numero = this.trabajador.telefono;
    const mensaje = encodeURIComponent(
      `Hola ${this.trabajador.nombre}, vi tu perfil en ServiLocal.`
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
    this.router.navigate(['/store/payment'], {
      state: { trabajador: this.trabajador }
    });
  }
}


