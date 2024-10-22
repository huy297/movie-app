import { useEffect, useState } from "react";
import MovieCard from "../MovieCard";

const MediaList = ({ title, tabs }) => {
  const [mediaList, setMediaList] = useState([]);
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id);
  useEffect(() => {
    const url = tabs.find((tab) => tab.id === activeTabId)?.url;
    if (url === undefined) return;
    fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZGI3ZmY2ODkyZjE4ZWQwZWIwNWU2YTBkYmE5NjBhZCIsIm5iZiI6MTcyOTE0OTA0NC4wNTE4OSwic3ViIjoiNjcxMGI4MGE2Zjc3MDdhZjQwZmE3ZWM0Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.cyMMiGB_xCp3Jz-dRhqeHg0n6LAqqcQXMhBzJbGrUe0`,
      },
    }).then(async (res) => {
      const data = await res.json();
      const trendingMediaList = data.results.slice(0, 12);
      setMediaList(trendingMediaList);

      console.log("??", trendingMediaList);
    });
  }, [tabs,activeTabId]);
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
      <div className="grid grid-cols-2 gap-4 lg:gap-6 sm:grid-cols-4 lg:grid-cols-6">
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
