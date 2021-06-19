import {
  ApolloClient,
  InMemoryCache,
  gql,
  createHttpLink,
  from,
} from '@apollo/client';
import { JokeCollectionQuery } from '../contentTypes/Jokes';
import { onError } from '@apollo/client/link/error';

const SPACE = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

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
