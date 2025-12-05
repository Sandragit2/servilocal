import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login implements OnInit {
  usuario = {
    correo: '',
    contrasena: '',
    rol: '',
  };

  errores = {
    correo: '',
    contrasena: '',
  };

  mensajeError = '';

  // 👇 NUEVO: para mostrar la contraseña temporalmente
  mostrarPassword = false;
  private passwordTimeout: any = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const rol = localStorage.getItem('rolSeleccionado');
    if (rol) this.usuario.rol = rol;
  }

  // ============================
  // VALIDACIONES FRONTEND
  // ============================

  validarCorreo() {
    const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    this.errores.correo = patron.test(this.usuario.correo) ? '' : 'Correo inválido';
  }

  validarContrasena() {
    this.errores.contrasena =
      this.usuario.contrasena.length >= 6 ? '' : 'La contraseña es de mínimo 6 caracteres';
  }

  tieneErrores() {
    return (
      this.errores.correo !== '' ||
      this.errores.contrasena !== '' ||
      !this.usuario.correo ||
      !this.usuario.contrasena
    );
  }

  // ============================
  // 👇 NUEVO: Mostrar contraseña por 450ms
  // ============================
  mostrarContrasenaTemporal() {
    if (this.passwordTimeout) clearTimeout(this.passwordTimeout);

    this.mostrarPassword = true;

    this.passwordTimeout = setTimeout(() => {
      this.mostrarPassword = false;
    }, 450); // 0.450 segundos
  }

  // ============================
  // LOGIN
  // ============================
  login() {
    if (this.tieneErrores()) {
      this.mensajeError = 'Verifica los campos marcados.';
      return;
    }

    this.authService.login(this.usuario).subscribe({
      next: (res: any) => {
        if (res.status === 'success') {
          this.authService.saveSession(res.token, res.usuario);

          const rol = res.usuario.rol;

          if (rol === 'cliente') {
            this.router.navigate(['/main']);
          } else if (rol === 'trabajador') {
            this.router.navigate(['/trabajador/home']);
          } else if (rol === 'administrador') {
            this.router.navigate(['/admin/home']);
          }
        } else {
          this.mensajeError = res.mensaje || 'Error al iniciar sesión';
        }
      },
      error: () => {
        this.mensajeError = 'Credenciales incorrectas';
      },
    });
  }
}
