import {Component, OnInit, Input } from '@angular/core'

import { BonitaResponse ,BonitaErrorResponse, 
  BonitaFileUploadService, BonitaFileUploadResponse, BonitaContractInputFile, BonitaFileUploadComponent
  } from '../zgwnu2/bonita'

import { TestCase } from '../test/test-case'

@Component({
  moduleId: module.id,
  selector: 'test-bpm-data',
  templateUrl: 'test-bpm-data.component.html',
  styleUrls: [ 'test-bpm-data.component.css' ], 
  providers: [
      BonitaFileUploadComponent, 
  ]
})

export class TestFileUploadComponent implements OnInit {
  @Input() testCase: TestCase

  // generic bonita rest api test vars
  response: BonitaResponse
  errorResponse: BonitaErrorResponse

  // File Upload test vars


  constructor(
    private fileUploadService: BonitaFileUploadService, 
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