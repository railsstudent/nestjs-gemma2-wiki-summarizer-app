import { DynamicStructuredTool } from '@langchain/core/tools';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createRetrieverTool } from 'langchain/tools/retriever';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { createTextEmbeddingModel } from './embeddings/create-embedding-model';
import { loadFormWebPages, loadSignalWebPages } from './loaders/web-page-loader';

@Injectable()
export class AngularDocsService {
  private readonly logger = new Logger(AngularDocsService.name);

  constructor(private readonly configService: ConfigService) {}

  private async createSignalRetriever() {
    const docs = await loadSignalWebPages();
    this.logger.log(`number of signal docs -> ${docs.length}`);
    const embeddings = createTextEmbeddingModel(this.configService, 'Angular Signal');
    const vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);
    return vectorStore.asRetriever();
  }

  private async createFormRetriever() {
    const docs = await loadFormWebPages();
    this.logger.log(`number of form docs -> ${docs.length}`);
    const embeddings = createTextEmbeddingModel(this.configService, 'Angular Forms');
    const vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);
    return vectorStore.asRetriever();
  }

  private async createSignalRetrieverTool(): Promise<DynamicStructuredTool<any>> {
    const retriever = await this.createSignalRetriever();
    return createRetrieverTool(retriever, {
      name: 'angular_signal_search',
      description: `Search for information about Angular Signal. 
         For any questions about Angular Signal API and RxJS-interop, you must use this tool!
         Please return the answer in markdown format. 
         If you do not know the answer, please reply "You don't know." and stop.`,
    });
  }

  private async createFormRetrieverTool(): Promise<DynamicStructuredTool<any>> {
    const retriever = await this.createFormRetriever();
    return createRetrieverTool(retriever, {
      name: 'angular_form_search',
      description: `Search for information about Angular reactive, typed reactive, template-drive, and dynamic forms. 
         For any questions about Angular Forms, you must use this tool!
         Please return the answer in markdown format. 
         If you do not know the answer, please reply "You don't know." and stop.`,
    });
  }

  async createRetrieverTools(): Promise<DynamicStructuredTool<any>[]> {
    return Promise.all([this.createSignalRetrieverTool(), this.createFormRetrieverTool()]);
  }
}
