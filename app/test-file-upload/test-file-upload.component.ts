import { Component, OnInit, Input } from '@angular/core'
//import { Response } from '@angular/http'

import { Observable } from 'rxjs/Observable'

import { BonitaResponse ,BonitaErrorResponse, BonitaSearchParms, BonitaConfigService, 
  BonitaFileUploadService, BonitaFileUploadResponse, BonitaContractInputFile, BonitaFileUploadComponent,
  BonitaBpmTaskService, BonitaTask, BonitaBpmUserTaskService, BonitaUserTask
  } from '../zgwnu2/bonita'

import { TestCase } from '../test/test-case'
import { FileUploadContract } from './file-upload-contract'

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

  fileUploadContract: FileUploadContract
  fileUploadTaskName: string = 'File Upload Task'
  fileUploadTask: BonitaTask
  passedTest_FileUploadTask: boolean = false

  constructor(
    private fileUploadService: BonitaFileUploadService, 
    private bpmTaskService: BonitaBpmTaskService, 
    private bpmUserTaskService: BonitaBpmUserTaskService, 
    private configService: BonitaConfigService, 
  )
  {
  }

  ngOnInit() {
    console.log('Init TestFileUploadComponent')

  }

  private test__FileUploadComponent(outputFile: BonitaContractInputFile) {
    // check if a temporary file is uploaded to BonitaBPM server
    if (outputFile.tempPath) { 
      this.passedTest_FileUploadComponent = true
      // next test in chain (1 = Task upload to process document)
      this.fileUploadContract = new FileUploadContract(outputFile)
      this.test_FileUploadTask()
    }
  }

  private test_FileUploadTask() {
    this.searchFileUploadTask().subscribe(
      tasks => {
        this.fileUploadTask = tasks[0]
        this.assignFileUploadTask().subscribe(
          response => {
            this.response = response
            this.executeFileUploadTask().subscribe(
              response => {
                this.response = response
                this.passedTest_FileUploadTask = true
              },
              errorResponse => this.errorResponse = errorResponse
            )
          },
          errorResponse => this.errorResponse = errorResponse
        )
      },
      errorResponse => this.errorResponse = errorResponse
    )

  }

  private searchFileUploadTask(): Observable<BonitaTask[]>  {
      let testSearchParms: BonitaSearchParms = new BonitaSearchParms(0, 1)
      testSearchParms.filters = [
          'name=' + this.fileUploadTaskName,
          'parentCaseId=' + this.testCase.caseId
          ]

      return this.bpmTaskService.searchTasks(testSearchParms)
  }

  private assignFileUploadTask(): Observable<BonitaResponse> {
      return this.bpmUserTaskService.assignUserTask(this.fileUploadTask.id, this.configService.session.user_id)
  }

  private executeFileUploadTask(): Observable<BonitaResponse> {
    return this.bpmUserTaskService.executeUserTask(this.fileUploadTask.id, this.fileUploadContract)
  }

}