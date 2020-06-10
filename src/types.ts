export interface List {
  readonly id: number;
  name: string;
  cards: Card[];
}

export interface Card {
  readonly id: number;
  text: string;
}
