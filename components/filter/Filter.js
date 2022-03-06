import { Box } from "@mui/system"
import { Button, Divider } from "@mui/material"
import React from "react"
import PickDate from "./PickDate"
import AmountPicker from "./AmountPicker"

import styles from "../../styles/components/Filter.module.css"

const button1 = {
  color: "#a42d2d",
  border: "1px solid #a42d2d",
  background: "inherit",
  borderRadius: "50px",
  width: "120px",
  fontSize: "initial",
  py: 1,
  px: 2,
  mr: 2,
  transition: "all 300ms ease-in-out",
  "&:hover": {
    background: "#a42d2d13",
  },
}

const button2 = {
  color: "#ffffff",
  border: "1px solid #a42d2d",
  background: "#a42d2d",
  borderRadius: "50px",
  fontSize: "initial",
  width: "120px",
  py: 1,
  px: 2,
  transition: "all 300ms ease-in-out",
  "&:hover": {
    background: "#720d19",
  },
}

const buttonBox = { my: 5, fontSize: "inherit", display: "flex" }
const centerItem = { display: "flex", justifyContent: "center" }

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

  const dateChangeHandler = (date) => {
    props.onFilterDateRange(date)
  }

  // Execute after a Click on apply filter button
  const applyFilters = (activeFilter) => {
    console.log(activeFilter)
  }

  return (
    <Box className={styles.filterContainer}>
      <h1 className={styles.h1}>Filter</h1>
      <PickDate onFilterDateRange={dateChangeHandler} />
      <AmountPicker
        filterAmount={props.filterAmount}
        onPickAmount={amountChangeHandler}
      />
      <Box sx={{ ...buttonBox, ...centerItem }}>
        <Button sx={button1}>Reset</Button>

        <Button sx={button2} onClick={applyFilters}>
          Apply
        </Button>
      </Box>
    </Box>
  )
}

export default Filter
