import React, { useEffect, useState } from "react"
import { Box } from "@mui/system"
import { Button } from "@mui/material"
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

const buttonBox = { my: 2, fontSize: "inherit", display: "flex" }
const centerItem = { display: "flex", justifyContent: "center" }

function Filter(props) {
  const [newAmount, setNewAmount] = useState(props.filterAmount)
  const [newDateRange, setDateRange] = useState(props.filterDateRange)

  useEffect(() => {
    setNewAmount(props.filterAmount)
    setDateRange(props.filterDateRange)
  }, [props.filterAmount, props.filterDateRange])

  const amountChangeHandler = (amnt) => {
    setNewAmount(amnt)
  }

  const dateChangeHandler = (dtRange) => {
    setDateRange(dtRange)
  }

  const applyFilters = () => {
    props.onFilterAmountRange(newAmount)
    props.onFilterDateRange(newDateRange)
  }

  return (
    <Box className={styles.filterContainer}>
      <h2 className={styles.h1}>Filter</h2>
      <PickDate
        filterDateRange={newDateRange}
        onFilterDateRange={dateChangeHandler}
      />
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
