import { useEffect, useState } from "react";
import { youtubeGetStatistics } from "../apis/youtube";

export default function useGetViewCount(id: string) {
  const [viewCount, setViewCount] = useState<number>(0);

  useEffect(() => {
    const getViewCount = async () => {
      const response = await youtubeGetStatistics.get("/videos", {
        params: {
          id: id,
        },
      });
      setViewCount(response.data.items[0].statistics.viewCount);
    };
    getViewCount();
  });

  return { viewCount };
}
