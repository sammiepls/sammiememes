export type JokeProp = {
  content: string;
  sys: {
    id: string;
  };
};

export type JokeCollection = {
  jokeCollection: JokeProp[];
};

export interface JokeCollectionQuery {
  jokeCollection: {
    __typename: 'JokeCollection';
    items: JokeProp[];
  };
}
