import React, { Suspense, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSwipeable } from "react-swipeable";
import useVideoSearch from "../../hooks/useVideoSearch";
import { Video } from "../../types/types";
import Pagination from "../Pagination";
import SearchBox from "../SearchBox";
import "./App.css";

const VideoList = React.lazy(() => import("../VideoList"));
const VideoDetail = React.lazy(() => import("../VideoDetail"));

const VIDEOS_PER_PAGE: number = 4;

function App() {
  const [term, setTerm] = useState<string>("");
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(1);
  const [offset, setOffset] = useState<number>(4);

  const { data, handleSubmit } = useVideoSearch(term);

  const { isLoading, error } = useQuery<Video[], Error>(
    "videos",
    () => handleSubmit(),
    { enabled: false }
  );

  const handlePageClick = (e: { selected: number }) => {
    const selectedPage = e.selected;
    setCurrentPage(selectedPage);
    setOffset((selectedPage + 1) * VIDEOS_PER_PAGE);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentPage !== pageCount - 1) {
        handlePageClick({
          selected: currentPage + 1,
        });
      }
    },
    onSwipedRight: () => {
      if (currentPage === 0) return;
      handlePageClick({
        selected: currentPage - 1,
      });
    },
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
    trackMouse: true,
  });

  useEffect(() => {
    setPageCount(Math.ceil(data.length / VIDEOS_PER_PAGE));
    setVideos(data.slice(offset - VIDEOS_PER_PAGE, offset));
  }, [offset, data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occured: {error!.message}</div>;

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
  };

  return (
    <>
      <h1>YouTube API App</h1>
      <div className="search-page" {...handlers}>
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
            <VideoList handleVideoSelect={handleVideoSelect} videos={videos} />
          </Suspense>
        )}
        <Pagination
          pageCount={pageCount}
          handlePageClick={handlePageClick}
          currentPage={currentPage}
        />
        {videos?.length !== 0 && (
          <button type="button" className="load-btn" onClick={handleSubmit}>
            Load more
          </button>
        )}
      </div>
    </>
  );
}

export default App;
