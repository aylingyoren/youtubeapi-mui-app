import React, { Suspense, useEffect, useState } from "react";
import useVideoSearch from "../../hooks/useVideoSearch";
import SearchBox from "../SearchBox";
import Pagination from "../Pagination";
import { Video } from "../../types/types";
import "./SearchPage.css";

const VideoList = React.lazy(() => import("../VideoList"));
const VideoDetail = React.lazy(() => import("../VideoDetail"));

function App() {
  const [term, setTerm] = useState<string>("");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState(1);
  const [videosPerPage] = useState<number>(Infinity);

  const {isLoading, error, data, hasMore, totalVideos, handleSubmit} = useVideoSearch(term);

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
      <Suspense fallback={<div>Loading...</div>}>
        <VideoDetail video={selectedVideo} />
      </Suspense>
      {data.length !== 0 && (
        <Suspense fallback={<div>Loading...</div>}>
          <VideoList
            hasMore={hasMore}
            handleVideoSelect={handleVideoSelect}
            videos={currentVideos}
            handleFormSubmit={handleSubmit}
          />
        </Suspense>
      )}
      <Pagination pageCount={pageCount} paginate={paginate} />
    </div>
  );
}

export default App;
