import { Ng2BonitaXrefContract } from './ng2-bonita-xref-contract'

export class Ng2BonitaDetailContract {

    constructor(data: any)
    {
        this.detailKey = data.detailKey
        this.xref = new Ng2BonitaXrefContract(data)
    }

    detailKey: String
    xref: Ng2BonitaXrefContract
}