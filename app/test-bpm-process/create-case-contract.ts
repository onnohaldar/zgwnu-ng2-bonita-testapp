import { Ng2BonitaMasterContract } from './ng2-bonita-master-contract'

export class CreateCaseContract {

    constructor(data: any)
    {
        this.newDataInput = new Ng2BonitaMasterContract(data)
    }

    newDataInput: Ng2BonitaMasterContract
}
