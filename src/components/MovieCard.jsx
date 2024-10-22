import { Link } from "react-router-dom";
import CircularProgressBar from "./CircularProgressBar";

const MovieCard = ({id, title, releaseDay, poster, point, mediaType}) => {
  return (
    <Link to={`/movie/${id}`} className="rounded-lg border">
    <div className="border border-slate-800 rounded-lg relative">
      {
        mediaType === `tv` && (
          <p className="absolute right-1 top-1 bg-black text-white p-1 text-sm rounded shadow font-bold">TV Show</p>
        )
      }
      <img className="rounded-lg" src={`https://image.tmdb.org/t/p/w500${poster}`} />
      <div className="px-4 py-2 relative -top-[30px]">
        <CircularProgressBar percent={Math.round(point*10)}/>
        <p className="font-bold mt-2">{title}</p>
        <p className="text-slate-300">{releaseDay}</p>
      </div>
    </div>
    </Link>
  );
};

export default MovieCard;
