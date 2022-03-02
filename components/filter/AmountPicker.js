import { Autocomplete, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function AmountPicker(props) {
  const amounts = [10000, 20000, 400000, 80000];
  return (
    <Box
      sx={{
        display: "flex",
        width: "30%",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <label>Amount</label>
      <Autocomplete
        options={amounts}
        sx={{ width: 200 }}
        size={"small"}
        renderInput={(params) => <TextField {...params} />}
      />
    </Box>
  );
}

export default AmountPicker;
