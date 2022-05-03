import { ChangeEvent, FormEvent } from "react";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { centeredContent } from "../App/App";
import styled from "@emotion/styled";

const searchIconStyle: Object = {
  width: "50px",
  fontSize: "50px",
  cursor: "pointer",
  marginLeft: "7px",
};

const SearchBoxDiv = styled.div`
  margin: 20px 0;

  @media (max-width: 340px) {
    .searchbox {
      width: 200px;
    }
    #outlined-basic-helper-text {
      text-align: center;
    }
  }
`;

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
    <div style={centeredContent}>
      <form onSubmit={handleSubmit}>
        <SearchBoxDiv>
          <TextField
            className="searchbox"
            onChange={handleChange}
            value={term}
            id="outlined-basic"
            label="Search videos..."
            variant="outlined"
            helperText="Enter search keyword(s) and press Enter..."
          />
          <SearchIcon style={searchIconStyle} onClick={handleSubmit} />
        </SearchBoxDiv>
      </form>
    </div>
  );
}

export default SearchBox;
