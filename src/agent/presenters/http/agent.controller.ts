import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AgentExecutorService } from '~agent/application/agent-executor.service';
import { DragonBallService } from '~agent/application/dragon-ball.service';
import { toDivRows, toListItems } from '~agent/application/formatters/response.-formatter';
import { CharacterFilter } from '~agent/application/types/character-filter.type';
import { AskDto } from '../dtos/ask.dto';

@ApiTags('Agent Tools')
@Controller('agent')
export class AgentController {
  constructor(
    private service: AgentExecutorService,
    private dragonBallService: DragonBallService,
  ) {}

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
    return toDivRows(contents);
  }

  @ApiResponse({
    description: 'Retrieve the architecture of th application',
    type: String,
    status: HttpStatus.OK,
  })
  @Get('architecture')
  async getArchitecture(): Promise<string> {
    return toListItems([
      'Chat Model: Groq',
      'LLM: Gemma 2',
      'Tools: DuckDuckGoSearch, DragonBall Z, and Angular Document retriever tools',
      'Agent: Legacy Agent Executor',
    ]);
  }

  @ApiBody({
    description: 'An intance of CharacterFilter',
    required: true,
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'name',
          nullable: true,
        },
        gender: {
          type: 'string',
          description: 'gender',
          nullable: true,
        },
        race: {
          type: 'string',
          description: 'race',
          nullable: true,
        },
        affiliation: {
          type: 'string',
          description: 'affiliation',
          nullable: true,
        },
      },
    },
    examples: {
      gohan: {
        value: {
          name: 'Gohan',
        },
      },
      villain: {
        value: {
          affiliation: 'Villain',
        },
      },
      maleSaiyan: {
        value: {
          race: 'Saiyan',
          gender: 'Male',
        },
      },
    },
  })
  @ApiResponse({
    description: 'Retrieve dragon ball Z characters',
    type: String,
    status: HttpStatus.OK,
  })
  @Post('dragon')
  async getCharacters(@Body() characterFilter: CharacterFilter): Promise<string> {
    return this.dragonBallService.getCharacters(characterFilter);
  }
}
