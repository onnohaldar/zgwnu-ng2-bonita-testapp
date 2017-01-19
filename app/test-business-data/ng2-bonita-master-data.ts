import { BonitaBusinessDataObject } from '../zgwnu2/bonita'

import { Ng2BonitaDetailData } from './ng2-bonita-detail-data'

export class Ng2BonitaMasterData extends BonitaBusinessDataObject {

    constructor(masterData: any) 
    {
        super(masterData)
        this.masterKey = masterData.masterKey
        this.masterDate = new Date(masterData.masterDate)
        for (let detail of masterData.details) {
            this.details.push(new Ng2BonitaDetailData(detail))
        }
        this.masterBoolean = masterData.masterBoolean
        this.masterDouble = masterData.masterDouble
        this.masterFloat = masterData.masterFloat
        this.masterInteger = masterData.masterInteger
        this.masterLong = masterData.masterLong
        this.masterText = masterData.masterText     
    }

    masterKey: String
    masterDate: Date
    details: Ng2BonitaDetailData[] = []
    masterBoolean: Boolean
    masterDouble: Number
    masterFloat: Number
    masterInteger: Number
    masterLong: Number
    masterText: String
}