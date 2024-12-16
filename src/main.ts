/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NMaF5cXmBCf0x3QXxbf1x1ZFJMZV9bRnBPMyBoS35RckRhWHpeeHRURmZdUkR/'); // Replace with your actual license key




platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
