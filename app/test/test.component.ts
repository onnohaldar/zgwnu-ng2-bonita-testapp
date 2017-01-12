import {Component, OnInit} from '@angular/core'

import { BonitaErrorResponse, 
  BonitaAuthenticationService, BonitaSession, 
  BonitaBpmProcessService, BonitaSearchParms, BonitaProcessDefinition } from '../zgwnu2/bonita'

@Component({
  moduleId: module.id,
  selector: 'app-test',
  templateUrl: 'test.component.html',
  styleUrls: [ 'test.component.css' ],
})

export class TestComponent implements OnInit {

  // generic bonita rest api test vars
  errorResponse: BonitaErrorResponse

  // authentication test vars
  session: BonitaSession
  passedTestAuthenticationSession: boolean = false

  // bpm process test vars
  processDefinition: BonitaProcessDefinition
  passedTestBPMProcessSearchProcessDefinitions: boolean = false

  constructor(
    private authenticationService: BonitaAuthenticationService, 
    private bpmProcessService: BonitaBpmProcessService, 
  )
  {
  }

  ngOnInit():void {
    console.log('InitTestComponent')

    // start testchain
    this.testAuthenticationSession()

    // start sequential tests


  }

  private testAuthenticationSession() {
    this.session = this.authenticationService.session
    if (this.session) { 
      this.passedTestAuthenticationSession = true 
      // next test in chain
      this.testBPMProcessSearchProcessDefinitions()
    }
  }


  private testBPMProcessSearchProcessDefinitions() {
    let bonitaSearchParms: BonitaSearchParms = new BonitaSearchParms(0, 1)
    bonitaSearchParms.filters = ['name=Basic Test', 'version=0.0.1']

    this.bpmProcessService.searchProcessDefinitions(bonitaSearchParms)
      .subscribe(
        processDefinitions => {
          this.processDefinition = processDefinitions[0]
          this.passedTestBPMProcessSearchProcessDefinitions = true
        },
        errorResponse => this.errorResponse = errorResponse
      )
  }
  
}