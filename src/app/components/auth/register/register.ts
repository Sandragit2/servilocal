import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {

  usuario = {
    nombre: '',
    apellidos: '',
    correo: '',
    contrasena: '',
    rol: 'cliente'
  };

  errores = {
    nombre: '',
    apellidos: '',
    correo: '',
    contrasena: ''
  };

  mensajeExito = '';
  mensajeError = '';

  mostrarPassword = false;
  private passwordTimeout: any = null;

  constructor(private authService: AuthService, private router: Router) {}

  // --- VALIDACIONES ---
  validarNombre() {
    if (!this.usuario.nombre.trim()) {
      this.errores.nombre = 'El nombre es obligatorio';
    } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(this.usuario.nombre)) {
      this.errores.nombre = 'Solo se permiten letras';
    } else {
      this.errores.nombre = '';
    }
  }

  validarApellidos() {
    if (!this.usuario.apellidos.trim()) {
      this.errores.apellidos = 'Los apellidos son obligatorios';
    } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(this.usuario.apellidos)) {
      this.errores.apellidos = 'Solo se permiten letras';
    } else {
      this.errores.apellidos = '';
    }
  }

  validarCorreo() {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!this.usuario.correo.trim()) {
      this.errores.correo = 'El correo es obligatorio';
    } else if (!regex.test(this.usuario.correo)) {
      this.errores.correo = 'Correo no válido';
    } else {
      this.errores.correo = '';
    }
  }

  validarContrasena() {
    if (!this.usuario.contrasena.trim()) {
      this.errores.contrasena = 'La contraseña es obligatoria';
    } else if (this.usuario.contrasena.length < 6) {
      this.errores.contrasena = 'Debe tener al menos 6 caracteres';
    } else {
      this.errores.contrasena = '';
    }
  }

soloLetrasNombre(event: KeyboardEvent) {
  const char = event.key;

  // Permitir letras, espacios y acentos
  const valido = /^[a-zA-ZÀ-ÿ\s]$/.test(char);

  if (!valido) {
    event.preventDefault();
    this.errores.nombre = 'Solo se permiten letras';
  } else {
    this.errores.nombre = '';
  }
}

soloLetrasApellidos(event: KeyboardEvent) {
  const char = event.key;

  const valido = /^[a-zA-ZÀ-ÿ\s]$/.test(char);

  if (!valido) {
    event.preventDefault();
    this.errores.apellidos = 'Solo se permiten letras';
  } else {
    this.errores.apellidos = '';
  }
}


  // --- MOSTRAR CONTRASEÑA TEMPORALMENTE ---
  mostrarContrasenaTemporal() {
    if (this.passwordTimeout) {
      clearTimeout(this.passwordTimeout);
    }

    this.mostrarPassword = true;

    this.passwordTimeout = setTimeout(() => {
      this.mostrarPassword = false;
    }, 450);
  }

  // --- REGISTRO ---
  registrar() {
    this.mensajeError = '';
    this.mensajeExito = '';

    // Ejecutar validaciones antes de enviar
    this.validarNombre();
    this.validarApellidos();
    this.validarCorreo();
    this.validarContrasena();

    // Si hay errores, no envía
    if (Object.values(this.errores).some(err => err !== '')) {
      this.mensajeError = 'Corrige los errores antes de continuar';
      return;
    }

    this.authService.register(this.usuario).subscribe({
      next: (res: any) => {
        if (res.status === 'success') {
          this.mensajeExito = 'Usuario registrado correctamente';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1500);
        } else {
          this.mensajeError = res.mensaje || 'No se pudo registrar';
        }
      },
      error: (err) => {
        console.error(err);
        this.mensajeError =
          err.status === 409
            ? 'El correo ya está registrado'
            : 'Error al registrar usuario.';
      }
    });
  }
}
















