import Header from "../components/Header"
import styles from "../styles/Home.module.css"
import Appbar from "../components/Appbar"
import { TransitionGroup } from "react-transition-group"
import {
  Box,
  Button,
  Divider,
  Grow,
  IconButton,
  styled,
  TextField,
} from "@mui/material"
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded"
import Transactions from "../components/transactions/Transactions"
import Filter from "../components/filter/Filter"
import { useEffect, useRef, useState } from "react"
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

const centerItem = { display: "flex", justifyContent: "center" }

export default function HomePage() {
  // const [filteredInfo, setFilteredInfo] = useState(null)
  const [amount1, setAmount] = useState([0, 1000000])
  const [data, setData] = useState(null)
  const [moreFilters, setMoreFilters] = useState(false)
  const [activeFilter, setActiveFilter] = useState("active-1")
  const [loading, setLoading] = useState(false)
  const containerRef = useRef(null)

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
  const getFilteredData = (filteredData) => {
    // console.log(filteredData)
    setData(filteredData)
  }

  const applyAmountFilter = () => {
    setAmount(data)
  }

  const showFilters = () => {
    setMoreFilters(true)
  }

  // const onClickHandler = () => {
  //   console.log()
  // }

  return (
    <Box className={styles.home}>
      <Header />
      <Appbar scroll={scrollPosition} />
      <Box className={styles.body} mt={13}>
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
        {moreFilters ? (
          <TransitionGroup>
            <Divider />
            <Grow className={styles.growAnimation} {...{ timeout: 200 }}>
              <Box>
                <Filter amount={amount1} onFilter={getFilteredData} />
                <Box sx={{ ...buttonBox, ...centerItem }}>
                  <Button sx={button1}>Reset</Button>
                  <Button sx={button2} onClick={applyAmountFilter}>
                    Apply
                  </Button>
                </Box>
              </Box>
            </Grow>
          </TransitionGroup>
        ) : (
          ""
        )}
        <Divider className={styles.line} />
        {moreFilters ? (
          <IconButton
            aria-label="collapse"
            className={styles.dropUpButton}
            onClick={() => {
              setMoreFilters(false)
            }}
          >
            <ArrowUpwardRoundedIcon />
          </IconButton>
        ) : (
          ""
        )}

        <Transactions />
      </Box>
    </Box>
  )
}
