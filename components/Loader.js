import { Box } from "@mui/material"
import Image from "next/image"
import { BallTriangle } from "react-loader-spinner"
import * as React from "react"

import Skeleton from "@mui/material/Skeleton"
import Stack from "@mui/material/Stack"

import loaderImage from "../public/loading.gif"

const circularStyling = {
  m: 20,
}

function Loader() {
  return (
    <Stack spacing={1} borderRadius={10} my={5} mx={30}>
      <Skeleton variant="text" height={100} width={200} />
      <Box sx={{ display: "flex" }}>
        <Box sx={{ circularStyling }}>
          <Skeleton variant="circular" width={40} height={40} />
        </Box>
        <Box>
          <Skeleton variant="circular" width={40} height={40} />
        </Box>
        <Box>
          <Skeleton variant="circular" width={40} height={40} />
        </Box>
      </Box>

      <Skeleton
        variant="rectangular"
        sx={{ mx: 10, height: 200, borderRadius: 10, py: 10 }}
      />
      <Skeleton
        variant="rectangular"
        sx={{ mx: 10, height: 200, borderRadius: 10, my: 10 }}
      />
    </Stack>
  )
}

export default Loader
