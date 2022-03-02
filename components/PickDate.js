import { DatePicker, DateRangePicker, LocalizationProvider } from "@mui/lab";
import { Box, TextField } from "@mui/material";
import { useState } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

function PickDate() {
  const [value, setValue] = useState(null);
  const [value2, setValue2] = useState([null, null]);
  return (
    <Box sx={{ py: 2 }}>
      <Box>
        <h2>Filter</h2>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <label>Date</label>
          <Box sx={{ pl: 5 }}>
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
                renderInput={(params) => <TextField size="small" {...params} />}
              />
            </LocalizationProvider>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", pl: 5 }}>
          <label>Period</label>
          <Box sx={{ pl: 5 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Box sx={{ pl: 5 }}>
                <DateRangePicker
                  startText="From"
                  endText="To"
                  value={value2}
                  onChange={(newValue) => {
                    setValue2(newValue);
                  }}
                  renderInput={(startProps, endProps) => (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <TextField size="small" {...startProps} />
                      <Box sx={{ mx: 2 }}> to </Box>
                      <TextField size="small" {...endProps} />
                    </Box>
                  )}
                />
              </Box>
            </LocalizationProvider>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default PickDate;
