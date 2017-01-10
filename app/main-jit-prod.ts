// booting application JIT for use with generic webbrowser
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { enableProdMode } from '@angular/core'

// import application module to boot
import { AppModule } from './app.module'

// boot application in production mode for imported browser module
enableProdMode()
platformBrowserDynamic().bootstrapModule(AppModule)