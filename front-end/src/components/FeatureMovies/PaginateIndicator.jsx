const PaginateIndicator = ({ movies, activeMovieId, setActiveMovieId}) => {
  return (
    <div className="absolute bottom-[10%] right-8">
      <ul className="flex gap-1">
        {movies.map((movie) => (
          <li
            onClick={() => setActiveMovieId(movie.id)}
            key={movie.id}
            className={`h-1 w-6 cursor-pointer ${movie.id === activeMovieId ? "bg-slate-100" : "bg-slate-600"}`}
          ></li>
        ))}
      </ul>
    </div>
  );
};

export default PaginateIndicator;
