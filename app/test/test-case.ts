import { BonitaBusinessDataContext, BonitaContractInputFile } from '../zgwnu2/bonita'

export class TestCase {
    isAuthorized: boolean = false
    caseId: string
    businessDataContext: BonitaBusinessDataContext
    uploadedDocFile: BonitaContractInputFile
}