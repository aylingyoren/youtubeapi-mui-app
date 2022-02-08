import React from "react";
import { Video } from "../../types/types";

function VideoDetail({ video }: { video: Video | null }) {
  if (!video) {
    return (
      <div>
        <h1>Enter search keyword(s) and press Enter...</h1>
      </div>
    );
  }

  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
  return (
    <div>
      <div>
        <iframe src={videoSrc} allowFullScreen title="Video player" />
      </div>
      <div>
        <h4>{video.snippet.title}</h4>
        <p>{video.snippet.description}</p>
      </div>
    </div>
  );
}

export default VideoDetail;
