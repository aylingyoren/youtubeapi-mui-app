import { ChangeEvent, FormEvent } from "react";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./SearchBox.css";

function SearchBox({ handleFormSubmit, term, setTerm }: any) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement> | any) => {
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
        <SearchIcon
          sx={{ width: 50, fontSize: 50, cursor: "pointer", marginLeft: "7px" }}
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
}

export default SearchBox;
