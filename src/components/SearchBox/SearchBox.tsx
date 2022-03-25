import { ChangeEvent, FormEvent } from "react";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const searchIconStyle: Object = {
  width: "50px",
  fontSize: "50px",
  cursor: "pointer",
  marginLeft: "7px",
};

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
        <SearchIcon style={searchIconStyle} onClick={handleSubmit} />
      </form>
    </div>
  );
}

export default SearchBox;
