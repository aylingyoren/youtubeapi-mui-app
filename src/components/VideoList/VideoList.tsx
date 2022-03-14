import { Grid } from "@mui/material";
import { Video } from "../../types/types";
import VideoItem from "../VideoItem";
import "./VideoList.css";

const VideoList = ({
  videos,
  handleVideoSelect,
  handleFormSubmit,
}: {
  videos: Video[] | undefined;
  handleVideoSelect: Function;
  handleFormSubmit: Function;
}) => {
  const handleSubmit = () => {
    handleFormSubmit();
  };

  return (
    <>
      <Grid
        container
        columns={{ xs: 1, md: 3, lg: 4 }}
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
      >
        {videos?.flat().map((video: Video) => {
          return (
            <Grid item>
              <VideoItem
                key={video.id.videoId}
                video={video}
                handleVideoSelect={handleVideoSelect}
              />
            </Grid>
          );
        })}
      </Grid>
      {videos?.length !== 0 && (
        <button type="button" className="load-btn" onClick={handleSubmit}>
          Load more
        </button>
      )}
    </>
  );
};
export default VideoList;
