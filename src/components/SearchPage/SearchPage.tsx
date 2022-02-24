import { useEffect, useState } from "react";
import SearchBox from "../SearchBox";
import youtube from "../../apis/youtube";
import VideoList from "../VideoList";
import VideoDetail from "../VideoDetail";
import Pagination from "../Pagination";
import { Video } from "../../types/types";
import "./SearchPage.css";

function App() {
  const [term, setTerm] = useState<string>("");
  const [currentTerm, setCurrentTerm] = useState<string>("");
  const [data, setData] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [totalVideos, setTotalVideos] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState(1);
  const [videosPerPage] = useState<number>(Infinity);
  const [nextPageToken, setNextPageToken] = useState<string>("");
  // const [prevPageToken, setPrevPageToken] = useState<string>("");

  const handleSubmit = async (searchTerm: string) => {
    if (!searchTerm) return;
    try {
      setIsLoading(true);
      const response = await youtube.get("/search", {
        params: {
          type: "video",
          q: searchTerm,
          // pageToken: nextPageToken ? nextPageToken : null,
        },
      });
      console.log("this is resp: ", response);
      if (searchTerm !== currentTerm) {
        setData([response.data.items].flat());
      } else if (searchTerm === currentTerm) {
        setData([...data, response.data.items].flat());
      }
      setCurrentTerm(searchTerm);
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

  // setCurrentPage(data / videosPerPage)  initial?
  useEffect(() => {
    handleSubmit(term);
  }, []);

  useEffect(() => {
    setPageCount(Math.ceil(data.length / videosPerPage));
  }, [data, videosPerPage]);

  console.log(data);

  console.log(totalVideos);

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
    <div className="search-page">
      <SearchBox
        handleFormSubmit={handleSubmit}
        term={term}
        setTerm={setTerm}
      />
      <VideoDetail video={selectedVideo} />
      <VideoList
        term={term}
        handleVideoSelect={handleVideoSelect}
        videos={currentVideos}
        handleFormSubmit={handleSubmit}
      />
      <Pagination pageCount={pageCount} paginate={paginate} />
    </div>
  );
}

export default App;
