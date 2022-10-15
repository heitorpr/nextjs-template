import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import { BuiltInProviderType } from "next-auth/providers";
import {
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
  signIn
} from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

type SignInPageProps = {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
};

function extractCallBackUrl(
  callbackUrl: string | string[] | undefined
): string | undefined {
  if (typeof callbackUrl === "string") {
    return callbackUrl;
  }

  if (callbackUrl) {
    return callbackUrl.join("/");
  }

  return undefined;
}

export default function SignIn({ providers }: SignInPageProps): JSX.Element {
  const {
    query: { callbackUrl }
  } = useRouter();

  const [loading, setLoading] = useState(false);
  const callbackUrlAuth = extractCallBackUrl(callbackUrl);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
      }}
    >
      {!loading && (
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3">Entre no app</Typography>
        </Box>
      )}

      {loading && <CircularProgress />}

      {!loading &&
        Object.values(providers).map((provider) => (
          <Button
            key={provider.name}
            onClick={() => {
              setLoading(true);
              signIn(provider.id, { callbackUrlAuth });
            }}
          >
            Sign in with {provider.name}
          </Button>
        ))}
    </Box>
  );
}

export async function getServerSideProps(context: GetServerSideProps) {
  const providers = await getProviders();
  return {
    props: { providers }
  };
}
