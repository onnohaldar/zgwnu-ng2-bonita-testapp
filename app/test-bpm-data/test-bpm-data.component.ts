import {Component, OnInit} from '@angular/core'

import { BonitaResponse ,BonitaErrorResponse, 
  BonitaBpmDataService
  } from '../zgwnu2/bonita'

@Component({
  moduleId: module.id,
  selector: 'test-bpm-data',
  templateUrl: 'test-bpm-data.component.html',
  styleUrls: [ 'test-bpm-data.component.css' ],
})

export class TestBpmDataComponent implements OnInit {

  // generic bonita rest api test vars
  response: BonitaResponse
  errorResponse: BonitaErrorResponse

  // Bpm Data test vars
  passedTest_BpmData_searchCaseVariable: boolean = false

  constructor(
    private bpmDataService: BonitaBpmDataService, 
  )
  {
  }

  ngOnInit():void {
    console.log('Init TestBpmDataComponent')

    // start testchain
    this.test_BpmData_searchCaseVariables()

  }

  private test_BpmData_searchCaseVariables() {
    

  }

}