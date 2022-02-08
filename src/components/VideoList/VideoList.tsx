import { Video } from "../../types/types";
import VideoItem from "../VideoItem";

const VideoList = ({
  videos,
  handleVideoSelect,
}: {
  videos: Video[];
  handleVideoSelect: Function;
}) => {
  return (
    <>
      {videos.map((video: Video) => {
        return (
          <VideoItem
            key={video.id.videoId}
            video={video}
            handleVideoSelect={handleVideoSelect}
          />
        );
      })}
    </>
  );
};
export default VideoList;
