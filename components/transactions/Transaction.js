import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function Transaction(props) {
  const transData = props.data;
  return (
    <Box sx={{ borderRadius: 5, my: 5 }}>
      <Paper sx={{ p: 5, borderRadius: 5, my: 5 }}>
        <p>Amount {transData.amount}</p>
        <p>
          Reference Owner{" "}
          {transData.refOwner === null ? (
            <label className="null-data">null</label>
          ) : (
            transData.refOwner
          )}
        </p>
        <p>
          Reference Asi{" "}
          {transData.refAsi === null ? (
            <label className="null-data">null</label>
          ) : (
            transData.refAsi
          )}
        </p>
        <p>ttic {transData.ttic}</p>
        <p>
          info{" "}
          {transData.iao === null ? (
            <label className="null-data">null</label>
          ) : (
            transData.iao
          )}
        </p>
        <p>Type {transData.mark === "C" ? "Credit" : "Debit"}</p>
      </Paper>
    </Box>
  );
}

export default Transaction;
