import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, TitleCasePipe, NgIf, NgFor } from '@angular/common';
import { storeService } from '../../../services/store.service';
import { RouterModule } from '@angular/router';
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

  // ⭐ URL universal backend
  urlBackend = environment.url;

  constructor(private route: ActivatedRoute, private _storeService: storeService) {}

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
      error: (err) => console.error(err),
    });
  }

  abrirWhatsApp() {
    if (!this.trabajador?.telefono) return;

    const numero = this.trabajador.telefono;
    const mensaje = encodeURIComponent(
      `Hola ${this.trabajador.nombre}, vi tu perfil en ServiLocal y me interesa tu servicio de ${this.trabajador.categoria}.`
    );

    window.open(`https://wa.me/${numero}?text=${mensaje}`, '_blank');
  }

  llamar() {
    if (!this.trabajador?.telefono) return;
    window.location.href = `tel:${this.trabajador.telefono}`;
  }

  enviarCorreo() {
    if (!this.trabajador?.correo) return;
    window.location.href = `mailto:${this.trabajador.correo}`;
  }

  contratar() {
    alert('Aquí conectamos Mercado Pago cuando tú me digas. ✔');
  }
}
