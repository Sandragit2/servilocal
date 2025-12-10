import { Component, OnInit } from '@angular/core';
import { TitleCasePipe, NgFor, NgIf } from '@angular/common';
import { AuthService } from '../../../../services/auth.service';
import { storeService } from '../../../../services/store.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-trabajador-home',
  standalone: true,
  templateUrl: './trabajador-home.html',
  styleUrls: ['./trabajador-home.css'],
  imports: [NgIf, NgFor, TitleCasePipe],
})
export class TrabajadorHome implements OnInit {

  trabajador: any = null;
  tareas: string[] = [];
  notas: string[] = [];
  menuOpen = false;

  backendUrl = environment.url;  // Ej: http://127.0.0.1:5000/

  constructor(
    private authService: AuthService,
    private storeSrv: storeService
  ) {}

  ngOnInit() {
    const usuario = this.authService.getUsuario();
    console.log("USUARIO LOGEADO:", usuario);

    if (!usuario) return;

    this.storeSrv.getTrabajadorPorUsuario(usuario.id).subscribe({
      next: (res) => {
        console.log("RESPUESTA DEL BACKEND:", res);

        if (res.status === "success") {
          this.trabajador = res.trabajador;
          this.tareas = this.generarTareas(this.trabajador.categoria);
          this.notas = this.generarNotas(this.trabajador.categoria);
        }
      },
      error: (e) => console.error("ERROR BACKEND:", e)
    });
  }

  /** -----------------------------------------
   *  🌟 MENÚ LATERAL
   * ----------------------------------------- */
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  /** -----------------------------------------
   *  🚪 CERRAR SESIÓN
   * ----------------------------------------- */
  logout() {
    this.authService.logout();
    window.location.href = "/login"; // fuerza recarga limpia
  }

  /** -----------------------------------------
   *  🔔 ICONOS SUPERIORES
   * ----------------------------------------- */
  goMensajes() {
    window.location.href = "/trabajador/home";
  }

  goNotificaciones() {
    window.location.href = "/trabajador/home";
  }

  goPerfil() {
    window.location.href = "/trabajador/home";
  }

  /** -----------------------------------------
   *  📌 GENERADOR DE TAREAS AUTOMÁTICAS
   * ----------------------------------------- */
  generarTareas(categoria: string) {
    switch (categoria?.toLowerCase()) {
      case "albañiles":
        return [
          "Cimentación – Área A",
          "Muros perimetrales — Sección norte",
          "Verificación de materiales",
          "Colado de columna – Punto 3",
          "Limpieza del área de trabajo",
        ];

      case "electricistas":
        return [
          "Revisión de luminarias",
          "Instalación de cables calibre 12",
          "Cambio de interruptores",
          "Mantenimiento general eléctrico",
        ];

      case "tutores":
        return [
          "Preparación de clase",
          "Revisión de tareas",
          "Evaluación semanal",
          "Atención personalizada",
        ];

      default:
        return ["No hay tareas asignadas."];
    }
  }

  /** -----------------------------------------
   *  📌 GENERADOR DE NOTAS AUTOMÁTICAS
   * ----------------------------------------- */
  generarNotas(categoria: string) {
    switch (categoria?.toLowerCase()) {
      case "albañiles":
        return [
          "Encargar mezcla temprano.",
          "Tomar fotos del avance.",
          "Confirmar materiales faltantes.",
        ];

      case "electricistas":
        return [
          "Revisar calibración.",
          "Validar voltaje antes de trabajar.",
          "Evitar humedad para conexiones.",
        ];

      case "tutores":
        return [
          "Preparar material educativo.",
          "Revisar desempeño.",
          "Enviar retroalimentación semanal.",
        ];

      default:
        return ["Sin notas registradas."];
    }
  }
}
