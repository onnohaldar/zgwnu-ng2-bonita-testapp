import {Component, OnInit, Input } from '@angular/core'

import { BonitaResponse ,BonitaErrorResponse, BonitaSearchParms, BonitaDataMappingInterface, 
  BonitaBusinessDataService, BonitaBusinessDataContext, BonitaBusinessDataQueryParms
  } from '../zgwnu2/bonita'

import { TestCase } from '../test/test-case'
import { Ng2BonitaMasterData } from './ng2-bonita-master-data'
import { Ng2BonitaMasterDataMapping } from './ng2-bonita-master-data-mapping'

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
  objectType: string = 'Ng2BonitaMaster'
  queryName = 'findByMasterText'
  parameterValue: string = 'masterText=This is a test Text for zgwnu-ng2-bonita-testapp'
  dataQueryParms: BonitaBusinessDataQueryParms = new BonitaBusinessDataQueryParms(this.queryName, 0, 1, [this.parameterValue])
  masterDataMapping: BonitaDataMappingInterface = new Ng2BonitaMasterDataMapping()
  masterDataObject: Ng2BonitaMasterData
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
    this.businessDataService.queryBusinessData(this.objectType, this.dataQueryParms, this.masterDataMapping)
      .subscribe(
        masterDataObjects => {
          this.masterDataObject = masterDataObjects[0]
          this.passedTest_BusinessData_queryBusinessData = true
        },
        errorResponse => this.errorResponse = errorResponse
      )

  }

  private test_BusinessData_getBusinessData() {

  }

}