import { BonitaBusinessDataObject } from '../zgwnu2/bonita'

export class Ng2BonitaXrefData {

    constructor(xrefData: any) {
        this.xrefKey = xrefData.xrefKey
    }

    xrefKey: String
    
}