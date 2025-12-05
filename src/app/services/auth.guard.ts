import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

// 🔹 Guard básico: permite acceso solo si hay sesión activa
export const authGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const isLogged = auth.isLoggedIn();

  if (!isLogged) {
    await router.navigate(['/login']);
    return false;
  }

  return true;
};

// 🔹 Guard avanzado: protege rutas según rol del usuario
export const roleGuard = (rolesPermitidos: string[]): CanActivateFn => {
  return async () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    const usuario = auth.getUsuario();

    if (auth.isLoggedIn() && rolesPermitidos.includes(usuario?.rol)) {
      return true;
    } else {
      await router.navigate(['/login']);
      return false;
    }
  };
};



