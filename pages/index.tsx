import { Box, Typography } from "@mui/material";
import Head from "next/head";
import { signIn, getSession } from "next-auth/react";
import { GetServerSideProps } from "next";

export default function Index(): JSX.Element {
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
        <title>App name</title>
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
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          p: 2
        }}
      >
        <Typography>Entre no app</Typography>
        <button onClick={() => signIn("cognito")}>Entrar</button>
      </Box>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/home",
        permanent: false
      }
    };
  }

  return {
    props: {
      session
    }
  };
};
