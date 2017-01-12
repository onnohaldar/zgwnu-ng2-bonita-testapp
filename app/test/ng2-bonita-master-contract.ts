import { Ng2BonitaDetailContract } from './ng2-bonita-detail-contract'

export class Ng2BonitaMasterContract {

    constructor(data: any)
    {
        this.masterKey = data.masterKey
        this.masterDate = data.masterDate

        for (let detail of data.details) {
            this.details.push(new Ng2BonitaDetailContract(detail))
        }

        this.masterBoolean = data.masterBoolean
        this.masterDouble = data.masterDouble
        this.masterFloat = data.masterFloat
        this.masterInteger = data.masterInteger
        this.masterLong = data.masterLong
        this.masterText = data.masterText
    }

    masterKey: String
    masterDate: Date
    details: Ng2BonitaDetailContract[] = []
    masterBoolean: Boolean
    masterDouble: Number
    masterFloat: Number
    masterInteger: Number
    masterLong: Number
    masterText: String
}