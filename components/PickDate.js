import { DatePicker, LocalizationProvider } from "@mui/lab";
import { Box, TextField } from "@mui/material";
import { useState } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

function PickDate() {
  const [value, setValue] = useState(null);
  return (
    <Box>
      <label>Filter</label>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          value={value}
          onClose={() => {
            console.log("choosen!!");
          }}
          cancelText="Back"
          todayText="Today Statements"
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </Box>
  );
}

export default PickDate;
