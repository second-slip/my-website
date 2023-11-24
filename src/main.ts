// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';

// bootstrapApplication(AppComponent,
//      {
//     providers: [
//         importProvidersFrom(AppRoutingModule, BrowserModule, ReactiveFormsModule, 
//         MatToolbarModule, MatButtonModule, MatIconModule, FormsModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule),
//         provideAnimations(),
//         provideHttpClient(withInterceptorsFromDi())
//     ]
// }
// ).catch(err => console.error(err));

bootstrapApplication(AppComponent, appConfig)
    .catch((err) => console.error(err));