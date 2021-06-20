import { MemeProp } from 'utils/contentTypes/Memes';

const Meme: React.FC<MemeProp> = ({ meme }) => {
  return (
    <article className="block-shadow bg-white p-4 mb-8">
      <img src={meme.url} />
    </article>
  );
};

export default Meme;
