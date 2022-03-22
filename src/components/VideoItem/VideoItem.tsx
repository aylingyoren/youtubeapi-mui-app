import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Tooltip } from "@mui/material";
import { Video } from "../../types/types";

const textOverflow: Object = {
  whiteSpace: "nowrap",
  width: "300px",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

function VideoItem({
  video,
  handleVideoSelect,
}: {
  video: Video;
  handleVideoSelect: Function;
}) {
  return (
    <div style={{ width: "345px" }}>
      <Card onClick={() => handleVideoSelect(video)} sx={{ maxWidth: 345 }}>
        <CardActionArea sx={{ height: 400 }}>
          <CardMedia
            sx={{ position: "absolute", top: 0 }}
            component="img"
            src={video.snippet.thumbnails.medium.url}
            alt={video.snippet.description}
          />
          <CardContent sx={{ marginTop: 25 }}>
            <Tooltip title={video.snippet.title}>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                style={textOverflow}
              >
                {video.snippet.title}
              </Typography>
            </Tooltip>
            <Tooltip title={video.snippet.description}>
              <Typography
                variant="body2"
                color="text.secondary"
                style={textOverflow}
              >
                {video.snippet.description}
              </Typography>
            </Tooltip>
            <p>{video.snippet.channelTitle}</p>
            <p>{video.snippet.publishedAt}</p>
            <p>{video.statistics?.viewCount}</p>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default VideoItem;
