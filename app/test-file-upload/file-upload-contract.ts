import { BonitaContractInputFile } from '../zgwnu2/bonita'

export class FileUploadContract {

    constructor(uploadFileInput: BonitaContractInputFile)
    {
        this.uploadFileInput = uploadFileInput
    }

    uploadFileInput: BonitaContractInputFile
}