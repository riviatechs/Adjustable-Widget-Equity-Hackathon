import * as React from "react";

import NextNProgress from "nextjs-progressbar";
import { BallTriangle } from "react-loader-spinner";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import "../styles/globals.css";
import { Box } from "@mui/material";

const client = new ApolloClient({
  uri: "https://admin-server-6bn7q3qbbq-nw.a.run.app/graphql",
  cache: new InMemoryCache(),
});

export default function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
