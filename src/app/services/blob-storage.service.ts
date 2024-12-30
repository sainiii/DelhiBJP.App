// import { Injectable } from '@angular/core';
// import {
//   AnonymousCredential,
//   BlobURL,
//   BlockBlobURL,
//   ContainerURL,
//   ServiceURL,
//   StorageURL,
//   Aborter,
//   uploadBrowserDataToBlockBlob,
//   BlobUploadCommonResponse,
// } from '@azure/storage-blob/dist';
// import { TransferProgressEvent } from '@azure/ms-rest-js';
// import { BehaviorSubject } from 'rxjs';
// import { ClientRequestIDPolicyFactory } from './client-request-idpolicy-factory';

// @Injectable({
//   providedIn: 'root'
// })
// export class BlobStorageService {
//   private _uploadProgressSource = new BehaviorSubject<number>(0);
//   public UploadProgress = this._uploadProgressSource.asObservable();
//   azureDataURL: string;
//   azureURL: any;

//   constructor() { }

//   public async uploadBlobToStorage(file: File, azureData: AzureData): Promise<BlobUploadCommonResponse> {
//     const anonymousCredential = new AnonymousCredential();
//     const pipeline = StorageURL.newPipeline(anonymousCredential);
//     pipeline.factories.unshift(new ClientRequestIDPolicyFactory('dba75b71-a943-4532-86be-07f86b1e78f0'));

//     this.azureURL = JSON.parse(sessionStorage.getItem('_asda_as21kjndfm'));
   
//     const serviceURL = new ServiceURL(
//       'https://p2pstoragenew.blob.core.windows.net/' + (this.azureURL.URL ? this.azureURL.URL : this.azureURL.URL),
//       pipeline
//     );
//     const containerName = this.azureURL.containerName;
//     const containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);
//     const blobName = azureData.FileName ? azureData.FileName : file.name;
//     const blobUrl = BlobURL.fromContainerURL(containerURL, blobName);
//     const blockblobURL = BlockBlobURL.fromBlobURL(blobUrl);
//     const options = {
//       blockSize: this.getBlockSize(file), parallelism: 10, progress: (transferProgressEvent: TransferProgressEvent) => {
//         this.onProgressChanged(transferProgressEvent, file, this._uploadProgressSource);
//       }
//     };
//     const blobUploadCommonResponse = await uploadBrowserDataToBlockBlob(Aborter.none, file, blockblobURL, options);

//     return blobUploadCommonResponse;
//   }

//   public async downloadFile(CONNECT_STR: string, fileName: string) {
//     const containerURL = await new ContainerURL(
//       'https://p2pstoragenew.blob.core.windows.net/' + CONNECT_STR,
//       StorageURL.newPipeline(
//         new AnonymousCredential()
//       ));

//     const blockBlobURL = BlockBlobURL.fromContainerURL(containerURL, fileName);
//     const downloadResponse = await blockBlobURL.download(Aborter.none, 0);
//     return downloadResponse.blobBody;
//   }

//   private getBlockSize(file: File): number {
//     const size32Mb = 1024 * 1024 * 32;
//     const size4Mb = 1024 * 1024 * 4;
//     const size512Kb = 1024 * 512;

//     return file.size > size32Mb ? size4Mb : size512Kb;
//   }

//   private onProgressChanged(transferProgressEvent: TransferProgressEvent, file: File,
//     uploadProgressSource: BehaviorSubject<number>) {
//     const percentCompleted: number = Math.round((transferProgressEvent.loadedBytes / file.size) * 100);
//     uploadProgressSource.next(percentCompleted);
//   }
// }

// class AzureData {
//   containerName: string;
//   url: string;
//   URL: string;
//   FileName: string;
// }
