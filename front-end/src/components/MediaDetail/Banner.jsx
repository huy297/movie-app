import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { groupBy } from "lodash";
import CircularProgressBar from "../CircularProgressBar";
import ImageComponent from "../Image";
import { useModalContext } from "../../context/ModalProvider";

const Banner = ({
  //mediaInfo,
  title,
  backdropPath,
  posterPath,
  crews,
  certification,
  genres,
  releaseDate,
  point = 0,
  overview,
  trailerVideoKey,
}) => {
  const { openPopUp } = useModalContext();
  console.log("videoKey", trailerVideoKey);
  if (!title) return null;
  const groupCrews = groupBy(crews, "job");
  return (
    <div className="relative overflow-hidden text-white shadow-sm">
      <ImageComponent
        className="absolute inset-0 w-full brightness-[.2]"
        src={backdropPath && `https://image.tmdb.org/t/p/original${backdropPath}`}
        width={600}
        height={900}
      />
      <div className="relative mx-auto flex max-w-screen-xl gap-6 px-6 py-10 lg:gap-8">
        <div className="flex-[1]">
          <ImageComponent
            width={600}
            height={900}
            src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${posterPath}`}
          />
        </div>
        <div className="flex-[2] text-[1.2vw]">
          <div>
            <p className="mb-2 text-[2vw] font-bold">{title}</p>
            <div className="flex items-center gap-4">
              <span className="border border-gray-400 p-1 text-gray-400">
                {certification}
              </span>
              <p>{releaseDate}</p>
              <p>{(genres || []).map((genre) => genre.name).join(", ")}</p>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <CircularProgressBar
                  percent={Math.round(point * 10)}
                  size={3.5}
                  strokeWidth={0.3}
                />{" "}
                Rating
              </div>
              <button
                onClick={() => {
                  openPopUp(
                    <iframe
                      title="Trailer"
                      src={`https://www.youtube.com/embed/${trailerVideoKey}`}
                      className="aspect-video w-[50vw]"
                    />,
                  );
                }}
              >
                <FontAwesomeIcon icon={faPlay} className="mr-1" />
                Trailer
              </button>
            </div>
            <div>
              <p className="mb-2 text-[1.3vw] font-bold">Overview</p>
              <p>{overview}</p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {Object.keys(groupCrews).map((job) => (
                <div key={job}>
                  <p className="font-bold">{job}</p>
                  <p>{groupCrews[job].map((crew) => crew.name).join(", ")}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
