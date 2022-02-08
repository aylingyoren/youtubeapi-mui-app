import { Video } from "../../types/types";
import VideoItem from "../VideoItem";

const VideoList = ({ videos, handleVideoSelect }: any) => {
  const renderedVideos = videos.map((video: Video) => {
    return (
      <VideoItem
        key={video.id.videoId}
        video={video}
        handleVideoSelect={handleVideoSelect}
      />
    );
    console.log(video.id);
  });

  console.log(renderedVideos.id);

  return <div>{renderedVideos}</div>;
};
export default VideoList;
