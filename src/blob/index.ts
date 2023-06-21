import express, { Express, Request, Response, Router } from "express";
import { BlobServiceClient } from "@azure/storage-blob";
import { images } from "../db/blobs";
import { logger } from "../utils/logger";


export const blobRouter: Router = Router();

const connStr = "UseDevelopmentStorage=true";

blobRouter.get("/", (req: Request, res: Response) => {
  res.send("Hello from Blob Router");
});
 
blobRouter.get(
  "/createBlobCont/:containername/secretkey1234", 
  async (req: Request, res: Response) => {

    const blobServiceClient = BlobServiceClient.fromConnectionString(connStr);
    const containerName = req.params.containername;
   
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const createContainerResponse = await containerClient.create();

    res.send(`Create container ${containerName} `); 
    //successfully, the request is ${createContainerResponse.requestId}`);
  }
);

blobRouter.get("/createBlobContainer", async (req: Request, res: Response) => {
  try {
    await images.createContainer();
    res.send(`Container ${images.containerName} is created or already exists`);
  } catch (error) {
    res.send("Error creating container");
  }
});

blobRouter.get("/listBlobs", async (req: Request, res: Response) => {
  try {
    const blobsList: any[] = await images.listContBlobs();
   // -> Return the list of blobs
    res.send(`Blobs List: \n -${blobsList}`); logger.info(`BlobRouter: ${blobsList}`);
  } catch (error) {
    res.send(`Error fetching blobs: ${error}`);
  }
});