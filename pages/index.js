import Header from "../components/Header"
import styles from "../styles/Home.module.css"
import Appbar from "../components/Appbar"
import {
  Box,
  Button,
  Divider,
  Paper,
  Skeleton,
  styled,
  TextField,
} from "@mui/material"
import Transactions from "../components/transactions/Transactions"
import Filter from "../components/filter/Filter"
import FilterAltIcon from "@mui/icons-material/FilterAlt"
import { useEffect, useState } from "react"
import { TRANSACTION_BY_AMOUNT_QUERY } from "../queries/TRANSACTION_BY_AMOUNT.JS"
import { useQuery } from "@apollo/client"
import { GET_TRANSACTION } from "../queries/TRANSCTION_QUERY"
import ChipsSection from "../components/filter/ChipsSection"

const button1 = {
  color: "#a42d2d",
  border: "1px solid #a42d2d",
  background: "inherit",
  borderRadius: "50px",
  width: "120px",
  fontSize: "initial",
  py: 1,
  px: 2,
  mr: 1,
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
  // const [filteredInfo, setFilteredInfo] = useState(null)
  const [amount1, setAmount] = useState([0, 1000000])
  const [data, setData] = useState(null)
  const [moreFilters, setMoreFilters] = useState(false)
  const [loading, setLoading] = useState(false)

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

  const {
    data: slsByAmountData,
    loading: slsByAmountDataLoading,
    error: slsByAmountDataError,
  } = useQuery(TRANSACTION_BY_AMOUNT_QUERY, {
    variables: {
      amount: {
        lower: amount1[0],
        upper: amount1[1],
      },
    },
  })

  // When loading

  if (slsByAmountDataLoading) {
    return (
      <Box className={styles.home}>
        <Appbar />
        <Skeleton sx={{ borderRadius: 10 }} height={400} />
        <Box my={10}>loading . . .</Box>
      </Box>
    )
  }

  // If error when getting data

  if (slsByAmountDataError) return `Error! ${error}`

  // If data return is null

  if (!slsByAmountData.getStmtLinesFilterByAmount)
    return (
      <Box className={styles.home}>
        <Appbar />
        <Box sx={{ pt: 20 }}>Sorry! No Data in the database!</Box>
      </Box>
    )

  // Get Filter Data function
  const getFilteredData = (filteredData) => {
    // console.log(filteredData)
    setData(filteredData)
  }

  const applyAmountFilter = () => {
    console.log("Submit!")
    setAmount(data)
  }

  const showFilters = () => {
    console.log("show filters!")
    setMoreFilters((prev) => !prev)
  }

  return (
    <Box className={styles.home}>
      <Header />
      <Appbar scroll={scrollPosition} />
      <Box mt={10}>
        <Box
          width={"100%"}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MyTextField
            size="small"
            sx={{ width: "500px" }}
            placeholder="Search"
          />
        </Box>
        <ChipsSection active="active-1" onClickFilters={showFilters} />
        {moreFilters ? (
          <Box>
            <Filter amount={amount1} onFilter={getFilteredData} />

            <Box sx={buttonBox}>
              <Button sx={button1}>Reset</Button>
              <Button sx={button2} onClick={applyAmountFilter}>
                Apply
              </Button>
            </Box>
          </Box>
        ) : (
          ""
        )}
        <Divider />
        <Transactions slsData={slsByAmountData.getStmtLinesFilterByAmount} />
      </Box>
    </Box>
  )
}
