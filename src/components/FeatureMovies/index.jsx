import PaginateIndicator from "./PaginateIndicator";
import Movie from "./Movie";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
const FeatureMovie = () => {
  const [activeMovieId, setActiveMovieId] = useState();

  const { data: popularMoviesRespone } = useFetch({
    url: "/discover/movie?include_adult=false&language=en-US&page=1&sort_by=popularity.desc$include_video=true",
  });

  const { data: videoResponse } = useFetch({
    url: `/movie/${activeMovieId}/videos`,
  },{enabled: !!activeMovieId});
  const trailerLink = (videoResponse?.results || []).find(
    (video) => video.type === "Trailer" && video.site === "YouTube",
  )?.key;
  const movies = (popularMoviesRespone?.results || []).slice(0, 4);
  useEffect(() => {
    setActiveMovieId(movies[0]?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(movies)]);
  useEffect(() => {
    if (movies.length > 0) {
      const interval = setInterval(() => {
        const activeIndex = movies.findIndex(
          (movie) => movie.id === activeMovieId,
        );
        setActiveMovieId(movies[(activeIndex + 1) % movies.length].id);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [movies, activeMovieId]);
  return (
    <div className="relative text-white">
      {movies
        .filter((movie) => movie.id === activeMovieId)
        .map((movie) => (
          <Movie
            key={movie.id}
            data={movie}
            trailerVideoKey={
              trailerLink
            }
          />
        ))}
      <PaginateIndicator
        movies={movies}
        activeMovieId={activeMovieId}
        setActiveMovieId={setActiveMovieId}
      />
    </div>
  );
};

export default FeatureMovie;
