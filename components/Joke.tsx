import { JokeProp } from 'utils/contentTypes/Jokes';
import ReactMarkdown from 'react-markdown';

const Joke: React.FC<JokeProp> = ({ content }) => {
  return (
    <article className="block-shadow bg-white p-10 mb-8">
      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  );
};

export default Joke;
