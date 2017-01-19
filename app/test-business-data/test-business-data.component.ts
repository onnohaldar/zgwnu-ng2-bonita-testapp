import {Component, OnInit, Input } from '@angular/core'

import { BonitaResponse ,BonitaErrorResponse, BonitaSearchParms, 
  BonitaBusinessDataService, BonitaBusinessDataContext, BonitaBusinessDataQueryParms
  } from '../zgwnu2/bonita'

import { TestCase } from '../test/test-case'

@Component({
  moduleId: module.id,
  selector: 'test-business-data',
  templateUrl: 'test-business-data.component.html',
  styleUrls: [ 'test-business-data.component.css' ],
})

export class TestBusinessDataComponent implements OnInit {
  @Input() testCase: TestCase

  // generic bonita rest api test vars
  response: BonitaResponse
  errorResponse: BonitaErrorResponse

  // Business Data test vars
  passedTest_BusinessData_queryBusinessData: boolean = false
  passedTest_BusinessData_getBusinessData: boolean = false

  constructor(
    private businessDataService: BonitaBusinessDataService, 
  )
  {
  }

  ngOnInit():void {
    console.log('Init TestBusinessDataComponent')

    // start testchain
    this.test_BusinessData_queryBusinessData()

  }

  private test_BusinessData_queryBusinessData() {
    let testQueryParms: BonitaBusinessDataQueryParms = new BonitaBusinessDataQueryParms('findByKey', 0, 1, ['key=A1'])

  }

  private test_BusinessData_getBusinessData() {

  }

}