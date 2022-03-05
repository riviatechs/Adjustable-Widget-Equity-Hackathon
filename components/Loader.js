import * as React from "react"
import Image from "next/image"
import ClipLoader from "react-spinners/ClipLoader"

import { Box } from "@mui/material"

function Loader() {
  return (
    <Box sx={{ mx: "50%", my: "50%" }}>
      <ClipLoader />
    </Box>
  )
}

export default Loader
