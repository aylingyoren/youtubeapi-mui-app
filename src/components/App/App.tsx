import { useQuery } from "react-query";
import SearchBox from "../SearchBox";
import { useState } from "react";
import youtube from "../../apis/youtube";
import VideoList from "../VideoList";
import VideoDetail from "../VideoDetail";
import env from "react-dotenv";
import "./App.css";

function App() {
  // const fetchCharacters = async (url: string) => {
  //   const req = await fetch(url);
  //   if (!req.ok) {
  //     throw new Error("Problem fetching data");
  //   }
  //   const { results }: GetCharacterResults = await req.json();
  //   return results;
  // };

  // const { data, isLoading, isError, error } = useQuery<Character[], Error>(
  //   "fetchData",
  //   async () =>
  //     fetchCharacters("https://rickandmortyapi.com/api/character/?page=1")
  // );

  // if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>Error occured: {error!.message}</div>;

  const [videos, setVideos] = useState<any>([]);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const handleSubmit = async (termFromSearchBar: any) => {
    try {
      const response = await youtube.get("/search", {
        params: {
          query: termFromSearchBar,
        },
      });
      setVideos(response.data.items);
      console.log("this is resp: ", response);
    } catch (err) {
      setError(err);
    }
  };

  const handleVideoSelect = (video: any) => {
    setSelectedVideo(video);
  };

  if (error) return <div>{error.message}</div>;

  return (
    <div className="App">
      <h1>YouTube API App</h1>
      <SearchBox handleFormSubmit={handleSubmit} />
      <VideoDetail video={selectedVideo} />
      <VideoList handleVideoSelect={handleVideoSelect} videos={videos} />
    </div>
  );
}

export default App;
