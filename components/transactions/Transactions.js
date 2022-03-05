import { Box } from "@mui/system"
import React, { useEffect, useState } from "react"
import Transaction from "./Transaction"
import ClipLoader from "react-spinners/ClipLoader"

import { getDate } from "../../util/util"
import { useQuery } from "@apollo/client"
import { FILTER_QUERY } from "../../queries/TRANSACTION_BY_AMOUNT.JS"
import Appbar from "../Appbar"
import { Skeleton } from "@mui/material"

import styles from "../../styles/components/Transactions.module.css"

const centerItem = { display: "flex", justifyContent: "center" }

export default function Transactions(props) {
  // const [filteredSls, setFilteredSls] = useState(props.slsData)
  const [amountRange, setAmount] = useState(props.amountToFilter)
  const [transactionType, setTransactionType] = useState(props.tt)
  const [dateRange, setDateRange] = useState(props.dateRange)

  useEffect(() => {
    setAmount(props.amountToFilter)
    setTransactionType(props.tt)
    setDateRange(props.dateRange)
  }, [props.amountToFilter, props.tt, props.dateRange])

  const {
    data: slsByAmountData,
    loading: slsByAmountDataLoading,
    error: slsByAmountDataError,
  } = useQuery(FILTER_QUERY, retType(transactionType, amountRange, dateRange))

  console.log(dateRange)

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
    return (
      <Box className={styles.transactionsContainer}>
        <h2 className={styles.h2}>Transaction History</h2>
        <Box className={styles.noDataContainer}>
          {`Error! ${slsByAmountDataError}`}
        </Box>
      </Box>
    )
  }

  // If data return is null

  if (!slsByAmountData.statementsFiltered)
    return (
      <Box className={styles.transactionsContainer}>
        <h2 className={styles.h2}>Transaction History</h2>
        <Box className={styles.noDataContainer}>
          Sorry! No Transactions Available!
        </Box>
      </Box>
    )

  // setAmount()

  return (
    <Box className={styles.transactionsContainer}>
      <h2 className={styles.h2}>Transaction History</h2>
      {slsByAmountData.statementsFiltered.map((MT940) => {
        const transDate = getDate(MT940.DateTime)
        return (
          <Box key={MT940.DateTime} className={styles.transactionsContainer}>
            <h3 className={styles.h3}>
              {transDate.dayName}, {transDate.day} {transDate.month}{" "}
              {transDate.year}
            </h3>
            {MT940.confirmations.map((trans) => (
              <Transaction key={trans.id} data={trans} />
            ))}
          </Box>
        )
      })}
    </Box>
  )
}

const retType = (transType, amntRange, dtRange) => {
  if (transType === "ALL") {
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
          tt: transType,
        },
      },
    }
  }
}
