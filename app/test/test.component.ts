import {Component, OnInit} from '@angular/core'

import { BonitaBpmProcessService, BonitaBpmActivityService, BonitaBpmHumanTaskService, BonitaBpmTaskService, 
  BonitaBpmUserTaskService, BonitaBpmDataService, BonitaBusinessDataService, BonitaFileUploadService,
  BonitaBpmCaseService, BonitaBpmCaseDocumentService
  } from '../zgwnu2/bonita'

import { TestCase } from './test-case'
import { TestAuthenticationComponent } from '../test-authentication/test-authentication.component'
import { TestBpmProcessComponent } from '../test-bpm-process/test-bpm-process.component'
import { TestBpmActivityTaskComponent } from '../test-bpm-activity-task/test-bpm-activity-task.component'
import { TestBpmDataComponent } from '../test-bpm-data/test-bpm-data.component'
import { TestBusinessDataComponent } from '../test-business-data/test-business-data.component'
import { TestFileUploadComponent } from '../test-file-upload/test-file-upload.component'
import { TestBpmCaseComponent } from '../test-bpm-case/test-bpm-case.component'
import { TestBpmCaseDocumentComponent } from '../test-bpm-case-document/test-bpm-case-document.component'
import { TestMdAutocompleteComponent } from '../test-md-autocomplete/test-md-autocomplete.component'

@Component({
  moduleId: module.id,
  selector: 'app-test',
  templateUrl: 'test.component.html',
  styleUrls: [ 'test.component.css' ],
  providers: [ 
    TestAuthenticationComponent, 
    
    BonitaBpmProcessService, 
    TestBpmProcessComponent, 

    BonitaBpmActivityService, 
    BonitaBpmHumanTaskService, 
    BonitaBpmTaskService, 
    BonitaBpmUserTaskService, 
    TestBpmActivityTaskComponent, 

    BonitaBpmDataService,
    TestBpmDataComponent, 

    BonitaBusinessDataService, 
    TestBusinessDataComponent, 

    BonitaFileUploadService, 
    TestFileUploadComponent, 

    BonitaBpmCaseService,
    TestBpmCaseComponent, 

    BonitaBpmCaseDocumentService, 
    TestBpmCaseDocumentComponent, 

    TestMdAutocompleteComponent, 

    ]
})

export class TestComponent implements OnInit {
  testCase: TestCase = new TestCase()

  ngOnInit():void {
    console.log('InitTestComponent')

  }

}