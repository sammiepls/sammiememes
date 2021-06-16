import {
  ApolloClient,
  InMemoryCache,
  gql,
  createHttpLink,
} from '@apollo/client';
import { JokeCollectionQuery } from '../contentTypes/Jokes';

const SPACE = process.env.CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;

const httpLink = createHttpLink({
  uri: `https://graphql.contentful.com/content/v1/spaces/${SPACE}`,
  headers: {
    authorization: `Bearer ${ACCESS_TOKEN}`,
    'Content-Language': 'en-us',
  },
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
});

export async function fetchContent(
  query: string
): Promise<JokeCollectionQuery> {
  try {
    const { data } = await client.query({
      query: gql`
        ${query}
      `,
    });
    return data;
  } catch (e) {
    throw e;
  }
}
