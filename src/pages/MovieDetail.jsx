import {useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "@components/Loading";
import Banner from "@components/MediaDetail/Banner";
import ActorList from "@components/MediaDetail/ActorList";
import RelatedMediaList from "@components/MediaDetail/RelatedMediaList";
import MovieInformation from "../components/MediaDetail/MovieInformation";
import useFetch from "../hooks/useFetch";

const MovieDetail = () => {
  const { id } = useParams();
  // eslint-disable-next-line no-unused-vars
  const [isRelatedMovieListLoading, setRelatedMovieListLoading] =
    useState(false);
  const [relatedMovie, setRelatedMovie] = useState([]);

  const { data: movieInfo, isLoading } = useFetch({
    url: `/movie/${id}?append_to_response=release_dates,credits`,
  });

  useEffect(() => {
    setRelatedMovieListLoading(true);
    fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
      },
    })
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
      <div className="bg-black text-[1.2vw] text-white">
        <div className="mx-auto flex max-w-screen-xl gap-6 px-6 py-10 sm:gap-8">
          <div className="flex-[2]">
            <ActorList actors={movieInfo.credits?.cast || []} />
            <RelatedMediaList mediaList={relatedMovie} />
          </div>
          <div className="flex-[1]">
            <MovieInformation movieInfo={movieInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
