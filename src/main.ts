import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideAuth0 } from '@auth0/auth0-angular';

//Gemini API Key: AIzaSyBUiOoBA_vCKxwiqMjdT8VXF5DBMGTqn74
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
