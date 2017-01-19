import { Response } from '@angular/http'

import { BonitaDataMappingInterface } from '../zgwnu2/bonita'

import { Ng2BonitaMasterData } from './ng2-bonita-master-data'

export class Ng2BonitaMasterDataMapping implements BonitaDataMappingInterface {

    mapResponse(res: Response) {
        let masterData: Ng2BonitaMasterData = new Ng2BonitaMasterData(res.json())
        return masterData
    }

    mapResponseArray(res: Response) {
        let bodyArray = res.json()
        let masterDataArray: Ng2BonitaMasterData[] = []
        for (let body of bodyArray) { masterDataArray.push(new Ng2BonitaMasterData(body)) }
        return masterDataArray
    }

}