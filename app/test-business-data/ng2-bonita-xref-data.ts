import { BonitaBusinessDataObject } from '../zgwnu2/bonita'

export class Ng2BonitaXrefData extends BonitaBusinessDataObject {

    constructor(xrefData: any) 
    {
        super(xrefData)
        this.xrefKey = xrefData.xrefKey
    }

    xrefKey: String
    
}