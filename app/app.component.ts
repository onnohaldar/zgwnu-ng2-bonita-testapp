import { DomSanitizer } from '@angular/platform-browser'
import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { MdIconRegistry } from '@angular/material'

import { BonitaConfigService, BonitaAuthenticationService } from './zgwnu2/bonita'
import { ToolbarComponent, ToolbarService } from './zgwnu2/toolbar'

import { TestComponent } from './test/test.component'

@Component({
  moduleId: module.id,
  selector: 'ng2-bonita-testapp',
  templateUrl: 'app.component.html',
  styleUrls: [ 'app.component.css' ],
  providers: [
    MdIconRegistry,
    ToolbarService, 
    BonitaAuthenticationService, 
    TestComponent, 
    ],
})

export class AppComponent {
  private iconsPath: string = 'assets/icons/material-design/'
  private actionIconsPath: string = this.iconsPath + 'action/'
  private contentIconsPath: string = this.iconsPath + 'content/'
  private navigationIconsPath: string = this.iconsPath + 'navigation/'

  constructor(
    private router: Router,
    private mdIconRegistry: MdIconRegistry,
    private bonitaConfigService: BonitaConfigService,
    private toolbarService: ToolbarService, 
    private sanitizer: DomSanitizer, 
  )
  {
    // toolbaar defaults
    toolbarService.componentReference = this
    toolbarService.exitButton.active = false
    toolbarService.mainTitle = 'Zgwnu Ng2 Bonita TestApp'
    toolbarService.subTitle = ' > Lib Functions ...'

    // register all used material icons here
    mdIconRegistry.addSvgIconInNamespace('action', 'done_black_24px', 
      sanitizer.bypassSecurityTrustResourceUrl(this.actionIconsPath + 'ic_done_black_24px.svg'))

    mdIconRegistry.addSvgIconInNamespace('action', 'open_in_browser_24px', 
      sanitizer.bypassSecurityTrustResourceUrl(this.actionIconsPath + 'ic_open_in_browser_24px.svg'))

    mdIconRegistry.addSvgIconInNamespace('content', 'remove_24px', 
      sanitizer.bypassSecurityTrustResourceUrl(this.contentIconsPath + 'ic_remove_24px.svg'))
    mdIconRegistry.addSvgIconInNamespace('content', 'save_24px', 
      sanitizer.bypassSecurityTrustResourceUrl(this.contentIconsPath + 'ic_save_24px.svg'))
    mdIconRegistry.addSvgIconInNamespace('content', 'add_24px', 
      sanitizer.bypassSecurityTrustResourceUrl(this.contentIconsPath + 'ic_add_24px.svg'))

    mdIconRegistry.addSvgIconInNamespace('navigation', 'close_24px', 
      sanitizer.bypassSecurityTrustResourceUrl(this.navigationIconsPath + 'ic_close_24px.svg'))
    mdIconRegistry.addSvgIconInNamespace('navigation', 'cancel_24px', 
      sanitizer.bypassSecurityTrustResourceUrl(this.navigationIconsPath + 'ic_cancel_24px.svg'))

  }

  onToolbarClickMenu() {
    this.router.navigate(['test'])
  }
  
}