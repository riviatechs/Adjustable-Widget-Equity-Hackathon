import * as React from "react"

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import "../styles/globals.css"
import Loader from "../components/Loader"

const client = new ApolloClient({
  uri: "https://mt940-server-s47opgtmgq-uc.a.run.app/graphql",
  cache: new InMemoryCache(),
})

export default function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    setTimeout(() => setLoading(false), 3000)
  }, [])

  return (
    <ApolloProvider client={client}>
      {!loading ? <Component {...pageProps} /> : <Loader />}
    </ApolloProvider>
  )
}
