import { Component, OnInit, Input } from '@angular/core'

import { BonitaResponse ,BonitaErrorResponse, BonitaSearchParms, 
  BonitaBpmCaseService, BonitaCase
  } from '../zgwnu2/bonita'

import { TestCase } from '../test/test-case'

@Component({
  moduleId: module.id,
  selector: 'test-bpm-case',
  templateUrl: 'test-bpm-case.component.html',
  styleUrls: [ 'test-bpm-case.component.css' ], 
})

export class TestBpmCaseComponent implements OnInit {
  @Input() testCase: TestCase

  // generic bonita rest api test vars
  response: BonitaResponse
  errorResponse: BonitaErrorResponse

  // Bpm Case test vars
  caseGet: BonitaCase
  passedTest_BpmCase_getCase: boolean = false

  caseSearch: BonitaCase
  passedTest_BpmCase_searchCase: boolean = false

  caseContext: any
  passedTest_BpmCase_getCaseContext: boolean = false

  constructor(
    private bpmCaseService: BonitaBpmCaseService, 
  )
  {
  }

  ngOnInit():void {
    console.log('Init TestBpmCaseComponent')

    // start testchain
    this.test_BpmCase_getCase()

  }

  private test_BpmCase_getCase() {
    this.bpmCaseService.getCase(this.testCase.caseId)
      .subscribe(
        bonitaCase => {
          this.caseGet = bonitaCase
          this.passedTest_BpmCase_getCase = true
          // next test in chain (1)
          this.test_BpmCase_searchCase()
        },
        errorResponse => this.errorResponse = errorResponse
      )
  }

  private test_BpmCase_searchCase() {
    let testSearchParms: BonitaSearchParms = new BonitaSearchParms(0, 1)
    testSearchParms.filters = [
        'id=' + this.caseGet.id, 
       'started_by=' + this.caseGet.started_by
        ]

    this.bpmCaseService.searchCases(testSearchParms)
      .subscribe(
        bonitaCases => {
          this.caseSearch = bonitaCases[0]
          this.passedTest_BpmCase_searchCase = true
          // next test in chain (2)
          this.test_BpmCase_getCaseContext()
        },
        errorResponse => this.errorResponse = errorResponse
      )
  }

  private test_BpmCase_getCaseContext() {
    this.bpmCaseService.getCaseContext(this.testCase.caseId)
      .subscribe(
        caseContext => {
          this.caseContext = caseContext
          this.passedTest_BpmCase_getCaseContext = true
          // next test in chain (3)
          
        },
        errorResponse => this.errorResponse = errorResponse
      )
  }

}