import FilterAltIcon from "@mui/icons-material/FilterAlt"
import { Box } from "@mui/system"
import { Button } from "@mui/material"
import React, { useState } from "react"
import PickDate from "../PickDate"
import AmountPicker from "./AmountPicker"
import ChipsSection from "./ChipsSection"
import { useQuery } from "@apollo/client"
import { TRANSACTION_BY_AMOUNT_QUERY } from "../../queries/TRANSACTION_BY_AMOUNT.JS"
import Image from "next/image"

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
    <Box sx={{ mt: 12, mb: 5 }}>
      <ChipsSection />

      <PickDate />

      <AmountPicker amount={props.amount} onPickAmount={amountChangeHandler} />

      {/* <Box
        sx={{
          position: "absolute",
          bottom: 0,
          background: "transparent",
        }}
      >
        {slsDataLoading ? (
          <span>
            <Image
              alt="loader"
              src={"/loading-gif.gif"}
              height={200}
              width={200}
            />
          </span>
        ) : (
          ""
        )}
      </Box> */}
    </Box>
  )
}

export default Filter
