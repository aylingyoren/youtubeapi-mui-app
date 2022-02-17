import { useEffect, useState } from "react";
import SearchBox from "../SearchBox";
import youtube from "../../apis/youtube";
import VideoList from "../VideoList";
import VideoDetail from "../VideoDetail";
import Pagination from "../Pagination";
import { Video } from "../../types/types";
import "./App.css";

function App() {
  const [term, setTerm] = useState<string>("");
  const [data, setData] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [totalVideos, setTotalVideos] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [videosPerPage] = useState<number>(10);
  const [nextPageToken, setNextPageToken] = useState<string>("");

  const handleSubmit = async () => {
    if (!term) return;
    try {
      setIsLoading(true);
      const response = await youtube.get("/search", {
        params: {
          type: "video",
          q: term,
          pageToken: nextPageToken ? nextPageToken : null,
        },
      });
      console.log("this is resp: ", response);
      setData([...data, response.data.items].flat());
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occured: {error!.message}</div>;

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
