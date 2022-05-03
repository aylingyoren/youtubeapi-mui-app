import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

export default function CircularColor() {
  return (
    <Stack
      sx={{ color: "grey.500" }}
      spacing={2}
      direction="row"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <CircularProgress color="secondary" />
      <CircularProgress color="success" />
      <CircularProgress color="inherit" />
    </Stack>
  );
}
