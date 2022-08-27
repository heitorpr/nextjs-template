import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";

export default function Error(): JSX.Element {
  const {
    query: { error },
  } = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h4">Sorry a error happened: {error}</Typography>
    </Box>
  );
}
