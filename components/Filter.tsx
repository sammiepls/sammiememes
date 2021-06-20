type FilterProp = {
  filter: 'all' | 'joke' | 'meme';
  setFilter: (filter: 'all' | 'meme' | 'joke') => void;
};

const Filter: React.FC<FilterProp> = ({ filter, setFilter }) => {
  return (
    <div className="border-t-4 border-b-4 flex justify-around p-4 mb-6">
      <button
        onClick={() => setFilter('joke')}
        className={`focus:outline-none ${filter === 'joke' && 'line-through'}`}
      >
        Give me the awful jokes
      </button>
      <button
        onClick={() => setFilter('meme')}
        className={`focus:outline-none ${filter === 'meme' && 'line-through'}`}
      >
        Take me to the memes
      </button>
    </div>
  );
};

export default Filter;
