import express, { Express, Request, Response, Router } from "express";
import { BlobServiceClient } from "@azure/storage-blob";
import { images } from "../db/blobs";
import Logger from "../utils/logger";
import fs from "fs";

export const blobRouter: Router = Router();

blobRouter.get("/createBlobContainer", async (req: Request, res: Response) => {
  try {
    await images.createContainer();
    res.send(`Container ${images.containerName} is created or already exists`);
  } catch (error) {
    res.send("Error creating container");
  }
});

//
blobRouter.get("/listBlobs", async (req: Request, res: Response) => {
  const start = Date.now();
  try {
    const blobsList: any[] = await images.listContBlobs();
    // -> Return the list of blobs
    console.log(`Blob List: `);
    Logger.info(` -> ${blobsList} `);

    Logger.warn(`Total Response time ${Date.now() - start} ms`);
    res.send(blobsList);
  } catch (error) {
    res.send(`Error fetching blobs: ${error}`);
  }
});

// -> Downloading a buffer from Blob and returning
blobRouter.post("/download", async (req: Request, res: Response) => {
  const { name } = req.body;

  const start = Date.now();
  try {
    const data = await images.download(name);

    // - Uncomment to save buffer to file
    // fs.writeFileSync("empty.jpg", data);
    res.send(JSON.stringify(data)); //res.send("Done");
  } catch (error) {
    res.send(`Error fetching blobs: ${error}`);
  }
});

const connStr = "UseDevelopmentStorage=true";

// -> Create Container with name from URL
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
