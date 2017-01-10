import {Component, OnInit} from '@angular/core'

import { BonitaAuthenticationService, BonitaCredentials } from '../zgwnu2/bonita'

@Component({
  moduleId: module.id,
  selector: 'app-test',
  templateUrl: 'test.component.html',
  styleUrls: [ 'test.component.css' ],
})

export class TestComponent implements OnInit {

  constructor(
    private authenticationService: BonitaAuthenticationService, 
  )
  {

  }

  ngOnInit():void {
    console.log('InitTestComponent')
    this.test_Authentication_Login()
  }

  private test_Authentication_Login() {
    let userName: string = 'walter.bates'
    let passWord: string = 'bpm'
    this.authenticationService.login(new BonitaCredentials(userName, passWord))


  }
  
}