import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Tooltip } from "@mui/material";
import { Video } from "../../types/types";
import { useEffect, useState } from "react";
import { showStatistics } from "../../apis/youtube";

export const textOverflow: Object = {
  whiteSpace: "nowrap",
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
  const [viewCount, setViewCount] = useState<number>(0);

  useEffect(() => {
    const getViewCount = async () => {
      const response = await showStatistics(video.id.videoId);
      setViewCount(response.data.items[0].statistics.viewCount);
    };
    getViewCount();
  });

  return (
    <div style={{ width: "320px" }}>
      <Card
        className="videoitem-card"
        onClick={() => handleVideoSelect(video)}
        sx={{ maxWidth: 320 }}
      >
        <CardActionArea
          className="videoitem-action"
          sx={{ height: 400, cursor: "grab" }}
        >
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
            <p>{viewCount} times watched</p>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default VideoItem;
