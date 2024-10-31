import { useParams } from "react-router-dom";
import Loading from "@components/Loading";
import Banner from "@components/MediaDetail/Banner";
import ActorList from "@components/MediaDetail/ActorList";
import RelatedMediaList from "@components/MediaDetail/RelatedMediaList";
import useFetch from "../hooks/useFetch";
import TVShowInformation from "../components/MediaDetail/TVShowInformation";
import SeasonList from "../components/MediaDetail/SeasonList";

const TVShowDetail = () => {
  const { id } = useParams();
  const { data: tvInfo, isLoading } = useFetch({
    url: `/tv/${id}?append_to_response=content_ratings,aggregate_credits,videos`,
  });

  const { data: recommendationsRespone, isLoading: isRelatedMovieListLoading } =
    useFetch({
      url: `/tv/${id}/recommendations`,
    });

  const relatedTVShow = recommendationsRespone.results?.slice(0, 12) || [];

  const certification = (tvInfo.content_ratings?.results || []).find(
    (result) => result.iso_3166_1 === "US",
  )?.rating;

  // console.log("crew", tvInfo.aggregate_credits);

  const firstCrews = (tvInfo.aggregate_credits?.crew || [])
    .filter((crew) => {
      const jobs = (crew.jobs || []).map((j) => j.job);
      return ["Director", "Writer"].some((job) => jobs.find((j) => j === job));
    })
    .map((crew) => ({ id: crew.id, job: crew.jobs[0].job, name: crew.name }));
  // console.log("crew", firstCrews);
  const filteredPeople = firstCrews.reduce((acc, person) => {
    const jobGroup = acc[person.job] || [];
    if (jobGroup.length < 4) {
      jobGroup.push(person);
    }
    acc[person.job] = jobGroup;
    return acc;
  }, {});

  const crews = Object.values(filteredPeople).flat();
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Banner
        title={tvInfo.name}
        backdropPath={tvInfo.backdrop_path}
        posterPath={tvInfo.poster_path}
        releaseDate={tvInfo.relese_date}
        point={tvInfo.vote_average}
        overview={tvInfo.overview}
        certification={certification}
        genres={tvInfo.genres}
        crews={crews}
        trailerVideoKey={
          (tvInfo.videos?.results || []).find(
            (video) => video.type === "Trailer",
          )?.key
        }
      />
      <div className="bg-black text-[1.2vw] text-white">
        <div className="mx-auto flex max-w-screen-xl gap-6 px-6 py-10 sm:gap-8">
          <div className="flex-[2]">
            <ActorList
              actors={(tvInfo.aggregate_credits?.cast || []).map((cast) => ({
                ...cast,
                character: cast.roles[0]?.character,
                episodeCount: cast.roles[0]?.episode_count,
              }))}
            />
            <SeasonList seasons={(tvInfo.seasons || []).reverse()} />
            <RelatedMediaList
              mediaList={relatedTVShow}
              isLoading={isRelatedMovieListLoading}
              title="More like this"
            />
          </div>
          <div className="flex-[1]">
            <TVShowInformation tvInfo={tvInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TVShowDetail;
