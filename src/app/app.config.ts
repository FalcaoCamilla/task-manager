import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api'
import { InMemoryService } from './services/in-memory.service';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(),
    provideAnimations(),
    provideToastr(), 
    importProvidersFrom(
      HttpClientInMemoryWebApiModule.forRoot(InMemoryService, {dataEncapsulation: false}),
    )
  ]
};
