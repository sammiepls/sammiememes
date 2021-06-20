import {
  ApolloClient,
  InMemoryCache,
  gql,
  createHttpLink,
  from,
} from '@apollo/client';
import { JokeCollectionQuery } from '../contentTypes/Jokes';
import { onError } from '@apollo/client/link/error';
import { MemeCollectionQuery } from '../contentTypes/Memes';

const SPACE = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

export const PAGE_SIZE = 2;

const httpLink = createHttpLink({
  uri: `https://graphql.contentful.com/content/v1/spaces/${SPACE}`,
  headers: {
    authorization: `Bearer ${ACCESS_TOKEN}`,
    'Content-Language': 'en-us',
  },
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, httpLink]),
});

export async function fetchJokes(page = 0): Promise<JokeCollectionQuery> {
  try {
    const { data } = await client.query({
      query: gql`
        query Jokes {
          jokeCollection(limit:${PAGE_SIZE}, skip:${PAGE_SIZE * page}) {
            items {
              content
              sys {
                id
              }
            }
            total
          }
        }
      `,
    });
    return data;
  } catch (e) {
    throw e;
  }
}

export async function fetchMemes(page = 0): Promise<MemeCollectionQuery> {
  try {
    const { data } = await client.query({
      query: gql`
        query Memes {
          memeCollection(limit:${PAGE_SIZE}, skip:${PAGE_SIZE * page}){
            items {
              sys {
                id
              }
              meme {
                title
                url
                width
                height
              }
            }
            total
          }
        }
      `,
    });
    return data;
  } catch (e) {
    throw e;
  }
}
