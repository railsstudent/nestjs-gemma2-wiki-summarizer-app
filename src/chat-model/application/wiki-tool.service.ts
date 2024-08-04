import { Runnable } from '@langchain/core/runnables';
import { Tool } from '@langchain/core/tools';
import { Injectable } from '@nestjs/common';
import { ToolExecutor } from './interfaces/tool.interface';
import { InjectChatModel } from './providers/groq-chat-model.provider';
import { InjectToolsByName } from './providers/wiki-tool.provider';

@Injectable()
export class WikiToolService implements ToolExecutor {
  constructor(
    @InjectChatModel() private llmWithTools: Runnable,
    @InjectToolsByName() private toolByNames: Record<string, Tool>,
  ) {}

  async execute(query: unknown): Promise<string> {
    const aiMessage = await this.llmWithTools.invoke(query as string);
    // console.log(aiMessage);
    // console.log(this.toolByNames);
    if (aiMessage.content) {
      return aiMessage.content;
    }

    if (aiMessage.tool_calls) {
      for (const toolCall of aiMessage.tool_calls) {
        const selectedTool = this.toolByNames[toolCall.name];
        // console.log(selectedTool);
        const toolMessage = await selectedTool.invoke(toolCall);
        console.log(toolMessage.content);
      }
    }

    return 'hello';
  }
}
