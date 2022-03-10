import React from "react"

import { Avatar, Paper } from "@mui/material"
import { Box } from "@mui/system"

import {
  extractTimeFromDate,
  getAvatarLetter,
  priceSeparator,
} from "../../util/util"

import styles from "../../styles/components/Transaction.module.css"

// CSS logic functions
// Avatar Background
const pickAvatarStyle = (mark) => {
  return (
    styles.avatar +
    " " +
    (mark === "C" ? styles.creditAmout : styles.debitAmount)
  )
}

// Avatar text
const PickAmountColorStyle = (mark) => {
  return (
    styles.amount +
    " " +
    (mark === "C" ? styles.amountSuccess : styles.amountCaution)
  )
}

// Credit / Debit Mark
const addSign = (mark) => {
  return mark === "C" ? "+" : "-"
}

// Main Component
export default function Transaction(props) {
  const transData = props.data
  // const amount = transData.amount
  const amount = priceSeparator(transData.amount)

  return (
    <Box className={styles.transactionBox}>
      <Paper elevation={1} className={styles.transaction}>
        <Avatar className={pickAvatarStyle(transData.mark)}>
          {getAvatarLetter(transData.partyBName)}
        </Avatar>

        <Box className={styles.transactionStatement}>
          <Box className={styles.statementUpper}>
            <Box className={styles.partyBName}>{transData.partyBName}</Box>

            <Box className={PickAmountColorStyle(transData.mark)}>
              <Box>
                <span>
                  {addSign(transData.mark)}
                  {amount}
                </span>{" "}
                {transData.currency}
              </Box>
            </Box>
          </Box>

          <Box className={styles.statementLower}>
            <Box className={styles.partAAccount}>{transData.partyBAccount}</Box>

            <Box className={styles.dateTime}>
              {extractTimeFromDate(transData.dateTime)}
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}
