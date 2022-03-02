import { Box } from "@mui/system";
import React from "react";
import PickDate from "../PickDate";
import AmountPicker from "./AmountPicker";
import ChipsSection from "./ChipsSection";

function Filter(props) {
  return (
    <Box sx={{ mt: 12, mb: 8 }}>
      <ChipsSection />
      <PickDate />
      <AmountPicker />
    </Box>
  );
}

export default Filter;
