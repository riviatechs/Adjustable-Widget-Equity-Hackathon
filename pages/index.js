import Header from "../components/Header"
import styles from "../styles/Home.module.css"
import Appbar from "../components/Appbar"
import { Box, styled, TextField } from "@mui/material"
import Transactions from "../components/transactions/Transactions"
import Filter from "../components/filter/Filter"
import { useEffect, useRef, useState } from "react"
import ChipsSection from "../components/filter/ChipsSection"

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
  const [amount, setAmount] = useState([0, 100000000])
  const [transType, setTransType] = useState("ALL")
  const [date, setTransDate] = useState([null, null])
  const [data, setData] = useState(null)
  const [activeFilter, setActiveFilter] = useState("active-1")

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

  const getDateRange = (dR) => {
    setTransDate(dR)
  }

  return (
    <Box className={styles.home}>
      <Header />
      <Box className={styles.body}>
        <Box className={styles.filterSection}>
          <Box className={styles.growAnimation}>
            <Filter
              onFilterDateRange={getDateRange}
              filterAmount={amount}
              onFilterAmountRange={getFilteredAmount}
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
            dateRange={date}
            tt={transType}
            amountToFilter={amount}
          />
        </Box>
      </Box>
    </Box>
  )
}
