import { useState, useEffect } from "react";
import MovieCard from "../MovieCard";
import useFetch from "../../hooks/useFetch";
// import { useModalContext } from "../../context/ModalProvider";
const MediaList = ({ title, tabs }) => {
  // const {
  //   activeTabTopTrendingId,
  //   setActiveTabTopTrendingId,
  //   activeTabTopRatedId,
  //   setActiveTabTopRatedId,
  // } = useModalContext();
  // // const setActiveTabId = (id) => {
  // //   if (title === "Trending") {
  // //     setActiveTabTopTrendingId(id);
  // //   } else {
  // //     setActiveTabTopRatedId(id);
  // //   }
  // // };

  // const setActiveTabId = title === "Trending" ? setActiveTabTopTrendingId : setActiveTabTopRatedId;
  // useEffect(() => {
  //   setActiveTabId(tabs[0].id);
  // },[tabs, setActiveTabId]);

  // const activeTabId = title === "Trending" ? activeTabTopTrendingId : activeTabTopRatedId;
   const [activeTabId, setActiveTabId] = useState(tabs[0].id);
  
  const url = tabs.find((tab) => tab.id === activeTabId)?.url;

  const { data } = useFetch({ url });

  const mediaList = (data.results || []).slice(0, 12);

  console.log("activeTabId", activeTabId);
  return (
    <div className="bg-black px-8 py-10 text-[1.2vw] text-white">
      <div className="mb-6 flex items-center gap-4">
        <p className="text-[2vw] font-bold">{title}</p>
        <ul className="flex rounded border border-white">
          {tabs.map((tab) => (
            <li
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`cursor-pointer rounded px-2 py-1 ${
                tab.id === activeTabId ? "bg-white text-black" : ""
              }`}
            >
              {tab.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6 lg:gap-6">
        {mediaList.map((media) => (
          <MovieCard
            id={media.id}
            key={media.id}
            title={media.name || media.title}
            releaseDay={media.release_date || media.first_air_date}
            poster={media.poster_path}
            point={media.vote_average}
            mediaType={media.media_type || activeTabId}
          />
        ))}
      </div>
    </div>
  );
};

export default MediaList;
