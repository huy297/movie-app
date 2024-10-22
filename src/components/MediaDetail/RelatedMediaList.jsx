import MovieCard from "../MovieCard";

const RelatedMediaList = ({ mediaList = [] }) => {
  return (
    <div className="mt-6">
      <p className="text-[1.4]vw mb-4 font-bold">More Like This</p>
      <div className="grid grid-cols-3 sm:grids-cols-4 gap-4">
        {mediaList.map((media) => (
          <MovieCard
            key={media.id}
            id={media.id}
            title={media.title}
            releaseDate={media.release_date}
            poster={media.poster_path}
            point={Math.round(media.vote_average)} 
            mediaType={media.media_type}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedMediaList;
