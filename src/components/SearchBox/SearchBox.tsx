import { ChangeEvent, FormEvent, useState } from "react";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function SearchBox({ handleFormSubmit }: any) {
  const [term, setTerm] = useState<string>("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleFormSubmit(term);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          onChange={handleChange}
          value={term}
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
        />
        <SearchIcon />
      </form>
    </div>
  );
}

export default SearchBox;
