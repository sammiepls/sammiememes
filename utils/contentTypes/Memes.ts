export type MemeProp = {
  meme: {
    title: string;
    url: string;
    width: number;
    height: number;
  };
  sys: {
    id: string;
  };
};

export interface MemeItemProp extends MemeProp {
  __typename: 'Meme';
}

export type MemeCollection = {
  memeCollection: MemeItemProp[];
};

export interface MemeCollectionQuery {
  memeCollection: {
    __typename: 'MemeCollection';
    items: MemeItemProp[];
    total: number;
  };
}
