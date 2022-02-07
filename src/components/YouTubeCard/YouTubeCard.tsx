import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Gusta from "../../assets/images/gusta.png";
import { Character } from "../../types";

export default function YouTubeCard({ character }: { character: Character }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={character.image}
          alt={character.name}
        />
        {/* <CardMedia component="img" image={Gusta} alt="gusta sausages" /> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {character.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Gender: {character.gender} | Species: {character.species} | Status:{" "}
            {character.status}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
