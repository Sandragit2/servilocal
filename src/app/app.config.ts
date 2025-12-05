import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { jwtInterceptor } from './services/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // HTTP + Interceptores JWT
    provideHttpClient(withInterceptors([jwtInterceptor])),

    // Soporte de detección de cambios eficiente
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Enrutamiento principal
    provideRouter(routes)
  ]
};



