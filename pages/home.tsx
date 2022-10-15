import { Box, Typography } from "@mui/material";
import Head from "next/head";
import { useSession, signOut } from "next-auth/react";
import { format } from "date-fns";
import Link from "components/link";

export default function Home(): JSX.Element {
  const { data: session } = useSession();

  return (
    <Box
      sx={{
        backgroundColor: "primary.dark",
        display: "flex",
        flexDirection: "column",
        height: "100%"
      }}
    >
      <Head>
        <title>Home</title>
      </Head>
      <Box
        sx={{
          backgroundColor: "#f00",
          display: "flex",
          flexDirection: "row",
          height: 80,
          m: 2
        }}
      >
        <Box
          sx={{
            backgroundColor: "#ff0",
            display: "flex",
            flexDirection: "column",
            flexGrow: 1
          }}
        >
          <Typography>Box 3</Typography>
        </Box>

        <Box
          sx={{
            backgroundColor: "#f0f",
            display: "flex",
            flexDirection: "column",
            flexGrow: 1
          }}
        >
          <Typography>Box 4</Typography>
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: "#0f0",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          p: 2
        }}
      >
        <Typography>Mi casa es su casa {session?.user?.email}</Typography>
        <button onClick={() => signOut()}>Sign out</button>

        <Box sx={{ mt: 2 }}>
          <Link href="/protected-page">Go to protected page</Link>
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: "#ff0",
          display: "flex",
          flexDirection: "column",
          m: 2
        }}
      >
        <Typography>Created by Heitor Polizeli Rodrigues</Typography>
        <Typography>{format(new Date(), "d LLLL, yyyy")}</Typography>
      </Box>
    </Box>
  );
}
