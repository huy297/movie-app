import Loading from "../Loading";
import MovieCard from "../MovieCard";

const RelatedMediaList = ({ mediaList = [], isLoading, title, className }) => {
  return (
    <div className={className}>
      {title && <p className="text-[1.4]vw mb-4 font-bold">{title}</p>}
      {isLoading ? (
        <Loading />
      ) : (
        <div className="sm:grids-cols-4 grid grid-cols-3 gap-4">
          {mediaList.map((media) => (
            <MovieCard
              key={media.id}
              id={media.id}
              title={media.title || media.name}
              releaseDate={media.release_date || media.first_air_date}
              poster={media.poster_path}
              point={Math.round(media.vote_average)}
              mediaType={media.media_type}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RelatedMediaList;
