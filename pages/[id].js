import Header from "../components/Header"
import Appbar from "../components/Appbar"
import { Avatar, Box, Button, IconButton, Skeleton } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"

import styles from "../styles/components/TransactionDetails.module.css"
import { useQuery } from "@apollo/client"
import { INDIVIDUAL_STATEMENT } from "../queries/INDIVIDUAL_STATEMENT"
import { ClipLoader } from "react-spinners"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { getAvatarLetter, getDate, priceSeparator } from "../util/util"

const flexItem = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

  margin: "20px 0",
}

export default function DetailsPage() {
  const router = useRouter()
  const { id } = router.query

  const { data, loading, error } = useQuery(INDIVIDUAL_STATEMENT, {
    variables: {
      id: id,
    },
  })

  if (loading) {
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
        <Box>
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

  if (error) return <p>{error}</p>

  const transDate = getDate(data?.getStatement.dateTime)

  return (
    <Box className={styles.home}>
      <Header />
      <Box className={styles.contentSection}>
        <Appbar />
        <Link href="/">
          <a>
            <IconButton aria-label="Back">
              <ArrowBackIcon /> Back
            </IconButton>
          </a>
        </Link>
        <Box sx={flexItem}>
          <h1 className={styles.h1}>Transaction Details</h1>
        </Box>

        <Box display="flex" justifyContent={"left"} my={5}>
          <Avatar
            className={
              data?.getStatement.mark === "C"
                ? styles.avatarGreen
                : styles.darkRed
            }
            sx={{ width: 100, height: 100, mr: 5 }}
          >
            {getAvatarLetter(data?.getStatement.partyBName)}
          </Avatar>

          <h2 className={styles.name}>{data?.getStatement.partyBName}</h2>
        </Box>
        <Box className={styles.flexItem}>
          <span className={styles.subHeader}>Transaction Type</span>
          <p
            className={
              data?.getStatement.mark === "C"
                ? styles.avatarGreenWord
                : styles.darkRedWord
            }
          >
            {data?.getStatement.mark === "C" ? "Credit" : "Debit"}
          </p>
        </Box>
        <Box className={styles.flexItem}>
          <span className={styles.subHeader}>Amount</span>
          <p>
            {priceSeparator(data?.getStatement.amount)}{" "}
            {data?.getStatement.currency}
          </p>
        </Box>
        <Box className={styles.flexItem}>
          <span className={styles.subHeader}>Account Number</span>
          <p>{data?.getStatement.partyBAccount}</p>
        </Box>
        <Box className={styles.flexItem}>
          <span className={styles.subHeader}>Date Time</span>
          <p>
            {transDate.dayName}, {transDate.day} {transDate.month}{" "}
            {transDate.year}
          </p>
        </Box>
        <Box className={styles.flexItem}>
          <span className={styles.subHeader}>Narrative</span>
          <p>{data?.getStatement.narrative}</p>
        </Box>
      </Box>
    </Box>
  )
}
