import { DynamicStructuredTool } from '@langchain/core/tools';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createRetrieverTool } from 'langchain/tools/retriever';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { createTextEmbeddingModel } from './embeddings/create-embedding-model';
import { loadWebPages } from './loaders/web-page-loader';

@Injectable()
export class AngularDocsService {
  private readonly logger = new Logger(AngularDocsService.name);

  constructor(private readonly configService: ConfigService) {}

  private async loadDocuments() {
    const docs = await loadWebPages();
    this.logger.log(`number of docs -> ${docs.length}`);
    // if (docs.length > 0) {
    //   const firstPage = docs[0];
    //   console.log("first page's metadata", firstPage.metadata);
    //   console.log('first page', firstPage.pageContent);
    // }
    return docs;
  }

  private async createSignalRetriever() {
    const docs = await this.loadDocuments();
    const embeddings = createTextEmbeddingModel(this.configService);
    const vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);
    return vectorStore.asRetriever();
  }

  async createSignalRetrieverTool(): Promise<DynamicStructuredTool<any>> {
    const retriever = await this.createSignalRetriever();
    return createRetrieverTool(retriever, {
      name: 'angular_signal_search',
      description:
        'Search for information about Angular Signal. For any questions about Angular Signal API, you must use this tool!',
    });
  }
}
