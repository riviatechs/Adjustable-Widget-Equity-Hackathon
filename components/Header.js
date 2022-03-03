import Head from "next/head"
import React from "react"

function Header() {
  return (
    <Head>
      <link rel="apple-touch-icon" href="/favicon.ico" />
      <meta
        name="description"
        content="Equity hackathon - configurable MT940 widget"
      />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
  )
}

export default Header
