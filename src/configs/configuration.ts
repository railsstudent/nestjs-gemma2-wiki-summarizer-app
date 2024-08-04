export default () => ({
  port: parseInt(process.env.PORT || '3001', 10),
  groq: {
    apiKey: process.env.GROQ_API_KEY || '',
    model: process.env.GROQ_MODEL || 'gemma2-9b-it',
  },
  gemini: {
    apiKey: process.env.GEMINI_API_KEY || '',
  },
  swagger: {
    title: process.env.SWAGGER_TITLE || '',
    description: process.env.SWAGGER_DESCRIPTION || '',
    version: process.env.SWAGGER_VERSION || '',
    tag: process.env.SWAGGER_TAG || '',
  },
  wikipedia: {
    topKResults: parseInt(process.env.WIKIPEDIA_TOP_K_RESULTS || '3', 10),
    maxDocContentLength: parseInt(process.env.WIKIPEDIA_MAX_DOC_CONTENT_LENGTH || '7000', 10),
  },
});
