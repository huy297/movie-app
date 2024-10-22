const ActorInfo = ({ id, name, character, profilePath }) => {
  return (
    <div className="rounded-lg border border-slate-300 bg-black shadow-sm">
      <div>
        <img
          className="rounded-lg"
          src={
            profilePath
              ? `https://media.themoviedb.org/t/p/w276_and_h350_bestv2${profilePath}`
              : `/ActorNoImage.svg`
          }
        ></img>
        <div className="p-3">
          <p>{name}</p>
          <p>{character}</p>
        </div>
      </div>
    </div>
  );
};

export default ActorInfo;
