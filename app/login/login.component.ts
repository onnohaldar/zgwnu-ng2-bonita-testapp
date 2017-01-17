import {Component, OnInit} from '@angular/core'

import { BonitaAuthenticationService, BonitaCredentials } from '../zgwnu2/bonita'

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: [ 'login.component.css' ],
})

export class LoginComponent implements OnInit {

    userName: string = 'walter.bates'
    passWord: string = 'bpm'
    navigateTo: string = 'test'
    private credentials: BonitaCredentials = new BonitaCredentials(this.userName, this.passWord, this.navigateTo)

    constructor(
        private authenticationService: BonitaAuthenticationService, 
    )
    {

    }

    ngOnInit():void {
    console.log('InitLoginComponent')
    this.test_Authentication_Login()
    }

    private test_Authentication_Login() {
        this.authenticationService.login(this.credentials)
    }
  
}