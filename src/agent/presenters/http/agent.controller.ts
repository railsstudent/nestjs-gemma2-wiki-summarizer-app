import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AskDto } from '../dtos/ask.dto';
import { AgentExecutorService } from '~agent/application/agent-executor.service';
import { toDivRow } from '~agent/application/formatters/response.-formatter';

@ApiTags('Agent Tools')
@Controller('agent')
export class AgentController {
  constructor(private service: AgentExecutorService) {}

  @ApiBody({
    description: 'An intance of AskDto',
    required: true,
    schema: {
      type: 'object',
      properties: {
        Query: {
          type: 'string',
          description: 'query',
        },
      },
    },
    examples: {
      hongKongHistory: {
        value: {
          query: 'Please write a paragraph about the history of Hong Kong.',
        },
      },
      generativeAI: {
        value: {
          query: 'What is Generative AI?',
        },
      },
      langGraph: {
        value: {
          query: 'What is langGraph used for?',
        },
      },
    },
  })
  @ApiResponse({
    description: 'Use langchain agent to look up answer of an inquiry',
    type: String,
    status: HttpStatus.CREATED,
  })
  @Post()
  async ask(@Body() dto: AskDto): Promise<string> {
    const contents = await this.service.execute(dto.query);
    return toDivRow(contents);
  }
}
