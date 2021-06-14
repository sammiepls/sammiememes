import JokeProp from 'utils/contentTypes/Jokes';

const Joke: React.FC<JokeProp> = ({ content }) => {
  return <article className="block-shadow p-10">{content}</article>;
};

export default Joke;
