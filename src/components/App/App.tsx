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
    if (!term) return;
    try {
      const response = await youtube.get("/search", {
        params: {
          type: "video",
          q: term,
        },
      });
      console.log("this is resp: ", response);
      // refetch();
      const items = response.data.items;
      return items as Video[];
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
      console.log(err.config);
    }
  };

  const { data, status, isLoading, isIdle, isError, error, refetch } = useQuery<
    Video[] | undefined,
    Error
  >("fetchData", handleSubmit, {
    enabled: false,
    retry: false,
    // enabled: !!term,
  });

  console.log(data);

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
      {status === "success" && (
        <VideoList handleVideoSelect={handleVideoSelect} videos={data} />
      )}
    </div>
  );
}

export default App;
