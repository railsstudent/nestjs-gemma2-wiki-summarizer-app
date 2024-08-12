import { DynamicStructuredTool, tool } from '@langchain/core/tools';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { z } from 'zod';
import { CharacterFilter } from './types/character-filter.type';
import { Character } from './types/character.type';

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

  async getCharacters(characterFilter: CharacterFilter): Promise<string> {
    const filter = this.buildFilter(characterFilter);

    if (!filter) {
      return this.generateMarkdownList([]);
    }

    const characters = await this.httpService.axiosRef
      .get<Character[]>(`https://dragonball-api.com/api/characters?${filter}`)
      .then(({ data }) => data);

    return this.generateMarkdownList(characters);
  }

  createCharactersFilterTool(): DynamicStructuredTool<any> {
    return tool(async (input: CharacterFilter): Promise<string> => this.getCharacters(input), {
      name: 'dragonBallCharacters',
      description: `Call Dragon Ball filter characters API to retrieve characters by name, race, affiliation, or gender.`,
      schema: characterFilterSchema,
    });
  }

  private generateMarkdownList(characters: Character[]): string {
    if (!characters || !characters.length) {
      return '* No result';
    }

    return characters
      .map((character) => {
        const pronoun =
          character.gender === 'Female'
            ? { lowerCase: 'her', camelCase: 'Her' }
            : { lowerCase: 'his', camelCase: 'His' };
        const status = character.deletedAt ? 'dead' : 'alive';
        const { name, race, affiliation, ki, maxKi, image } = character;

        const markdown = `
  * ${name}
    * ${pronoun.camelCase} Ki is ${ki} and the maximum Ki is ${maxKi}. ${pronoun.camelCase} race is ${race} and ${pronoun.lowerCase} affiliation is ${affiliation}. According to the data, ${pronoun.lowerCase} is ${status}.
    * ![Image of ${name}](${image} "${name}")
`;
        return markdown;
      })
      .join('\n');
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
