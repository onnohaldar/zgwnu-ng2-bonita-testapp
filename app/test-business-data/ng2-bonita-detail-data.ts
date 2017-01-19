import { BonitaBusinessDataObject } from '../zgwnu2/bonita'

import { Ng2BonitaXrefData } from './ng2-bonita-xref-data'

export class Ng2BonitaDetailData extends BonitaBusinessDataObject {

    constructor(detailData: any) 
    {
        super(detailData)
        this.detailKey = detailData.detailKey
        this.xref = new Ng2BonitaXrefData(detailData.xref)
    }

    detailKey: String
    xref: Ng2BonitaXrefData

}