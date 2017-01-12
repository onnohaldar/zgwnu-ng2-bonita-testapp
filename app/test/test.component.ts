import {Component, OnInit} from '@angular/core'

import { BonitaAuthenticationService } from '../zgwnu2/bonita'

@Component({
  moduleId: module.id,
  selector: 'app-test',
  templateUrl: 'test.component.html',
  styleUrls: [ 'test.component.css' ],
})

export class TestComponent implements OnInit {

  constructor(
    public authenticationService: BonitaAuthenticationService, 
  )
  {

  }

  ngOnInit():void {
    console.log('InitTestComponent')
    this.test_Authentication_Session()
  }

  private test_Authentication_Session() {

  }
  
}