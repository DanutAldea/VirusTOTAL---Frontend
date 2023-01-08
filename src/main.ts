import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

export const apiUrl = "http://localhost:8080/api/v1"

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
