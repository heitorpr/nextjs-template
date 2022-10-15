import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "lib/createEmotionCache";
import Head from "next/head";
import { AppProps } from "next/app";
import theme from "theme";
import "index.css";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import type { NextComponentType } from "next";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

type CustomAppProps = AppProps & {
  Component: NextComponentType;
  pageProps: { session?: Session };
};

interface MyAppProps extends CustomAppProps {
  emotionCache?: EmotionCache;
}

export default function App(props: MyAppProps): JSX.Element {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { session, ...pageProps }
  } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width, height=device-height"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
