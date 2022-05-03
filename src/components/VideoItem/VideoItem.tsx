import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { CardActionArea, Tooltip } from "@mui/material";
import { Video } from "../../types/types";
import useGetViewCount from "../../hooks/useGetViewCount";

export const textOverflow: Object = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

function VideoItem({ video }: { video: Video }) {
  const { viewCount } = useGetViewCount(video.id.videoId);

  return (
    <div style={{ width: "320px" }}>
      <Card className="videoitem-card" sx={{ maxWidth: 320 }}>
        <Link
          className="videoitem-link"
          href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
          target="_blank"
          sx={{ textDecoration: "none", color: "inherit" }}
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
              <Tooltip title={video.snippet.channelTitle}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={textOverflow}
                >
                  {video.snippet.channelTitle}
                </Typography>
              </Tooltip>
              <p>
                Published{" "}
                {video.snippet.publishedAt.toString().substring(0, 10)}
              </p>
              <p>{viewCount} times watched</p>
            </CardContent>
          </CardActionArea>
        </Link>
      </Card>
    </div>
  );
}

export default VideoItem;
