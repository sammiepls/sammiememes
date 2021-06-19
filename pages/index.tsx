import { GetStaticProps } from 'next';
import Head from 'next/head';
import Masonry from 'react-masonry-css';
import { PAGE_SIZE, fetchJokes } from 'utils/contentful';
import Joke from 'components/Joke';
import Header from 'components/Header';
import { JokeProp } from 'utils/contentTypes/Jokes';
import { useState } from 'react';

type Props = {
  jokes: JokeProp[];
  error?: string;
  totalPages: number;
};

const Home: React.FC<Props> = ({
  jokes: jokeCollection,
  error,
  totalPages,
}) => {
  const [page, setPage] = useState(1);
  const [jokes, setJokes] = useState(jokeCollection);

  const fetchPaginatedJokes = async () => {
    const { jokeCollection: paginatedJokes } = await fetchJokes(page);
    setJokes([...jokes, ...paginatedJokes.items]);
  };

  return (
    <div className="bg-purple bg-opacity-100 h-screen overflow-y-scroll flex flex-col">
      <Head>
        <title>Horrible Jokes </title>
        <meta
          name="description"
          content="A curated library of Sammie's favourite horrible jokes and memes"
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inconsolata"
          rel="stylesheet"
        />
      </Head>

      <Header />
      <main className="md:mx-auto px-4 flex flex-1 flex-col max-w-6xl">
        {error ? (
          <div className="text-center">
            <h2 className="text-4xl mb-3">Sorry something went wrong!</h2>
            <p className="text-4xl mb-2">🙈🙏😰</p>
            <p>{error}</p>
          </div>
        ) : (
          <Masonry
            breakpointCols={{
              default: 3,
              700: 2,
              500: 1,
            }}
            className="masonry"
            columnClassName="masonry-column"
          >
            {jokes.map(({ content, sys }) => (
              <Joke key={sys.id} content={content} sys={sys} />
            ))}
          </Masonry>
        )}
        {page < totalPages && (
          <button
            className="block-shadow max-w-sm w-full py-2 mx-auto mb-5 bg-yellow justify-center focus:outline-none	cursor-pointer"
            onClick={() => {
              setPage((page) => page + 1);
              fetchPaginatedJokes();
            }}
          >
            Load more
          </button>
        )}
      </main>

      <footer className="text-center m-4">
        Built with ❤️ by{' '}
        <a rel="noreferrer" target="_blank" href="https://sammiepls.github.io">
          <span className="font-black">Sammie</span>
        </a>
        .
      </footer>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { jokeCollection } = await fetchJokes();
    return {
      props: {
        totalPages: jokeCollection.total / PAGE_SIZE,
        jokes: jokeCollection.items,
      },
    };
  } catch ({ graphQLErrors, networkError }) {
    let error;
    if (!!graphQLErrors.length) {
      graphQLErrors.forEach(
        ({ message }: { message: string }) => (error = message)
      );
    }

    if (networkError) {
      error = networkError.result.errors[0].message;
    }

    return {
      props: {
        error,
      },
    };
  }
};

export default Home;
