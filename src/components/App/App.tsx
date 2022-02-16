import { useState } from "react";
import { useQuery } from "react-query";
import SearchBox from "../SearchBox";
import youtube from "../../apis/youtube";
import VideoList from "../VideoList";
import VideoDetail from "../VideoDetail";
import Pagination from "../Pagination";
import { Video } from "../../types/types";
import "./App.css";

function App() {
  const [term, setTerm] = useState<string>("");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [totalVideos, setTotalVideos] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [videosPerPage] = useState<number>(5);

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
      setTotalVideos(response.data.pageInfo.resultsPerPage);
      refetch();
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
      console.log(err.config);
    }
  };

  const { data, isLoading, isError, error, refetch } = useQuery<
    Video[] | undefined,
    Error
  >("fetchData", handleSubmit, {
    enabled: false,
    retry: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occured: {error!.message}</div>;

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
  };

  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos: Video[] | undefined = data?.slice(
    indexOfFirstVideo,
    indexOfLastVideo
  );

  const paginate = async (pageNumber: number) => {
    await setCurrentPage(pageNumber);
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
      <VideoList handleVideoSelect={handleVideoSelect} videos={currentVideos} />
      <Pagination
        videosPerPage={videosPerPage}
        totalVideos={totalVideos}
        paginate={paginate}
      />
    </div>
  );
}

export default App;
