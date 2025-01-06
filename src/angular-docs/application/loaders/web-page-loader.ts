import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { CheerioWebBaseLoader } from '@langchain/community/document_loaders/web/cheerio';

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 100,
});

export async function loadSignalWebPages() {
  const webPages = [
    'https://angular.dev/guide/signals',
    'https://angular.dev/guide/signals/linked-signal',
    'https://angular.dev/guide/signals/resource',
    'https://angular.dev/ecosystem/rxjs-interop',
    'https://angular.dev/guide/components/inputs',
    'https://angular.dev/guide/components/queries',
    'https://angular.dev/guide/components/outputs',
  ];

  return loadWebPages(webPages);
}

export async function loadFormWebPages() {
  const webPages = [
    'https://angular.dev/guide/forms',
    'https://angular.dev/guide/forms/reactive-forms',
    'https://angular.dev/guide/forms/typed-forms',
    'https://angular.dev/guide/forms/template-driven-forms',
    'https://angular.dev/guide/forms/form-validation',
    'https://angular.dev/guide/forms/dynamic-forms',
  ];

  return loadWebPages(webPages);
}

async function loadWebPages(webPages: string[]) {
  const loaders = webPages.map((page) => new CheerioWebBaseLoader(page));
  const docs = await Promise.all(loaders.map((loader) => loader.load()));
  const signalDocs = docs.flat();
  return splitter.splitDocuments(signalDocs);
}
