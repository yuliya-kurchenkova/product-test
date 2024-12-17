import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import { provideRouter } from '@angular/router'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { provideEffects } from '@ngrx/effects'
import { provideStore } from '@ngrx/store'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { routes } from './app.routes'
import { mockBackendInterceptor } from './core/interceptors/mock-backend-interceptor'
import { ProductEffects } from './redux/product.effects'
import { productFeatureKey, productReducer } from './redux/product.reducer'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideStore({[productFeatureKey]: productReducer}),
    provideStoreDevtools(), 
    provideEffects(ProductEffects), 
    provideHttpClient(withInterceptors([mockBackendInterceptor]))
  ]
};
