import {Component, OnInit, Input } from '@angular/core'

import { BonitaResponse ,BonitaErrorResponse, BonitaConfigService, 
  BonitaAuthenticationService, BonitaSession
  } from '../zgwnu2/bonita'

import { TestCase } from '../test/test-case'

@Component({
  moduleId: module.id,
  selector: 'test-authentication',
  templateUrl: 'test-authentication.component.html',
  styleUrls: [ 'test-authentication.component.css' ],
})

export class TestAuthenticationComponent implements OnInit {
  @Input() testCase: TestCase

  // generic bonita rest api test vars
  response: BonitaResponse
  errorResponse: BonitaErrorResponse

  // authentication test vars
  session: BonitaSession
  passedTestAuthenticationSession: boolean = false

  constructor(
    private authenticationService: BonitaAuthenticationService, 
    private configService: BonitaConfigService
  )
  {
  }

  ngOnInit():void {
    console.log('InitTestComponent')

    // start testchain
    this.testAuthenticationGetSession()

  }

  private testAuthenticationGetSession() {
    
    if (this.configService.session) {
      console.log('session available in config (initial loaded webapp)')
      this.session = this.configService.session
      this.passedTestAuthenticationSession = true
      this.testCase.isAuthorized = true
      // next test in chain (1)
      // PM
    } 
    else {
      console.log('session is-not available (after reload webapp)')
      this.authenticationService.getSession()
        .subscribe(
          session => {
            this.session = session
            this.configService.session = session
            this.passedTestAuthenticationSession = true
            this.testCase.isAuthorized = true
            // next test in chain (1)
            // PM  
          }
        )
    }

  }

}