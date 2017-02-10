import { Component, OnInit, Input } from '@angular/core'

import { BonitaResponse ,BonitaErrorResponse, BonitaSearchParms, 
  BonitaBpmCaseDocumentService, BonitaDocumentCreateInput, BonitaDocumentUpdateInput, BonitaDocument
  } from '../zgwnu2/bonita'

import { TestCase } from '../test/test-case'

@Component({
  moduleId: module.id,
  selector: 'test-bpm-case-document',
  templateUrl: 'test-bpm-case-document.component.html',
  styleUrls: [ 'test-bpm-case-document.component.css' ], 
})

export class TestBpmCaseDocumentComponent implements OnInit {
  @Input() testCase: TestCase

  // generic bonita rest api test vars
  response: BonitaResponse
  errorResponse: BonitaErrorResponse

  // Bpm Case Document test vars
  documentCreateInput: BonitaDocumentCreateInput
  documentCreated: BonitaDocument
  passedTest_BpmCaseDocument_createDocument: boolean = false

  constructor(
    private bpmCaseDocumentService: BonitaBpmCaseDocumentService, 
  )
  {
  }

  ngOnInit():void {
    console.log('Init TestBpmCaseDocumentComponent')

    // start testchain
    this.test_BpmCaseDocument_createDocument()

  }

  private test_BpmCaseDocument_createDocument() {
    this.documentCreateInput = new BonitaDocumentCreateInput()
    this.documentCreateInput.caseId = this.testCase.caseId,
    this.documentCreateInput.name = 'documentCreated',
    this.documentCreateInput.file = this.testCase.uploadedDocFile.tempPath,
    this.documentCreateInput.fileName = this.testCase.uploadedDocFile.filename,
    this.documentCreateInput.contentMimetype = this.testCase.uploadedDocFile.contentType

    this.bpmCaseDocumentService.createDocument(this.documentCreateInput)
      .subscribe(
        documentCreated => {
          this.documentCreated = documentCreated
          this.passedTest_BpmCaseDocument_createDocument = true
          // next test in chain (1)
          
        },
        errorResponse => this.errorResponse = errorResponse
      )
  }

}