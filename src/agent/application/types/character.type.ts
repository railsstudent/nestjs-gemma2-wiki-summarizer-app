import { Affiliation, Gender, Race } from './character-filter.type';

export type Character = {
  id: number;
  name: string;
  ki: string;
  maxKi: string;
  race: Race;
  gender: Gender;
  description: string;
  image: string;
  affiliation: Affiliation;
  deletedAt: Date | null;
};

export type CharacterAnswer = {
  text: string;
  image: string;
};
