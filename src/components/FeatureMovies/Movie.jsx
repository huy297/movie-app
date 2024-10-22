import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
const Movie = (props) => {
 // console.log(props);
  const data = props.data;
  console.log(data);
  if (!data) {
    return <div>Loading...</div>;
  }
  const { backdrop_path, title, release_date, overview } = data;
  return (
    <div>
      <img
        src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
        className="aspect-video brightness-50 w-full"
      />
      <div className="absolute bottom-[10%] left-8 w-1/2 sm:w-1/3">
        <p className="mb-2 font-bold sm:text-[2vw]">{title}</p>
        <div>
          <p className="mb-1 inline-block border border-gray-400 p-1 text-gray-400">
            PG13
          </p>
          <p className="text-[1.2vw]">{release_date}</p>
        </div>
        <div>
          <div className="mt-4 hidden text-[1.2vw] sm:block">
            <p className="font-bold sm:text-[2vw]">Overview</p>
            <p>
              {overview}
            </p>
          </div>
          <div className="mt-4">
            <button className="text-10 mr-2 rounded bg-white px-4 py-2 text-black lg:text-lg">
              <FontAwesomeIcon icon={faPlay} />
              Trailer
            </button>
            <button className="text-10 rounded bg-slate-300/35 px-4 py-2 text-black lg:text-lg">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Movie
