import Header from "../components/Header"
import styles from "../styles/Home.module.css"
import Appbar from "../components/Appbar"
import { Box, Button, Divider, Paper } from "@mui/material"
import Transactions from "../components/transactions/Transactions"
import Filter from "../components/filter/Filter"
import FilterAltIcon from "@mui/icons-material/FilterAlt"
import { useState } from "react"
import { TRANSACTION_BY_AMOUNT_QUERY } from "../queries/TRANSACTION_BY_AMOUNT.JS"
import { useQuery } from "@apollo/client"
import { GET_TRANSACTION } from "../queries/TRANSCTION_QUERY"

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

export default function HomePage() {
  // const [filteredInfo, setFilteredInfo] = useState(null)
  const [amount1, setAmount] = useState([0, 1000000])
  const [data, setData] = useState(null)

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

  // Unfiltered Data Ordered by date query

  const {
    data: fullUnfilteredMT940,
    loading: fullUnfilteredMT940Loading,
    error: fullUnfilteredMT940Error,
  } = useQuery(GET_TRANSACTION)

  // If error when getting data

  if (slsByAmountDataLoading || fullUnfilteredMT940Loading)
    return <p>loading</p>

  if (slsByAmountDataError || fullUnfilteredMT940Error) return `Error! ${error}`

  // If data return is null

  if (
    !slsByAmountData.getStmtLinesFilterByAmount ||
    !fullUnfilteredMT940.getStmtLineGroupedByDate
  )
    return <p>Sorry!, No Data in the database!</p>

  // Get Filter Data function
  const getFilteredData = (filteredData) => {
    // console.log(filteredData)
    setData(filteredData)
  }

  const submitHandler = () => {
    console.log("Submit!")
    setAmount(data)
  }

  return (
    <Box className={styles.home}>
      <Header />
      <Appbar />
      <Filter amount={amount1} onFilter={getFilteredData} />

      <Box sx={{ my: 5, fontSize: "inherit", display: "flex" }}>
        <Button sx={button1}>Reset</Button>
        <Button sx={button2} onClick={submitHandler}>
          Apply
          <FilterAltIcon color="white" />
        </Button>
      </Box>
      <Divider />
      <Transactions slsData={slsByAmountData.getStmtLinesFilterByAmount} />
    </Box>
  )
}
