import {Component, OnInit} from '@angular/core'

import { BonitaAuthenticationService, BonitaSession } from '../zgwnu2/bonita'

@Component({
  moduleId: module.id,
  selector: 'app-test',
  templateUrl: 'test.component.html',
  styleUrls: [ 'test.component.css' ],
})

export class TestComponent implements OnInit {

  session: BonitaSession
  test_AuthenticationSessionPassed: boolean = false

  constructor(
    private authenticationService: BonitaAuthenticationService, 
  )
  {
  }

  ngOnInit():void {
    console.log('InitTestComponent')
    this.test_AuthenticationSession()
  }

  private test_AuthenticationSession() {
    this.session = this.authenticationService.session
    if (this.session) { this.test_AuthenticationSessionPassed = true }
  }
  
}