// generic angular 2 modules
import { NgModule }      from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule }   from '@angular/forms'
import { HttpModule }    from '@angular/http'
import { MaterialModule } from '@angular/material'

// additional angular 2 modules
import { DatepickerModule } from './zgwnu2/datepicker/datepicker.module'
import 'hammerjs'

// application modules
import { AppRoutingModule } from './app-routing.module'

// application components
import { AppComponent } from './app.component'
import { ToolbarComponent } from './zgwnu2/toolbar'
import { BonitaFileUploadComponent } from './zgwnu2/bonita'
import { LoginComponent } from './login/login.component'
import { TestComponent } from './test/test.component'
import { TestAuthenticationComponent } from './test-authentication/test-authentication.component'
import { TestBpmProcessComponent } from './test-bpm-process/test-bpm-process.component'
import { TestBpmActivityTaskComponent } from './test-bpm-activity-task/test-bpm-activity-task.component'
import { TestBpmDataComponent } from './test-bpm-data/test-bpm-data.component'
import { TestBusinessDataComponent } from './test-business-data/test-business-data.component'
import { TestFileUploadComponent } from './test-file-upload/test-file-upload.component'

// application service providers
import { BonitaConfigService } from './zgwnu2/bonita'

// angular metadata for app module 
@NgModule({
  // import all used modules
  imports: [ 
    BrowserModule,
    FormsModule, 
    HttpModule,
    MaterialModule.forRoot(), 
    DatepickerModule, 
    AppRoutingModule, 
    ],
  // declarations for all application components
  declarations: [  
    AppComponent,
    ToolbarComponent, 
    BonitaFileUploadComponent, 
    LoginComponent, 
    TestComponent, 
    TestAuthenticationComponent, 
    TestBpmProcessComponent, 
    TestBpmActivityTaskComponent, 
    TestBpmDataComponent, 
    TestBusinessDataComponent, 
    TestFileUploadComponent, 
   ],
  // globaly used providers (services)
  providers: [ 
    BonitaConfigService,
    ], 
  // start-up with components and services
  bootstrap: [ AppComponent ]
})

// export class so it can be for booting from main module
export class AppModule { 

}
