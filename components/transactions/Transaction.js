import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function Transaction(props) {
  return (
    <Box sx={{ borderRadius: 5, my: 5 }}>
      <h3>Date</h3>
      <Paper sx={{ p: 5, borderRadius: 5, my: 5 }}>
        <p>content 1</p>
      </Paper>
      <Paper sx={{ p: 5, borderRadius: 5, my: 5 }}>
        <p>content 2</p>
      </Paper>
    </Box>
  );
}

export default Transaction;
