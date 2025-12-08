import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PerfilClienteService } from './perfil-cliente.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-perfil-cliente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './perfil-cliente.html',
  styleUrls: ['./perfil-cliente.css']
})
export class PerfilCliente implements OnInit {

  form!: FormGroup;
  mensaje: string | null = null;
  cargando = true;

  iniciales: string = '?';   // 👈 Avatar inicial

  constructor(
    private fb: FormBuilder,
    private perfilService: PerfilClienteService,
    private router: Router

  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: [''],
      apellidos: [''],
      telefono: [''],
      direccion: ['']
    });

    this.cargarPerfil();
  }

  cargarPerfil() {
    this.perfilService.obtenerPerfil().subscribe({
      next: (res) => {
        const user = res.usuario;

        // Generar avatar de iniciales
        this.iniciales = this.generarIniciales(user.nombre, user.apellidos);

        this.form.patchValue(user);
        this.cargando = false;
      },
      error: () => {
        this.mensaje = 'Error al cargar el perfil';
        this.cargando = false;
      }
    });
  }

  generarIniciales(nombre: string, apellidos: string): string {
    const n = nombre ? nombre[0] : '';
    const a = apellidos ? apellidos[0] : '';
    return (n + a).toUpperCase();
  }

 guardar() {
  const data = this.form.getRawValue();

  this.perfilService.actualizarPerfil(data).subscribe({
    next: () => {
      this.mensaje = '✔ Perfil actualizado correctamente';

      // ⏳ Quitar mensaje después de 3 segundos
      setTimeout(() => {
        this.mensaje = null;
      }, 3000);
    },
    error: () => {
      this.mensaje = '❌ Error al actualizar el perfil';

      // ⏳ Quitar mensaje después de 3 segundos
      setTimeout(() => {
        this.mensaje = null;
      }, 3000);
    }
  });
}

regresar() {
  this.router.navigate(['/main']);  // ← Aquí va la ruta de tu menú principal
}

}







