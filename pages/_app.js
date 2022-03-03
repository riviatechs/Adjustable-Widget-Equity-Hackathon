import * as React from "react"

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"

import "../styles/globals.css"

const client = new ApolloClient({
  uri: "https://mt940-server-s47opgtmgq-uc.a.run.app/graphql",
  cache: new InMemoryCache(),
})

export default function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    setTimeout(() => setLoading(false), 2000)
  }, [])

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
