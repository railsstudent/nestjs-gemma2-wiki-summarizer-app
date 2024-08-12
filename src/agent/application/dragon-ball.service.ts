import { DynamicStructuredTool, tool } from '@langchain/core/tools';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { z } from 'zod';
import { CharacterFilter } from './types/character-filter.type';
import { Character, CharacterAnswer } from './types/character.type';

export const characterFilterSchema = z.object({
  name: z.string().optional().describe('Name of a Dragon Ball Z character.'),
  gender: z.enum(['Male', 'Female', 'Unknown']).optional().describe('Gender of a Dragon Ball Z caracter.'),
  race: z
    .enum([
      'Human',
      'Saiyan',
      'Namekian',
      'Majin',
      'Frieza Race',
      'Android',
      'Jiren Race',
      'God',
      'Angel',
      'Evil',
      'Nucleico',
      'Nucleico benigno',
      'Unknown',
    ])
    .optional()
    .describe('Race of a Dragon Ball Z character'),
  affiliation: z
    .enum([
      'Z Fighter',
      'Red Ribbon Army',
      'Namekian Warrior',
      'Freelancer',
      'Army of Frieza',
      'Pride Troopers',
      'Assistant of Vermoud',
      'God',
      'Assistant of Beerus',
      'Villain',
      'Other',
    ])
    .optional()
    .describe('Affiliation of a Dragon Ball Z character.'),
});

@Injectable()
export class DragonBallService {
  constructor(private readonly httpService: HttpService) {}

  async getCharacters(characterFilter: CharacterFilter): Promise<CharacterAnswer[]> {
    const filter = this.buildFilter(characterFilter);

    if (!filter) {
      return this.generateText([]);
    }

    const characters = await this.httpService.axiosRef
      .get<Character[]>(`https://dragonball-api.com/api/characters?${filter}`)
      .then(({ data }) => data);

    return this.generateText(characters);
  }

  createCharactersFilterTool(): DynamicStructuredTool<any> {
    return tool(async (input: CharacterFilter): Promise<CharacterAnswer[]> => this.getCharacters(input), {
      name: 'dragonBallCharacters',
      description: `Call Dragon Ball filter characters API to retrieve characters by name, race, affiliation, or gender.`,
      schema: characterFilterSchema,
    });
  }

  private generateText(characters: Character[]): CharacterAnswer[] {
    if (!characters || !characters.length) {
      return [
        {
          text: 'No result',
          image: '/images/person_placeholder.png',
        },
      ];
    }

    return characters.map((character) => {
      const pronoun =
        character.gender === 'Female' ? { lowerCase: 'her', camelCase: 'Her' } : { lowerCase: 'his', camelCase: 'His' };
      const status = character.deletedAt ? 'dead' : 'alive';
      const { name, race, affiliation, ki, maxKi } = character;
      return {
        text: `The character is ${name}, ${pronoun.lowerCase} Ki is ${ki} and the maximum Ki is ${maxKi}. 
          ${pronoun.camelCase} race is ${race} and ${pronoun.lowerCase} affiliation is ${affiliation}. 
          According to the data, ${pronoun.lowerCase} is ${status}.`,
        image: character.image,
      };
    });
  }

  private buildFilter(characterFilter: CharacterFilter) {
    let filter = '';
    if (characterFilter.name) {
      filter = `name=${characterFilter.name}`;
    }

    if (characterFilter.gender) {
      filter += filter.length ? '&' : '';
      filter += `gender=${characterFilter.gender}`;
    }

    if (characterFilter.race) {
      filter += filter.length ? '&' : '';
      filter += `race=${characterFilter.race}`;
    }

    if (characterFilter.affiliation) {
      filter += filter.length ? '&' : '';
      filter += `affiliation=${characterFilter.affiliation}`;
    }
    return filter;
  }
}
