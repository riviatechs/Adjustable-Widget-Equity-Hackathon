import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { priceSeparator } from "../../util/util";

function Transaction(props) {
  const transData = props.data;
  const amount = priceSeparator(transData.amount);
  return (
    <Box sx={{ borderRadius: 5, my: 5 }}>
      <Paper sx={{ p: 5, borderRadius: 5, my: 5 }}>
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
            sx={{ display: "flex", justifyContent: "space-between" }}
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

        <p>
          info{" "}
          {transData.iao === null ? (
            <label className="null-data">null</label>
          ) : (
            transData.iao
          )}
        </p>
      </Paper>
    </Box>
  );
}

export default Transaction;
