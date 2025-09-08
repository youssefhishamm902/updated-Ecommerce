import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideToastr} from 'ngx-toastr'
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import{ provideAnimations } from '@angular/platform-browser/animations';
import { headersInterceptor } from './core/interceptors/headers/headers.interceptor';
import { errorsInterceptor } from './core/interceptors/errors/errors.interceptor';
import {NgxSpinnerModule} from "ngx-spinner"
import { loadingInterceptor } from './core/interceptors/loading/loading.interceptor';
import { TranslateHttpLoader} from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';



export function HttpLoaderFactory(http: HttpClient) {
  const config = { prefix: '/i18n/', suffix: '.json', enforceLoading: false, useHttpBackend: false };
  return new TranslateHttpLoader(http, config.prefix, config.suffix);
}


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    provideClientHydration(),
    provideHttpClient(withFetch(),withInterceptors([headersInterceptor,errorsInterceptor, loadingInterceptor])),
    provideAnimations(),
    provideToastr(),
    importProvidersFrom(NgxSpinnerModule, TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })),
    {
      provide: TranslateHttpLoader,
      useValue: {
        prefix: '/i18n/',
        suffix: '.json',
        enforceLoading: false,
        useHttpBackend: false
      }
    }
  ]
};
