import { ChatPromptTemplate } from '@langchain/core/prompts';
import { Tool } from '@langchain/core/tools';
import { ChatGroq } from '@langchain/groq';
import { Inject, Provider } from '@nestjs/common';
import { AgentExecutor, createToolCallingAgent } from 'langchain/agents';
import { AGENT_EXECUTOR } from '../constants/agent.constant';
import { GROQ_CHAT_MODEL } from '../constants/groq-chat-model.constant';
import { TOOLS } from '../constants/wiki-tool.constant';

const prompt = ChatPromptTemplate.fromMessages([
  ['system', 'You are an expert of using langchain tools to look up information.'],
  ['placeholder', '{chat_history}'],
  ['human', '{input}'],
  ['placeholder', '{agent_scratchpad}'],
]);

export function InjectAgent() {
  return Inject(AGENT_EXECUTOR);
}

export const AgentExecutorProvider: Provider<AgentExecutor> = {
  provide: AGENT_EXECUTOR,
  useFactory: async (llm: ChatGroq, tools: Tool[]) => {
    const agent = await createToolCallingAgent({ llm, tools, prompt });
    return new AgentExecutor({
      agent,
      tools,
    });
  },
  inject: [GROQ_CHAT_MODEL, TOOLS],
};
