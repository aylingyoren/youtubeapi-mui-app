import { useQuery } from "react-query";
import SearchBox from "../SearchBox";
import { useState } from "react";
import youtube from "../../apis/youtube";
import VideoList from "../VideoList";
import VideoDetail from "../VideoDetail";
import "./App.css";
import { Video } from "../../types/types";
import { Item } from "../../types/types";

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

  const [videos, setVideos] = useState<Item[]>([]);
  const [term, setTerm] = useState<string>("");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [error, setError] = useState<any>(null);

  const handleSubmit = async (term: string) => {
    try {
      const response = await youtube.get("/search", {
        params: {
          type: "video",
          q: term,
        },
      });
      setVideos(response.data.items);
      console.log(response.data.items);
      console.log(response.data.items);
      console.log(JSON.stringify(response));
      console.log("this is resp: ", response);
    } catch (err) {
      setError(err);
    }
  };

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
  };

  if (error) return <div>{error.message}</div>;

  return (
    <div className="App">
      <h1>YouTube API App</h1>
      <SearchBox
        handleFormSubmit={handleSubmit}
        term={term}
        setTerm={setTerm}
      />
      <VideoDetail video={selectedVideo} />
      <VideoList handleVideoSelect={handleVideoSelect} videos={videos} />
    </div>
  );
}

export default App;
