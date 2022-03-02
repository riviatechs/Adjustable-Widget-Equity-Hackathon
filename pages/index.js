import Header from "../components/Header";
import styles from "../styles/Home.module.css";

import TextField from "@mui/material/TextField";
import DatePicker from "@mui/lab/DatePicker";
import { useState } from "react";

export default function HomePage() {
  const [value, setValue] = useState(null);
  return (
    <div>
      <Header />
      <h1>Welcome to the home of champions</h1>
      <p>content</p>
      <button>Next page</button>
    </div>
  );
}
