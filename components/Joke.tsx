import JokeProp from 'utils/contentTypes/Jokes';

const Joke: React.FC<JokeProp> = ({ content }) => {
  return <article className="border-4 border-black">{content}</article>;
};

export default Joke;
