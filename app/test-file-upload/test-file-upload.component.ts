import {Component, OnInit, Input } from '@angular/core'

import {Observable} from 'rxjs/Observable'

import { BonitaResponse ,BonitaErrorResponse, 
  BonitaFileUploadService, BonitaFileUploadResponse, BonitaContractInputFile, BonitaFileUploadComponent
  } from '../zgwnu2/bonita'

import { TestCase } from '../test/test-case'

@Component({
  moduleId: module.id,
  selector: 'test-file-upload',
  templateUrl: 'test-file-upload.component.html',
  styleUrls: [ 'test-file-upload.component.css' ], 
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
  contractInputFile: BonitaContractInputFile = new BonitaContractInputFile()
  passedTest_FileUploadComponent: boolean = false

  constructor(
    private fileUploadService: BonitaFileUploadService, 
  )
  {
  }

  ngOnInit() {
    console.log('Init TestFileUploadComponent')

  }

  private test__FileUploadComponent(outputFile: BonitaContractInputFile) {
    if (outputFile.tempPath) { this.passedTest_FileUploadComponent = true }
  }

}