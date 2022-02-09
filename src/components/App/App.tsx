import { useState } from "react";
import { useQuery } from "react-query";
import SearchBox from "../SearchBox";
import youtube from "../../apis/youtube";
import VideoList from "../VideoList";
import VideoDetail from "../VideoDetail";
import { Video } from "../../types/types";
import "./App.css";

function App() {
  const [term, setTerm] = useState<string>("");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const handleSubmit = async () => {
    try {
      const response = await youtube.get("/search", {
        params: {
          type: "video",
          q: term,
        },
      });
      console.log("this is resp: ", response);
      refetch();
      return response.data.items;
    } catch (err: unknown) {
      throw new Error("Failed to process your request. " + err);
    }
  };

  const { data, isLoading, isError, error, refetch } = useQuery<Video[], Error>(
    "fetchData",
    async () => handleSubmit(),
    {
      enabled: false,
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occured: {error!.message}</div>;

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
  };

  return (
    <div className="App">
      <h1>YouTube API App</h1>
      <SearchBox
        handleFormSubmit={handleSubmit}
        term={term}
        setTerm={setTerm}
      />
      <VideoDetail video={selectedVideo} />
      <VideoList handleVideoSelect={handleVideoSelect} videos={data} />
    </div>
  );
}

export default App;
