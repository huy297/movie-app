import { Link } from "react-router-dom";
import ImageComponent from "../Image";

// eslint-disable-next-line no-unused-vars
const ActorInfo = ({ id, name, character, profilePath, episodeCount }) => {
  return (
    <Link
      to={`/people/${id}`}
      className="rounded-lg border border-slate-300 bg-black shadow-sm"
    >
      <div>
        <ImageComponent
          className="rounded-lg"
          src={
            profilePath
              ? `https://media.themoviedb.org/t/p/w276_and_h350_bestv2${profilePath}`
              : `/ActorNoImage.svg`
          }
          width={276}
          height={350}
        />
        <div className="p-3">
          <p className="font-bold">{name}</p>
          <p>{character}</p>
          {episodeCount && (
            <p>
              {episodeCount} {episodeCount > 1 ? `Episodes` : `Episode`}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ActorInfo;
