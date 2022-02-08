import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Video } from "../../types/types";

function VideoItem({
  video,
  handleVideoSelect,
}: {
  video: Video;
  handleVideoSelect: Function;
}) {
  return (
    <Card onClick={() => handleVideoSelect(video)} sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          src={video.snippet.thumbnails.medium.url}
          alt={video.snippet.description}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {video.snippet.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {video.snippet.description}
          </Typography>
          <p>{video.snippet.channelTitle}</p>
          <p>{video.snippet.publishedAt}</p>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default VideoItem;
