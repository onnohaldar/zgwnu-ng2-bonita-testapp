import {Component, OnInit} from '@angular/core'

import { BonitaResponse ,BonitaErrorResponse, BonitaSearchParms, 
  BonitaBpmDataService, BonitaCaseVariable
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
  searchParms: BonitaSearchParms = new BonitaSearchParms(0, 1)
  filters: string[] = ['testCaseVariable']
  caseVariable: BonitaCaseVariable
  passedTest_BpmData_searchCaseVariables: boolean = false
  passedTest_BpmData_getCaseVariable: boolean = false


  constructor(
    private bpmDataService: BonitaBpmDataService, 
  )
  {
    this.searchParms.filters = this.filters
  }

  ngOnInit():void {
    console.log('Init TestBpmDataComponent')

    // start testchain
    this.test_BpmData_searchCaseVariables()

  }

  private test_BpmData_searchCaseVariables() {
    this.bpmDataService.searchCaseVariables(this.searchParms)
      .subscribe(
        caseVariables => {
          this.caseVariable = caseVariables[0]
          this.passedTest_BpmData_searchCaseVariables
          // next test in chain (1)
          this.test_BpmData_getCaseVariable()
        },
        errorResponse => this.errorResponse = errorResponse
      )
  }

  private test_BpmData_getCaseVariable() {

  }

}