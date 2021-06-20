export type JokeProp = {
  content: string;
  sys: {
    id: string;
  };
};

export interface JokeItemProp extends JokeProp {
  __typename: 'Joke';
}

export type JokeCollection = {
  jokeCollection: JokeItemProp[];
};

export interface JokeCollectionQuery {
  jokeCollection: {
    __typename: 'JokeCollection';
    items: JokeItemProp[];
    total: number;
  };
}
