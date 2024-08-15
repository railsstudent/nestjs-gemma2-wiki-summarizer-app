import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { CheerioWebBaseLoader } from '@langchain/community/document_loaders/web/cheerio';

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 100,
});

export async function loadWebPages() {
  const webPages = [
    'https://angular.dev/guide/signals',
    'https://angular.dev/guide/signals/rxjs-interop',
    'https://angular.dev/guide/signals/inputs',
    'https://angular.dev/guide/signals/model',
    'https://angular.dev/guide/signals/queries',
  ];

  const loaders = webPages.map((page) => new CheerioWebBaseLoader(page));
  const docs = await Promise.all(loaders.map((loader) => loader.load()));
  const signalDocs = docs.flat();
  return splitter.splitDocuments(signalDocs);
}
