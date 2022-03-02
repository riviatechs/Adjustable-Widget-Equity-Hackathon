import { Box } from "@mui/system";
import React from "react";
import Transaction from "./Transaction";

function Transactions(props) {
  return (
    <Box sx={{ py: 10 }}>
      <h2>Transactions</h2>
      <Transaction />
      <Transaction />
      <Transaction />
    </Box>
  );
}

export default Transactions;
