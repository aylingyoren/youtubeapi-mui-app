import { ChangeEvent, FormEvent } from "react";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function SearchBox({
  handleFormSubmit,
  term,
  setTerm,
}: {
  handleFormSubmit: Function;
  term: string;
  setTerm: Function;
}) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement> | any) => {
    e.preventDefault();
    handleFormSubmit();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          onChange={handleChange}
          value={term}
          id="outlined-basic"
          label="Search videos..."
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
