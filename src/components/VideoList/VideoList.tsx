import { Grid } from "@mui/material";
import { Video } from "../../types/types";
import VideoItem from "../VideoItem";

const VideoList = ({ videos }: { videos: Video[] | undefined }) => {
  return (
    <>
      <Grid
        container
        columns={{ xs: 1, md: 3, lg: 4 }}
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        spacing={2}
      >
        {videos?.map((video: Video) => {
          return (
            <Grid item key={video.id.videoId}>
              <VideoItem key={video.id.videoId} video={video} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
export default VideoList;
