import Header from "../components/Header";
import styles from "../styles/Home.module.css";

import { useState } from "react";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import TextField from "@mui/material/TextField";
import DatePicker from "@mui/lab/DatePicker";

import Appbar from "../components/Appbar";

export default function HomePage() {
  const [value, setValue] = useState(null);
  return (
    <div>
      <Header />
      <Appbar />
      <p>content</p>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Choose Date"
          value={value}
          onClose={() => {
            console.log("choosen!!");
          }}
          cancelText="Back"
          todayText="Today Statements"
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => (
            <TextField
              className={styles["date-picker-textfield"]}
              {...params}
            />
          )}
        />
      </LocalizationProvider>
      <button>Next page</button>
    </div>
  );
}
