import React, { useEffect, useState } from "react"
import { Box } from "@mui/system"
import { Button } from "@mui/material"
import PickDate from "./PickDate"
import AmountPicker from "./AmountPicker"

import styles from "../../styles/components/Filter.module.css"

const buttonBox = { my: 2, fontSize: "inherit", display: "flex" }
const centerItem = { display: "flex", justifyContent: "center" }

function Filter(props) {
  const [newAmount, setNewAmount] = useState(props.filterAmount)
  const [newDateRange, setDateRange] = useState(props.filterDateRange)
  const [newDate, setDate] = useState(props.filterDate)
  const [viewPeriod, setViewPeriod] = React.useState(true)

  useEffect(() => {
    setNewAmount(props.filterAmount)
    setDateRange(props.filterDateRange)
    setDate(props.filterDate)
  }, [props.filterAmount, props.filterDateRange, props.filterDate])

  const amountChangeHandler = (amnt) => {
    setNewAmount(amnt)
  }

  const dateRangeChangeHandler = (dtRange) => {
    setDateRange(dtRange)
  }

  const dateChangeHandler = (dt) => {
    setDate(dt)
  }

  const getPeriodStatusHandler = (prd) => {
    setViewPeriod(prd)
  }

  const applyFilters = () => {
    props.onFilterAmountRange(newAmount)
    props.onFilterDateRange(newDateRange)
    props.onFilterDate(newDate)

    console.log(viewPeriod)

    // if (viewPeriod) {
    //   props.onFilterDateRange(newDateRange)
    //   props.onFilterDate(newDateRange)
    // } else if (!viewPeriod) {
    //   props.onFilterDate(newDate)
    //   props.onFilterDateRange(newDateRange)
    // }
  }

  return (
    <Box className={styles.filterContainer}>
      <h2 className={styles.h1}>Filter</h2>
      <PickDate
        filterDateRange={newDateRange}
        onFilterDateRange={dateRangeChangeHandler}
        filterDate={newDateRange}
        onFilterDate={dateChangeHandler}
        isPeriod={viewPeriod}
        onPeriodChange={getPeriodStatusHandler}
      />
      <AmountPicker
        filterAmount={props.filterAmount}
        onPickAmount={amountChangeHandler}
      />
      <Box sx={{ ...buttonBox, ...centerItem }}>
        <Button className="button1">Reset</Button>

        <Button className="button2" onClick={applyFilters}>
          Apply
        </Button>
      </Box>
    </Box>
  )
}

export default Filter
