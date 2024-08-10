import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CharacterFilter } from './types/character-filter.type';
import { Character } from './types/character.type';

@Injectable()
export class DragonBallService {
  constructor(private readonly httpService: HttpService) {}

  getCharacters(characterFilter: CharacterFilter): Promise<Character[]> {
    const filter = this.buildFilter(characterFilter);

    if (!filter) {
      return Promise.resolve([]);
    }

    return this.httpService.axiosRef
      .get<Character[]>(`https://www.dragonball-api.com/api/characters?${filter}`)
      .then(({ data }) => data);
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
