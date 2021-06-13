import {
  ApolloClient,
  InMemoryCache,
  gql,
  createHttpLink,
} from "@apollo/client";

const SPACE = process.env.CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;

const httpLink = createHttpLink({
  uri: `https://graphql.contentful.com/content/v1/spaces/${SPACE}`,
  headers: {
    authorization: `Bearer ${ACCESS_TOKEN}`,
    "Content-Language": "en-us",
  },
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
});

export async function fetchContent(query) {
  try {
    const { data } = await client.query({
      query: gql`
        ${query}
      `,
    });
    return data;
  } catch (e) {}
}
