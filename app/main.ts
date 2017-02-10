// booting application JIT for use with generic webbrowser
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

// import application module to boot
import { AppModule } from './app.module'

// boot application for imported browser module
platformBrowserDynamic().bootstrapModule(AppModule)