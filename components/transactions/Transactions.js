import { Box } from "@mui/system"
import React, { useEffect, useState } from "react"
import Transaction from "./Transaction"
import ClipLoader from "react-spinners/ClipLoader"

import { getDate } from "../../util/util"
import { useQuery } from "@apollo/client"
import { FILTER_QUERY } from "../../queries/TRANSACTION_BY_AMOUNT.JS"
import { Skeleton } from "@mui/material"

import styles from "../../styles/components/Transactions.module.css"
import Link from "next/link"

const centerItem = { display: "flex", justifyContent: "center" }

export default function Transactions(props) {
  // const [filteredSls, setFilteredSls] = useState(props.slsData)
  const [amountRange, setAmount] = useState(props.amountToFilter)
  const [transactionType, setTransactionType] = useState(props.tt)
  const [dateRange, setDateRange] = useState(props.dateRange)
  const [date, setDate] = useState(props.date)

  useEffect(() => {
    setAmount(props.amountToFilter)
    setTransactionType(props.tt)
    setDateRange(props.dateRange)
    setDate(props.date)
  }, [props.amountToFilter, props.tt, props.dateRange, props.date])

  // console.log(transactionType, amountRange, dateRange, date)

  const {
    data: slsByAmountData,
    loading: slsByAmountDataLoading,
    error: slsByAmountDataError,
  } = useQuery(
    FILTER_QUERY,
    retType(transactionType, amountRange, dateRange, date)
  )

  // When loading

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
        <Box className={styles.noDataContainer}>
          Sorry! No Transactions Available!
        </Box>
      </Box>
    )

  // setAmount()

  return (
    <Box className={styles.transactionsContainer}>
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

const retType = (transType, amntRange, dtRange, dt) => {
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
