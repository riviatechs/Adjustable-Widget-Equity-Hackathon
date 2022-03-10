import Header from "../components/Header"
import styles from "../styles/Home.module.css"
import Appbar from "../components/Appbar"
import { Box, Button, IconButton, styled, TextField } from "@mui/material"
import FileDownloadIcon from "@mui/icons-material/FileDownload"
import FilterAltIcon from "@mui/icons-material/FilterAlt"
import Transactions from "../components/transactions/Transactions"
import Filter from "../components/filter/Filter"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import SearchIcon from "@mui/icons-material/Search"
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

const MyTextFieldSearch = styled(TextField)({
  "& label.Mui-focused": {
    color: "#a42d2d",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#a42d2d30",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#00000033",
      borderRadius: "50px 0 0 50px",
    },
    "&:hover fieldset": {
      borderColor: "#000000",
    },
    "&.Mui-focused fieldset": {
      border: "1px solid #a42d2d",
      borderRight: 0,
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

  // const [openFilter, setOPenFilter] = useState(false)
  const [transType, setTransType] = useState("ALL")
  const [activeFilter, setActiveFilter] = useState("active-1")
  const [searchInput, setSearchInput] = useState("")
  const [searchInputData, setSearchInputData] = useState("")
  const [showFilterMobile, setShowFilterMobile] = useState(true)

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
  }

  const getDate = (dt) => {
    setDate(dt)
    console.log("NO PERIOD")
  }

  const onSearchInput = (e) => {
    setSearchInput(e.target.value)
  }

  const onSearchEnter = (event) => {
    if (event.key === "Enter") {
      // console.log(searchInput)
      setSearchInputData(searchInput)
    }
  }

  const onSearchIconClick = () => {
    // console.log(searchInput)
    setSearchInputData(searchInput)
  }

  const resetSearch = () => {
    setSearchInput("")
    setSearchInputData("")
  }

  const removeFilterMobile = () => {
    setShowFilterMobile((prev) => !prev)
  }

  return (
    <Box className={styles.home}>
      <Header />
      <Appbar scroll={scrollPosition} />

      <ExportModal
        dateRange={dateRange}
        date={date}
        tt={transType}
        amountToFilter={amount}
        open={open}
        onClose={handleClose}
      />

      <Box className={styles.body}>
        <Box
          className={
            showFilterMobile ? styles.filterSectionMobile : styles.filterSection
          }
        >
          <Box className={styles.growAnimation}>
            <Filter
              filterAmount={amount}
              filterDateRange={dateRange}
              filterDate={date}
              onFilterDateRange={getDateRange}
              onFilterAmountRange={getFilteredAmount}
              onFilterDate={getDate}
              showFilterMobile={showFilterMobile}
              removeFilterMobile={removeFilterMobile}
            />
          </Box>
        </Box>

        <Box
          className={
            showFilterMobile
              ? styles.contentSectionMobile
              : styles.contentSection
          }
        >
          <h1 className={styles.h1}>Transactions History</h1>
          <Box className={styles.searchBox}>
            <Box className={styles.search}>
              <MyTextFieldSearch
                size="small"
                fullWidth
                value={searchInput}
                onChange={onSearchInput}
                onKeyDown={onSearchEnter}
                placeholder="Search by Name or Account No"
              />
            </Box>
            <Box className={styles.searchIcon}>
              <IconButton onClick={onSearchIconClick}>
                <SearchIcon sx={{ color: "white" }} />
              </IconButton>
            </Box>
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
            searchString={searchInputData}
            resetSearch={resetSearch}
          />
        </Box>
      </Box>

      <Button
        onClick={removeFilterMobile}
        className={`button2 ${styles.mobileFilterButton}`}
      >
        <FilterAltIcon fontSize="medium" />
        <span className={styles.mobileFilterSpan}>Filters</span>
      </Button>

      <Button onClick={handleOpen} className={`button2 ${styles.exportButton}`}>
        <FileDownloadIcon fontSize="medium" />
        <span className={styles.exportSpan}>Export Statements</span>
      </Button>
    </Box>
  )
}
