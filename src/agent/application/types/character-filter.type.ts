export type Gender = 'Male' | 'Female' | 'Unknown';
export type Race =
  | 'Human'
  | 'Saiyan'
  | 'Namekian'
  | 'Majin'
  | 'Frieza Race'
  | 'Android'
  | 'Jiren Race'
  | 'God'
  | 'Angel'
  | 'Evil'
  | 'Nucleico'
  | 'Nucleico benigno'
  | 'Unknown';
export type Affiliation =
  | 'Z Fighter'
  | 'Red Ribbon Army'
  | 'Namekian Warrior'
  | 'Freelancer'
  | 'Army of Frieza'
  | 'Pride Troopers'
  | 'Assistant of Vermoud'
  | 'God'
  | 'Assistant of Beerus'
  | 'Villain'
  | 'Other';

export type CharacterFilter = {
  name?: string;
  gender?: Gender;
  race?: Race;
  affiliation?: Affiliation;
};
