import {Component, OnInit} from '@angular/core'

import { BonitaResponse ,BonitaErrorResponse, 
  BonitaAuthenticationService, BonitaSession, 
  BonitaBpmProcessService, BonitaSearchParms, BonitaProcessDefinition, BonitaCreateCaseSuccessResponse 
  } from '../zgwnu2/bonita'

import { CreateCaseContract } from './create-case-contract'
import { Ng2BonitaMasterContract } from './ng2-bonita-master-contract'
import { Ng2BonitaDetailContract } from './ng2-bonita-detail-contract'
import { Ng2BonitaXrefContract } from './ng2-bonita-xref-contract'

@Component({
  moduleId: module.id,
  selector: 'app-test',
  templateUrl: 'test.component.html',
  styleUrls: [ 'test.component.css' ],
})

export class TestComponent implements OnInit {

  // generic bonita rest api test vars
  response: BonitaResponse
  errorResponse: BonitaErrorResponse

  // authentication test vars
  session: BonitaSession
  passedTestAuthenticationSession: boolean = false

  // bpm process test vars
  processDefinition: BonitaProcessDefinition
  passedTestBPMProcessSearchProcessDefinitions: boolean = false
  passedTestBPMProcessGetProcessDefinition: boolean = false
  passedTestBPMProcessCreateCase: boolean = false
  createCaseData: any = {
    masterKey: 'MasterKeyValue1',
    masterDate: new Date(2017, 0, 12),
    details: [
      {detailKey: 'detailTestKey1A', xrefKey: 'xrefTestKeyAA'},
      {detailKey: 'detailTestKey2B', xrefKey: 'xrefTestKeyBB'},
      {detailKey: 'detailTestKey3C', xrefKey: 'xrefTestKeyCC'},
    ],
    masterBoolean: true,
    masterDouble: Number.MAX_VALUE,
    masterFloat: 1000.327436,
    masterInteger: 10000,
    masterLong: 100000,
    masterText: 'This is a test Text for zgwnu-ng2-bonita-testapp'
  }
  createCaseSuccessResponse: BonitaCreateCaseSuccessResponse

  constructor(
    private authenticationService: BonitaAuthenticationService, 
    private bpmProcessService: BonitaBpmProcessService, 
  )
  {
  }

  ngOnInit():void {
    console.log('InitTestComponent')

    // start testchain
    this.testAuthenticationGetSession()

  }

  private testAuthenticationGetSession() {
    this.authenticationService.getSession()
      .subscribe(
        session => {
          this.session = session
          this.authenticationService.setSessionToken(session)
          this.passedTestAuthenticationSession = true
          // next test in chain (1)
          this.testBPMProcessSearchProcessDefinitions()
        },
        errorResponse => this.errorResponse = errorResponse
      )
  }


  private testBPMProcessSearchProcessDefinitions() {
    let bonitaSearchParms: BonitaSearchParms = new BonitaSearchParms(0, 1)
    bonitaSearchParms.filters = ['name=Basic Test', 'version=0.0.1']

    this.bpmProcessService.searchProcessDefinitions(bonitaSearchParms)
      .subscribe(
        processDefinitions => {
          this.processDefinition = processDefinitions[0]
          this.passedTestBPMProcessSearchProcessDefinitions = true
          // next test in chain (2)
          this.testBPMProcessGetProcessDefinition()
        },
        errorResponse => this.errorResponse = errorResponse
      )
  }

  private testBPMProcessGetProcessDefinition() {
    this.bpmProcessService.getProcessDefinition(this.processDefinition.id)
      .subscribe(
        processDefinition => {
          this.processDefinition = processDefinition
          this.passedTestBPMProcessGetProcessDefinition = true
          // next test in chain (3)
          this.testBPMProcessCreateCase()
        },
        errorResponse => this.errorResponse = errorResponse
      )
  }
  
  private testBPMProcessCreateCase() {
    let contract: CreateCaseContract = new CreateCaseContract(this.createCaseData)  
    console.log(contract)
    this.bpmProcessService.createCase(this.processDefinition.id, contract)
      .subscribe(
        createCaseSuccessResponse => {
          this.createCaseSuccessResponse = createCaseSuccessResponse
          this.passedTestBPMProcessCreateCase = true
        },
        errorResponse => this.errorResponse = errorResponse
      )

  }

}