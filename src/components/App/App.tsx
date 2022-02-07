import { useQuery } from "react-query";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Character, GetCharacterResults } from "../../types";
import YouTubeCard from "../YouTubeCard";
import "./App.css";

function App() {
  const fetchCharacters = async (url: string) => {
    const req = await fetch(url);
    if (!req.ok) {
      throw new Error("Problem fetching data");
    }
    const { results }: GetCharacterResults = await req.json();
    return results;
  };

  // 'https://www.googleapis.com/yourube/vs/'
  // headers: {
  //     'X-API-KEY': 'apikey',
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json'
  // },

  const { data, isLoading, isError, error } = useQuery<Character[], Error>(
    "fetchData",
    async () =>
      fetchCharacters("https://rickandmortyapi.com/api/character/?page=1")
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occured: {error!.message}</div>;

  return (
    <div className="App">
      <h1>YouTube API App</h1>
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <SearchIcon />
      {data?.map((character) => {
        return <YouTubeCard key={character.id} character={character} />;
      })}
    </div>
  );
}

export default App;
