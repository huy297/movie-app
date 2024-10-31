import { Link } from "react-router-dom";
import CircularProgressBar from "./CircularProgressBar";
import Image from "./Image";

const MovieCard = ({ id, title, releaseDate, poster, point, mediaType }) => {
  return (
    <Link
      to={mediaType === "tv" ? `/tv/${id}` : `/movie/${id}`}
      className="rounded-lg border"
    >
      <div className="relative rounded-lg border border-slate-800 h-full">
        {mediaType === `tv` && (
          <p className="absolute right-1 top-1 rounded bg-black p-1 text-sm font-bold text-white shadow">
            TV Show
          </p>
        )}
        <Image
          src={poster && `https://image.tmdb.org/t/p/w500${poster}`}
        
          width={210}
          height={300}
          className="w-full rounded-lg object-certain h-[400px]"
        />
        <div className="relative -top-[30px] px-4 py-2">
          <CircularProgressBar percent={Math.round(point * 10)} />
          <p className="mt-2 font-bold">{title}</p>
          <p className="text-slate-300">{releaseDate}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
