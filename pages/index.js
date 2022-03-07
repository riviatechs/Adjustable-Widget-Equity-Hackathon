import Header from "../components/Header"
import styles from "../styles/Home.module.css"
import Appbar from "../components/Appbar"
import { Box, Button, styled, TextField } from "@mui/material"
import FileDownloadIcon from "@mui/icons-material/FileDownload"
import Transactions from "../components/transactions/Transactions"
import Filter from "../components/filter/Filter"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import ChipsSection from "../components/filter/ChipsSection"
import ExportModal from "../components/ExportModal"

const MyTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#a42d2d",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#a42d2d",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#00000033",
      borderRadius: 50,
    },
    "&:hover fieldset": {
      borderColor: "#000000",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#a42d2d",
    },
  },
})

export default function HomePage() {
  const todayDate = new Date().toISOString()

  const [amount, setAmount] = useState([0, 100000000])
  const [date, setDate] = useState("NONE")
  const [dateRange, setDateRange] = useState([
    "2018-01-01T00:00:00.000Z",
    todayDate,
  ])
  // const [viewPeriod, setViewPeriod] = useState(true)
  const [transType, setTransType] = useState("ALL")
  const [activeFilter, setActiveFilter] = useState("active-1")

  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  // Get the position of scroll
  const [scrollPosition, setScrollPosition] = useState(0)
  const handleScroll = () => {
    const position = window.pageYOffset
    setScrollPosition(position)
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    setDate(date)
    setDateRange(dateRange)
  }, [date, dateRange])

  // Filter Data by Amount query

  // Get Filter Data function
  const getFilteredAmount = (filteredAmount) => {
    setAmount(filteredAmount)
  }

  // Execute after a Click on any chip
  const showFilters = (filterActive) => {
    setActiveFilter(filterActive)

    if (filterActive === "active-1") {
      setTransType("ALL")
    }

    if (filterActive === "active-3") {
      setTransType("C")
    }

    if (filterActive === "active-5") {
      setTransType("D")
    }
  }

  const getDateRange = (dtR) => {
    setDateRange(dtR)
    // setDate("NONE")
  }

  const getDate = (dt) => {
    setDate(dt)
    // setDateRange(["2018-01-01T00:00:00.000Z", todayDate])
    console.log("NO PERIOD")
  }

  return (
    <Box className={styles.home}>
      <Header />
      <ExportModal open={open} onClose={handleClose} />

      <Box className={styles.body}>
        <Box className={styles.filterSection}>
          <Box className={styles.growAnimation}>
            <Filter
              filterAmount={amount}
              filterDateRange={dateRange}
              filterDate={date}
              onFilterDateRange={getDateRange}
              onFilterAmountRange={getFilteredAmount}
              onFilterDate={getDate}
            />
          </Box>
        </Box>

        <Box className={styles.contentSection}>
          <Appbar scroll={scrollPosition} />
          <h1 className={styles.h1}>Transaction History</h1>
          <Box className={styles.searchBox}>
            <MyTextField
              size="small"
              fullWidth
              className={styles.search}
              placeholder="Search by Name or Account No"
            />
          </Box>

          <ChipsSection
            className={styles.chips}
            active={activeFilter}
            onClickFilters={showFilters}
          />

          <Transactions
            dateRange={dateRange}
            date={date}
            tt={transType}
            amountToFilter={amount}
          />
        </Box>
      </Box>

      <Button onClick={handleOpen} className={`button2 ${styles.exportButton}`}>
        <FileDownloadIcon />
        <span className={styles.exportSpan}>Export Statements</span>
      </Button>
    </Box>
  )
}
