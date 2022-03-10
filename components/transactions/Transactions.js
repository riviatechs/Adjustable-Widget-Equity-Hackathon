import { Box } from "@mui/system"
import React, { useEffect, useState } from "react"
import Transaction from "./Transaction"
import ClipLoader from "react-spinners/ClipLoader"

import { getDate } from "../../util/util"
import { useQuery } from "@apollo/client"
import { FILTER_QUERY } from "../../queries/TRANSACTION_BY_AMOUNT.JS"
import { Alert, IconButton, Skeleton, Snackbar } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

import styles from "../../styles/components/Transactions.module.css"
import Link from "next/link"

const centerItem = { display: "flex", justifyContent: "center" }

export default function Transactions(props) {
  // const [filteredSls, setFilteredSls] = useState(props.slsData)
  const [amountRange, setAmount] = useState(props.amountToFilter)
  const [transactionType, setTransactionType] = useState(props.tt)
  const [dateRange, setDateRange] = useState(props.dateRange)
  const [date, setDate] = useState(props.date)
  const [searchString, setSearchString] = useState(props.searchString)

  const [open, setOpen] = React.useState(true)

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }

    setOpen(false)
  }

  useEffect(() => {
    setSearchString(props.searchString)
  }, [props.searchString])

  useEffect(() => {
    setAmount(props.amountToFilter)
    setTransactionType(props.tt)
    setDateRange(props.dateRange)
    setDate(props.date)
    setOpen(true)
  }, [props.amountToFilter, props.tt, props.dateRange, props.date])

  const {
    data: slsByAmountData,
    loading: slsByAmountDataLoading,
    error: slsByAmountDataError,
  } = useQuery(
    FILTER_QUERY,
    retType(transactionType, amountRange, dateRange, date, searchString)
  )

  // When loading
  console.log(dateRange, date)

  if (slsByAmountDataLoading) {
    return (
      <Box className={styles.loadingBox}>
        <Skeleton
          variant="rectangular"
          className={styles.transacationBoxLoading}
          height={20}
        />
        <Skeleton
          variant="rectangular"
          className={styles.transacationBox2Loading}
          height={100}
        />
        <Box sx={centerItem}>
          <ClipLoader />
        </Box>

        <Skeleton
          variant="rectangular"
          className={styles.transacationBoxLoading}
          height={20}
        />
        <Skeleton
          variant="rectangular"
          className={styles.transacationBox2Loading}
          height={100}
        />
      </Box>
    )
  }

  // If error when getting data

  if (slsByAmountDataError) {
    console.log(slsByAmountDataError)
    return (
      <Box className={styles.transactionsContainer}>
        <Box className={styles.noDataContainer}>
          We are having trouble connecting, refresh the page or try again later!
        </Box>
      </Box>
    )
  }

  // If data return is null

  if (!slsByAmountData.statementsFiltered)
    return (
      <Box className={styles.transactionsContainer}>
        <Box>
          {searchString !== "" &&
          slsByAmountData.statementsFiltered === null ? (
            <Box
              sx={{
                fontWeight: "thin",
                fontStyle: "italic",
                display: "flex",
                width: "250px",
                justifyContent: "space-around",
                alignItems: "center",
                mx: { xs: "auto" },
              }}
            >
              0 results
              <IconButton onClick={props.resetSearch}>
                <CloseIcon />
              </IconButton>
            </Box>
          ) : (
            ""
          )}
        </Box>
        <Box className={styles.noDataContainer}>
          Sorry! No Transactions Available!
        </Box>
      </Box>
    )

  // setAmount()

  return (
    <Box className={styles.transactionsContainer}>
      <Box className={styles.transactionNumber}>
        {slsByAmountData.statementsFiltered.length !== 0 ? (
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              elevation={2}
              sx={{ width: { md: "100%", xs: "70%" } }}
            >
              Total of {slsByAmountData.statementsFiltered.length} transactions
            </Alert>
          </Snackbar>
        ) : (
          ""
        )}
      </Box>

      <Box>
        {searchString !== "" ? (
          <Box
            sx={{
              fontWeight: "thin",
              fontStyle: "italic",
              display: "flex",
              width: "250px",
              justifyContent: "space-around",
              alignItems: "center",
              mx: { xs: "auto" },
            }}
          >
            Showing{" "}
            <Box sx={{ fontWeight: "bold" }}>
              {slsByAmountData.statementsFiltered.length}{" "}
            </Box>
            result(s)
            <IconButton onClick={props.resetSearch}>
              <CloseIcon />
            </IconButton>
          </Box>
        ) : (
          ""
        )}
      </Box>

      {slsByAmountData.statementsFiltered.map((MT940) => {
        const transDate = getDate(MT940.DateTime)
        return (
          <Box key={MT940.DateTime} className={styles.transactionsContainer}>
            <h3 className={styles.h3}>
              {transDate.dayName}, {transDate.day} {transDate.month}{" "}
              {transDate.year}
            </h3>
            {MT940.confirmations.map((trans) => (
              <Link
                href={`/${encodeURIComponent(trans.id)}`}
                key={trans.id}
                passHref
              >
                <a>
                  <Transaction data={trans} />
                </a>
              </Link>
            ))}
          </Box>
        )
      })}
    </Box>
  )
}

const retType = (transType, amntRange, dtRange, dt, search) => {
  if (search !== "") {
    if (transType === "ALL") {
      return {
        variables: {
          input: {
            search: search,
          },
        },
      }
    } else {
      return {
        variables: {
          input: {
            tt: transType,
            search: search,
          },
        },
      }
    }
  } else {
    if (transType === "ALL") {
      if (dt === "NONE" || Array.isArray(dt)) {
        return {
          variables: {
            input: {
              amountRange: {
                lower: amntRange[0].toString(),
                upper: amntRange[1].toString(),
              },
              period: {
                start: dtRange[0],
                end: dtRange[1],
              },
            },
          },
        }
      } else {
        return {
          variables: {
            input: {
              amountRange: {
                lower: amntRange[0].toString(),
                upper: amntRange[1].toString(),
              },
              period: {
                date: dt,
              },
            },
          },
        }
      }
    } else {
      if (dt === "NONE" || Array.isArray(dt)) {
        return {
          variables: {
            input: {
              amountRange: {
                lower: amntRange[0].toString(),
                upper: amntRange[1].toString(),
              },
              period: {
                start: dtRange[0],
                end: dtRange[1],
              },
              tt: transType,
            },
          },
        }
      } else {
        return {
          variables: {
            input: {
              amountRange: {
                lower: amntRange[0].toString(),
                upper: amntRange[1].toString(),
              },
              period: {
                date: dt,
              },
              tt: transType,
            },
          },
        }
      }
    }
  }
}
