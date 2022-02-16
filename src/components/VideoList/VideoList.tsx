import { Grid } from "@mui/material";
import { Video } from "../../types/types";
import VideoItem from "../VideoItem";
import "./VideoList.css";

const VideoList = ({
  videos,
  handleVideoSelect,
}: {
  videos: Video[] | undefined;
  handleVideoSelect: Function;
}) => {
  return (
    <>
      <Grid
        container
        columns={{ xs: 1, md: 3, lg: 4 }}
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={1.5}
      >
        {videos?.map((video: Video) => {
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
    </>
  );
};
export default VideoList;
