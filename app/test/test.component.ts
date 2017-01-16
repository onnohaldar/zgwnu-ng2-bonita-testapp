import {Component, OnInit} from '@angular/core'

import { BonitaBpmProcessService 
  } from '../zgwnu2/bonita'

import { TestAuthenticationComponent } from '../test-authentication/test-authentication.component'
import { TestBpmProcessComponent } from '../test-bpm-process/test-bpm-process.component'

@Component({
  moduleId: module.id,
  selector: 'app-test',
  templateUrl: 'test.component.html',
  styleUrls: [ 'test.component.css' ],
  providers: [ 
    TestAuthenticationComponent, 
    BonitaBpmProcessService, 
    TestBpmProcessComponent, 
    ]
})

export class TestComponent implements OnInit {

  ngOnInit():void {
    console.log('InitTestComponent')

  }

}