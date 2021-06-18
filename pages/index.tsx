import { GetStaticProps } from 'next';
import Head from 'next/head';
import Masonry from 'react-masonry-css';
import { fetchContent } from 'utils/contentful';
import Joke from 'components/Joke';
import Header from 'components/Header';
import { JokeProp } from 'utils/contentTypes/Jokes';

type Props = {
  jokes: JokeProp[];
};

const Home: React.FC<Props> = ({ jokes }) => {
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
      <main className="md:mx-auto px-4 flex-1 max-w-6xl">
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
  const query = `query Jokes {
          jokeCollection {
            items {
              content
              sys {
                id
              }
            }
          }
        }`;

  const { jokeCollection } = await fetchContent(query);

  return {
    props: {
      jokes: jokeCollection.items,
    },
  };
};

export default Home;
