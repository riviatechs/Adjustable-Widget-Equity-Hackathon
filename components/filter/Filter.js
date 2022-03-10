import React, { useEffect, useState } from "react"
import { Box } from "@mui/system"
import { Button } from "@mui/material"
import PickDate from "./PickDate"
import AmountPicker from "./AmountPicker"

import styles from "../../styles/components/Filter.module.css"
import Link from "next/link"

const buttonBox = { my: 2, fontSize: "inherit", display: "flex" }
const centerItem = { display: "flex", justifyContent: "center" }

function Filter(props) {
  const [newAmount, setNewAmount] = useState(props.filterAmount)
  const [newDateRange, setDateRange] = useState(props.filterDateRange)
  const [newDate, setDate] = useState(props.filterDate)
  const [viewPeriod, setViewPeriod] = useState(true)
  // const [showFilterMobile, setShowFilterMobile] = useState(
  //   props.showFilterMobile
  // )
  // const [reset, setReset] = React.useState(false)

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
    // setShowFilterMobile(false)
    props.removeFilterMobile(true)
    props.onFilterAmountRange(newAmount)
    props.onFilterDateRange(newDateRange)
    props.onFilterDate(newDate)
  }

  return (
    <Box
      display={props.showFilterMobile ? "block" : { xs: "none" }}
      className={styles.filterContainer}
    >
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
        <Link href={"/"}>
          <a>
            <Button
              onClick={() => window.location.reload(false)}
              className="button1"
            >
              Reset
            </Button>
          </a>
        </Link>
        <Button className="button2" onClick={applyFilters}>
          Apply
        </Button>
      </Box>
    </Box>
  )
}

export default Filter
