type ErrorProp = {
  error: string;
};

const Error: React.FC<ErrorProp> = (error) => (
  <div className="text-center">
    <h2 className="text-4xl mb-3">Sorry something went wrong!</h2>
    <p className="text-4xl mb-2">🙈🙏😰</p>
    <p>{error}</p>
  </div>
);

export default Error;
