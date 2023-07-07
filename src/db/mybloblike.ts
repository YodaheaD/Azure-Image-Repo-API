import { BlobServiceClient } from "@azure/storage-blob";
import Logger from "../utils/logger";

const connectionString = "UseDevelopmentStorage=true";
const client = BlobServiceClient.fromConnectionString(connectionString);

export class BlobLike {
  constructor(public readonly containerName: string) {}

  // -> Error Catcher
  private catcher(err: any) {
    Logger.error(`BlobLike: ${err.message}`);
    if ((err.statusCode = !409)) {
      throw err;
    }
  }

  // -> Create Container 
  public async createContainer() {
    const containerClient = client.getContainerClient(this.containerName);
    await containerClient.create().catch(this.catcher);
  }

  // -> Get name of container
  private async getClient(name: string) {
    const containerClient = client.getContainerClient(this.containerName);
    return containerClient.getBlockBlobClient(name);
  }

  // -> Create a list of Blobs names in a Container
  public async listContBlobs() {
    const containerClient = client.getContainerClient(this.containerName);
    let blobArray: string[] = [];
    for await (const blob of containerClient.listBlobsFlat()) {
      blobArray.push(blob.name); //console.log(`- ${blob.name}`);
    }
    return blobArray;
  }
  // -> Get Buffer data for a Blob
  public async download(name: string) {
    const blobClient = this.getClient(name);
    return await (await blobClient).downloadToBuffer();
  }
}
