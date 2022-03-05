import { Box } from "@mui/system"
import { Divider } from "@mui/material"
import React from "react"
import PickDate from "../PickDate"
import AmountPicker from "./AmountPicker"

function Filter(props) {
  const amountChangeHandler = (amnt) => {
    if (isNaN(amnt[0])) {
      console.log("Enter number 0")
    } else if (isNaN(amnt[1])) {
      console.log("Enter number 1")
    } else {
      props.onFilter(amnt)
    }
  }

  return (
    <Box sx={{ my: 5 }}>
      {/* <Divider /> */}
      <Box sx={{ m: 0, p: 0, textAlign: "center" }}>
        <h2>Filter</h2>
      </Box>
      <Box display={"flex"} justifyContent="space-between">
        <PickDate />
        <Divider orientation="vertical" flexItem />
        <AmountPicker
          amount={props.amount}
          onPickAmount={amountChangeHandler}
        />
      </Box>
    </Box>
  )
}

export default Filter
