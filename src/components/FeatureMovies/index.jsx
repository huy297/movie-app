import PaginateIndicator from "./PaginateIndicator";
import Movie from "./Movie";
import { useEffect, useState } from "react";
// eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZGI3ZmY2ODkyZjE4ZWQwZWIwNWU2YTBkYmE5NjBhZCIsIm5iZiI6MTcyOTE0OTA0NC4wNTE4OSwic3ViIjoiNjcxMGI4MGE2Zjc3MDdhZjQwZmE3ZWM0Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.cyMMiGB_xCp3Jz-dRhqeHg0n6LAqqcQXMhBzJbGrUe0
const FeatureMovie = () => {
  const [movies, setMovies] = useState([]);
  const [activeMovieId, setActiveMovieId] = useState();
  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/popular", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZGI3ZmY2ODkyZjE4ZWQwZWIwNWU2YTBkYmE5NjBhZCIsIm5iZiI6MTcyOTE0OTA0NC4wNTE4OSwic3ViIjoiNjcxMGI4MGE2Zjc3MDdhZjQwZmE3ZWM0Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.cyMMiGB_xCp3Jz-dRhqeHg0n6LAqqcQXMhBzJbGrUe0`,
      },
    }).then(async (res) => {
      const data = await res.json();
      const popularMovies = data.results.slice(0, 4);
      setMovies(popularMovies);
      setActiveMovieId(popularMovies[0].id);
    });
  }, []);
  useEffect(() => {
    if (movies.length > 0) {
      const interval = setInterval(()=> {
        const activeIndex = movies.findIndex((movie) => movie.id === activeMovieId);
        setActiveMovieId(movies[(activeIndex + 1) % movies.length].id);
      }, 5000)
      return () => clearInterval(interval);
    }
  }, [movies, activeMovieId]);
  return (
    <div className="relative text-white">
      {movies
        .filter((movie) => movie.id === activeMovieId)
        .map((movie) => (
          <Movie key={movie.id} data={movie} />
        ))}
      <PaginateIndicator movies={movies} activeMovieId={activeMovieId} setActiveMovieId={setActiveMovieId}/>
    </div>
  );
};

export default FeatureMovie;
