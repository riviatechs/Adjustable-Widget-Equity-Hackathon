import { DatePicker, DateRangePicker, LocalizationProvider } from "@mui/lab";
import { Box, styled, TextField } from "@mui/material";
import { useState } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

const MyTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#a42d2d",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#a42d2d",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#00000033",
      borderRadius: 50,
    },
    "&:hover fieldset": {
      borderColor: "#000000",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#a42d2d",
    },
  },
});

function PickDate() {
  const [value, setValue] = useState(null);
  const [value2, setValue2] = useState([null, null]);
  return (
    <Box sx={{ mt: 8, width: "100%" }}>
      <Box>
        <h2>Filter</h2>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "30%",
            justifyContent: "space-between",
          }}
        >
          <label>Date</label>
          <Box sx={{ pl: 5 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={value}
                onClose={() => {
                  console.log("choosen!!");
                }}
                cancelText="Back"
                label="Choose Date"
                todayText="Today Statements"
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => (
                  <MyTextField sx={{ width: 200 }} size="small" {...params} />
                )}
              />
            </LocalizationProvider>
          </Box>
        </Box>
        <Box
          sx={{ display: "flex", alignItems: "center", pl: 5, width: "60%" }}
        >
          <label>Period</label>
          <Box sx={{ pl: 5 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Box sx={{ pl: 2 }}>
                <DateRangePicker
                  startText="From"
                  endText="To"
                  value={value2}
                  onChange={(newValue) => {
                    setValue2(newValue);
                  }}
                  renderInput={(startProps, endProps) => (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <MyTextField
                        sx={{ width: 200 }}
                        size="small"
                        {...startProps}
                      />
                      <Box sx={{ mx: 2 }}> to </Box>
                      <MyTextField
                        sx={{ width: 200 }}
                        size="small"
                        {...endProps}
                      />
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
