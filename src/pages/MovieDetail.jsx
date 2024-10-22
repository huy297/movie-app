import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "@components/Loading";
import Banner from "@components/MediaDetail/Banner";
import ActorList from "@components/MediaDetail/ActorList";
import RelatedMediaList from "@components/MediaDetail/RelatedMediaList";
import MovieInformation from "../components/MediaDetail/MovieInformation";

const MovieDetail = () => {
  const { id } = useParams();
  const [movieInfo, setMovieInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isRelatedMovieListLoading, setRelatedMovieListLoading] = useState(false);
  const [relatedMovie, setRelatedMovie] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?append_to_response=release_dates,credits`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZGI3ZmY2ODkyZjE4ZWQwZWIwNWU2YTBkYmE5NjBhZCIsIm5iZiI6MTcyOTE0OTA0NC4wNTE4OSwic3ViIjoiNjcxMGI4MGE2Zjc3MDdhZjQwZmE3ZWM0Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.cyMMiGB_xCp3Jz-dRhqeHg0n6LAqqcQXMhBzJbGrUe0`,
        },
      },
    )
      .then(async (res) => {
        const data = await res.json();
        console.log(data);
        setMovieInfo(data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  useEffect(() => {
    setRelatedMovieListLoading(true);
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/recommendations`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZGI3ZmY2ODkyZjE4ZWQwZWIwNWU2YTBkYmE5NjBhZCIsIm5iZiI6MTcyOTE0OTA0NC4wNTE4OSwic3ViIjoiNjcxMGI4MGE2Zjc3MDdhZjQwZmE3ZWM0Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.cyMMiGB_xCp3Jz-dRhqeHg0n6LAqqcQXMhBzJbGrUe0`,
        },
      },
    )
      .then(async (res) => {
        const data = await res.json();
        console.log(data);
        const curretntRelatedMovies = (data.results || []).slice(0, 12);
        setRelatedMovie(curretntRelatedMovies);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setRelatedMovieListLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Banner mediaInfo={movieInfo} />
      <div className="bg-black text-white text-[1.2vw]">
        <div className="mx-auto flex max-w-screen-xl gap-6 px-6 py-10 sm:gap-8">
          <div className="flex-[2]">
            <ActorList actors={movieInfo.credits?.cast || []}/>
            <RelatedMediaList mediaList={relatedMovie}/>
          </div>
          <div className="flex-[1]">
            <MovieInformation movieInfo={movieInfo}/>
          </div>
        </div>
      </div>
      <p>df</p>
    </div>
  );
};

export default MovieDetail;
