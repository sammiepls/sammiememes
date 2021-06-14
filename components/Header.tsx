const Header: React.FC = () => {
  return (
    <header className="flex flex-col items-center p-10">
      <div className="max-w-md px-20 py-2 mb-10 block-shadow yellow-shadow">
        <h1 className="tracking-widest">sammiememes</h1>
      </div>
      <p>A curated library of horrible jokes and my favourite memes</p>
    </header>
  );
};

export default Header;
