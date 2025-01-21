import { useWatch } from "react-hook-form";
import useFetch from "../../../hooks/useFetch";
import { useEffect } from "react";

const GenresInput = ({ control, onChange, value = [] }) => {
  const mediaType = useWatch({ name: "mediaType", control });
  const { data } = useFetch(
    { url: `/genre/${mediaType}/list` },
    { enabled: mediaType },
  );
  console.log(data, mediaType);

  useEffect(() => {
    onChange([]);
  }, [mediaType])
  return (
    <div className="flex flex-wrap gap-1">
      {(data.genres || []).map((genre) => (
        <p
          key={genre.id}
          className={`cursor-pointer rounded-lg border px-2 py-1 ${value.includes(genre.id) ? "bg-black text-white" : ""}`}
          onClick={() => {
            let newValue = [ ...value];
            if (value.includes(genre.id)) {
              newValue = value.filter((id) => id !== genre.id);
            } else {
              newValue = [...value, genre.id];
            }

            onChange(newValue);
          }}
        >
          {genre.name}
        </p>
      ))}
    </div>
  );
};

export default GenresInput;
