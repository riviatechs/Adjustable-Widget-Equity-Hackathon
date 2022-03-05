import { Avatar, Paper } from "@mui/material"
import { Box } from "@mui/system"
import React from "react"
import { priceSeparator } from "../../util/util"

import styles from "../../styles/components/Transaction.module.css"

const creditAmout = { color: "green", background: "#68ab6a32" }

const debitAmount = { color: "#a42d2d", background: "#a42d2d32" }

const displayFlex = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}

function Transaction(props) {
  const transData = props.data
  // const amount = transData.amount
  const amount = priceSeparator(transData.amount)
  return (
    <Box className={styles.transactionBox}>
      <Paper elevation={1} className={styles.transaction}>
        <Avatar
          className={styles.avatar}
          sx={transData.mark === "C" ? creditAmout : debitAmount}
        >
          {transData.partyBName.slice(0, 2)}
        </Avatar>
        <Box className={styles.transactionStatement}>
          <Box sx={{ ...displayFlex, py: 2 }}>
            <Box sx={{ fontWeight: "bold" }}>{transData.partyBName}</Box>
            <Box
              color={transData.mark === "C" ? "green" : " darkred"}
              sx={{
                display: "flex",
                fontWeight: "bold",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <span>
                  {transData.mark === "C" ? "+" : "-"}
                  {amount}
                </span>{" "}
                {transData.currency}
              </Box>
            </Box>
          </Box>

          <Box sx={{ ...displayFlex, py: 2, color: "#616161" }}>
            <Box>
              {transData.partAAccount === null ? (
                <label className="null-data">Not Entered</label>
              ) : (
                transData.partAAccount
              )}
            </Box>
            <Box>{new Date(transData.dateTime).toLocaleTimeString()}</Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

export default Transaction
