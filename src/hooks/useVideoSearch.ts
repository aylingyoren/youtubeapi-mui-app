import React, { useEffect, useState } from 'react';
import youtube from '../apis/youtube';
import { Video } from '../types/types';

export default function useVideoSearch(searchTerm: string) {
  const [currentTerm, setCurrentTerm] = useState<string>("");
  const [data, setData] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [totalVideos, setTotalVideos] = useState<number>(0);
  const [nextPageToken, setNextPageToken] = useState<string>("");
  const [hasMore, setHasMore] = useState<boolean>(false);
  // const [prevPageToken, setPrevPageToken] = useState<string>("");

  const handleSubmit = async () => {
    if (!searchTerm) return;
    try {
      setIsLoading(true);
      const response = await youtube.get("/search", {
        params: {
          type: "video",
          q: searchTerm,
          pageToken: nextPageToken ? nextPageToken : null,
        },
      });
      console.log("this is resp: ", response);
      if (searchTerm !== currentTerm) {
        setData([...response.data.items]);
      } else if (searchTerm === currentTerm) {
        setData([...data, ...response.data.items]);
      }
      setCurrentTerm(searchTerm);
      setHasMore(response.data.items.length > 0);
      setTotalVideos(data?.length);
      setNextPageToken(response.data.nextPageToken);
      setIsLoading(false);
      return response.data.items;
    } catch (err: any) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else if (err.request) {
        console.log(err.request);
      } else {
        console.log("Error", err.message);
      }
      setError(err);
      console.log(err.config);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);
  
    return {
        data,
        isLoading,
        error,
        hasMore,
        totalVideos,
        handleSubmit
    }
}
