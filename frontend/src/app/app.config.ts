import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // Import provideHttpClient
import { provideAnimations } from '@angular/platform-browser/animations'; // Optional: For animations
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), // Existing provider
    provideRouter(routes), // Existing provider
    provideHttpClient(), // Add HttpClient
    provideAnimations(), // Optional: Add animations support
  ],
};