import { useState } from "react";
import youtube from "../apis/youtube";
import { Video } from "../types/types";

export default function useVideoSearch(searchTerm: string) {
  const [currentTerm, setCurrentTerm] = useState<string>("");
  const [data, setData] = useState<Video[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string>("");

  const handleSubmit = async () => {
    if (!searchTerm) return;
    const response = await youtube.get("/search", {
      params: {
        type: "video",
        q: searchTerm,
        pageToken: nextPageToken ? nextPageToken : null,
      },
    });
    if (searchTerm !== currentTerm) {
      setData([...response.data.items]);
    } else {
      setData([...data, ...response.data.items]);
    }
    setCurrentTerm(searchTerm);
    if (response.data.nextPageToken)
      setNextPageToken(response.data.nextPageToken);
    return response.data.items;
  };

  return {
    data,
    handleSubmit,
  };
}
