import FilterAltIcon from "@mui/icons-material/FilterAlt"
import { Box } from "@mui/system"
import { Button } from "@mui/material"
import React from "react"
import PickDate from "../PickDate"
import AmountPicker from "./AmountPicker"
import ChipsSection from "./ChipsSection"

function Filter(props) {
  return (
    <Box sx={{ mt: 12, mb: 5 }}>
      <ChipsSection />
      <PickDate />
      <AmountPicker />
      <Box sx={{ my: 5, fontSize: "inherit", display: "flex" }}>
        <Button
          sx={{
            color: "#a42d2d",
            border: "1px solid #a42d2d",
            background: "inherit",
            borderRadius: "50px",
            width: "120px",
            fontSize: "initial",
            py: 1,
            px: 2,
            mr: 1,
            transition: "all 500ms ease-in-out",
            "&:hover": {
              background: "#a42d2d13",
            },
          }}
        >
          Reset
        </Button>
        <Button
          sx={{
            color: "#ffffff",
            border: "1px solid #a42d2d",
            background: "#a42d2d",
            borderRadius: "50px",
            fontSize: "initial",
            width: "120px",
            py: 1,
            px: 2,
            transition: "all 500ms ease-in-out",
            "&:hover": {
              background: "#720d19",
            },
          }}
        >
          Apply
          <FilterAltIcon color="white" />
        </Button>
      </Box>
    </Box>
  )
}

export default Filter
