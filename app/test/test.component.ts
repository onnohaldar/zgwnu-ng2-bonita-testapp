import {Component, OnInit} from '@angular/core'

import { BonitaResponse ,BonitaErrorResponse, 
  BonitaAuthenticationService, BonitaSession
  } from '../zgwnu2/bonita'

import { TestBpmProcessComponent } from '../test-bpm-process/test-bpm-process.component'

@Component({
  moduleId: module.id,
  selector: 'app-test',
  templateUrl: 'test.component.html',
  styleUrls: [ 'test.component.css' ],
  providers: [
    TestBpmProcessComponent, 
    ]
})

export class TestComponent implements OnInit {

  // generic bonita rest api test vars
  response: BonitaResponse
  errorResponse: BonitaErrorResponse

  // authentication test vars
  session: BonitaSession
  passedTestAuthenticationSession: boolean = false

  constructor(
    private authenticationService: BonitaAuthenticationService, 
  )
  {
  }

  ngOnInit():void {
    console.log('InitTestComponent')

    // start testchain
    this.testAuthenticationGetSession()

  }

  private testAuthenticationGetSession() {
    this.authenticationService.getSession()
      .subscribe(
        session => {
          this.session = session
          this.authenticationService.setSessionToken(session)
          this.passedTestAuthenticationSession = true
          // next test in chain (1)
          // PM
        },
        errorResponse => this.errorResponse = errorResponse
      )
  }

}