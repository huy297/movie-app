import { useEffect, useState } from "react";

const DEFAULT_HEADERS = {
  accept: "application/json",
  Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
}

export default function useFetch ({url, method="GET", headers={}}) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetch(
      `${import.meta.env.VITE_API_HOST}${url}`,
      {
        method,
        headers: {
          ...DEFAULT_HEADERS,
          ...headers,
        },
      },
    )
      .then(async (res) => {
        const data = await res.json();
        setData(data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [method,JSON.stringify(headers),url]);

  return {data, isLoading};
}