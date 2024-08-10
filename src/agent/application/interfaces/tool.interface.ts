import { AgentContent } from '../types/agent-content.type';

export interface ToolExecutor {
  execute(argument: string): Promise<AgentContent[]>;
}
