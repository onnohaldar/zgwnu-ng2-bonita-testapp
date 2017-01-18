import {Component, OnInit, Input } from '@angular/core'

import { BonitaResponse ,BonitaErrorResponse, BonitaSearchParms, 
  BonitaBpmDataService, BonitaCaseVariable
  } from '../zgwnu2/bonita'

import { TestCase } from '../test/test-case'

@Component({
  moduleId: module.id,
  selector: 'test-bpm-data',
  templateUrl: 'test-bpm-data.component.html',
  styleUrls: [ 'test-bpm-data.component.css' ],
})

export class TestBpmDataComponent implements OnInit {
  @Input() testCase: TestCase

  // generic bonita rest api test vars
  response: BonitaResponse
  errorResponse: BonitaErrorResponse

  // Bpm Data test vars
  caseVariableName: string = 'testCaseVariable'
  caseVariable: BonitaCaseVariable
  passedTest_BpmData_searchCaseVariables: boolean = false
  passedTest_BpmData_getCaseVariable: boolean = false


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
    let testSearchParms: BonitaSearchParms = new BonitaSearchParms(0, 1)
    testSearchParms.filters = [
        'name=' + this.caseVariableName,
        'case_id=' + this.testCase.caseId
        ]

    this.bpmDataService.searchCaseVariables(testSearchParms)
      .subscribe(
        caseVariables => {
          this.caseVariable = caseVariables[0]
          this.passedTest_BpmData_searchCaseVariables = true
          // next test in chain (1)
          this.test_BpmData_getCaseVariable()
        },
        errorResponse => this.errorResponse = errorResponse
      )
  }

  private test_BpmData_getCaseVariable() {
    this.bpmDataService.getCaseVariable(this.testCase.caseId, this.caseVariableName)
      .subscribe(
        caseVariable => {
          this.caseVariable = caseVariable
          this.passedTest_BpmData_getCaseVariable = true
          // next test in chain (1)

        },
        errorResponse => this.errorResponse = errorResponse
      )

  }

}