import { Avatar, Paper } from "@mui/material"
import { Box } from "@mui/system"
import React from "react"
import { priceSeparator } from "../../util/util"

function Transaction(props) {
  const transData = props.data
  const amount = priceSeparator(transData.amount)
  return (
    <Box sx={{ borderRadius: 5, my: 5 }}>
      <Paper
        sx={{
          p: 5,
          borderRadius: 5,
          my: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Avatar
          sx={
            transData.mark === "C"
              ? { color: "green", p: 5, background: "#68ab6a32" }
              : { color: "#a42d2d", p: 5, background: "#a42d2d32" }
          }
        >
          {transData.refAsi.slice(0, 2)}
        </Avatar>
        <Box width={"85%"}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3>{transData.refAsi}</h3>
            <Box
              color={transData.mark === "C" ? "green" : " darkred"}
              sx={{
                display: "flex",
                fontWeight: "bold",
                justifyContent: "space-between",
              }}
            >
              <p>
                Ksh{" "}
                <span>
                  {transData.mark === "C" ? "+" : "-"} {amount}
                </span>
              </p>
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <p>ttic {transData.ttic}</p>
            <p>
              Reference Owner{" "}
              {transData.refOwner === null ? (
                <label className="null-data">null</label>
              ) : (
                transData.refOwner
              )}
            </p>
          </Box>

          <Box>
            <p>
              info{" "}
              {transData.iao === null ? (
                <label className="null-data">null</label>
              ) : (
                transData.iao
              )}
            </p>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

export default Transaction
