import JokeProp from 'utils/contentTypes/Jokes';

const Joke: React.FC<JokeProp> = ({ content }) => {
  return <article className="block-shadow p-10 mb-6">{content}</article>;
};

export default Joke;
