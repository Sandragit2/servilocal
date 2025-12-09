import { Component, OnInit } from '@angular/core';
import { TitleCasePipe, NgFor, NgIf } from '@angular/common';
import { AuthService } from '../../../../services/auth.service';
import { storeService } from '../../../../services/store.service';

@Component({
  selector: 'app-trabajador-home',
  standalone: true,
  templateUrl: './trabajador-home.html',
  styleUrls: ['./trabajador-home.css'],
  imports: [NgIf, NgFor, TitleCasePipe]   // 👈 AQUI SE AGREGA TitleCasePipe
})
export class TrabajadorHome implements OnInit {

  trabajador: any = null;
  tareas: any[] = [];
  notas: string[] = [];

  constructor(
    private authService: AuthService,
    private storeSrv: storeService
  ) {}

  ngOnInit() {
    const usuario = this.authService.getUsuario();

    if (!usuario) return;

    this.storeSrv.getTrabajadorDetalle(usuario.id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.trabajador = res.trabajador;
          this.tareas = this.generarTareas(res.trabajador.categoria);
          this.notas = this.generarNotas(res.trabajador.categoria);
        }
      },
      error: (e) => console.error(e)
    });
  }

  generarTareas(categoria: string) {
    switch (categoria.toLowerCase()) {
      case 'albañiles':
        return [
          "Cimentación – Área A",
          "Muros perimetrales — Sección norte",
          "Verificación de materiales",
          "Colado de columna – Punto 3",
          "Limpieza del área de trabajo"
        ];
      case 'electricistas':
        return [
          "Revisión de luminaria",
          "Instalación de cables calibre 12",
          "Cambio de apagadores",
          "Mantenimiento de centro de carga"
        ];
      case 'plomeros':
        return [
          "Revisión de fugas",
          "Instalación de tubería",
          "Mantenimiento de calentador"
        ];
      case 'tutores':
        return [
          "Clase de matemáticas",
          "Revisión de tareas",
          "Preparación de evaluación semanal"
        ];
      default:
        return ["Sin tareas asignadas."];
    }
  }

  generarNotas(categoria: string) {
    switch (categoria.toLowerCase()) {
      case 'albañiles':
        return [
          "Pedir mezcla temprano.",
          "Tomar fotos del avance.",
          "Contar blocks faltantes."
        ];
      case 'electricistas':
        return [
          "Revisar cables dañados.",
          "Confirmar voltaje.",
          "Evitar trabajar con humedad."
        ];
      case 'plomeros':
        return [
          "Traer sellador.",
          "Confirmar presión de agua.",
          "Verificar refacciones necesarias."
        ];
      case 'tutores':
        return [
          "Preparar material.",
          "Revisar calificaciones.",
          "Enviar retroalimentación."
        ];
      default:
        return ["Sin notas registradas."];
    }
  }
}


