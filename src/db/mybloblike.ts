import { BlobServiceClient } from "@azure/storage-blob";
import { logger } from "../utils/logger";

const connectionString = "UseDevelopmentStorage=true";
const client = BlobServiceClient.fromConnectionString(connectionString);




export class BlobLike {
  constructor(public readonly containerName: string) 
  {
   // logger.info(`BlobLike constructor: containerName: ${containerName}`);
  }


  private catcher(err: any) {
    //logger.error(`BlobLike: ${err.message}`);
    if(err.statusCode =! 409) {
        
      throw err;
    }
  }

public async createContainer(){
   
    const containerClient = client.getContainerClient(this.containerName);
    await containerClient.create().catch(this.catcher);
   
}

private async getClient(name:string){
    const containerClient = client.getContainerClient(this.containerName);
    return containerClient.getBlockBlobClient(name);
}
public async listContBlobs(){
    const containerClient = client.getContainerClient(this.containerName);
    let blobArray:string[]=[];
    for await (const blob of containerClient.listBlobsFlat()) {
        blobArray.push(blob.name);//console.log(`- ${blob.name}`);
      }
   return blobArray;
}

}
