import { GetStaticProps } from 'next';
import Head from 'next/head';
import Masonry from 'react-masonry-css';
import { PAGE_SIZE, fetchJokes, fetchMemes } from 'utils/contentful';
import Joke from 'components/Joke';
import Meme from 'components/Meme';
import Header from 'components/Header';
import { JokeItemProp } from 'utils/contentTypes/Jokes';
import { useState } from 'react';
import { MemeItemProp } from '../utils/contentTypes/Memes';

type Props = {
  memes: MemeItemProp[];
  jokes: JokeItemProp[];
  items: (MemeItemProp | JokeItemProp)[];
  error?: string;
  totalPages: number;
  totalJokePages: number;
  totalMemePages: number;
};

const Home: React.FC<Props> = ({
  items: itemCollection,
  error,
  totalJokePages,
  totalMemePages,
}) => {
  const [page, setPage] = useState(1);
  const [jokePage, setJokePage] = useState(1);
  const [memePage, setMemePage] = useState(1);
  const [items, setItems] = useState(itemCollection);

  const handlePagination = () => {
    if (page < totalJokePages || page < totalMemePages) {
      setPage((page) => page + 1);
    }
    if (page < totalJokePages) {
      setJokePage((jokePage) => jokePage + 1);
      fetchPaginatedJokes();
    }

    if (page < totalMemePages) {
      setMemePage((memePage) => memePage + 1);
      fetchPaginatedMemes();
    }
  };

  const fetchPaginatedJokes = async () => {
    const { jokeCollection: paginatedJokes } = await fetchJokes(jokePage);
    setItems((items) => [...items, ...paginatedJokes.items]);
  };

  const fetchPaginatedMemes = async () => {
    const { memeCollection: paginatedMemes } = await fetchMemes(memePage);
    setItems((items) => [...items, ...paginatedMemes.items]);
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
            {items.map((item) =>
              item.__typename === 'Joke' ? (
                <Joke key={item.sys.id} content={item.content} sys={item.sys} />
              ) : (
                <Meme key={item.sys.id} meme={item.meme} sys={item.sys} />
              )
            )}
          </Masonry>
        )}
        {(page < totalMemePages || page < totalJokePages) && (
          <button
            className="block-shadow max-w-sm w-full py-2 mx-auto mb-5 bg-yellow justify-center focus:outline-none	cursor-pointer"
            onClick={handlePagination}
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
    const { memeCollection } = await fetchMemes();
    const { jokeCollection } = await fetchJokes();
    return {
      props: {
        totalJokePages: jokeCollection.total / PAGE_SIZE,
        totalMemePages: memeCollection.total / PAGE_SIZE,
        jokes: jokeCollection.items,
        memes: memeCollection.items,
        items: [...jokeCollection.items, ...memeCollection.items],
        totalPages: (memeCollection.total + jokeCollection.total) / PAGE_SIZE,
      },
    };
  } catch (e) {
    const { graphQLErrors, networkError } = e;
    let error;
    if (!!graphQLErrors) {
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
