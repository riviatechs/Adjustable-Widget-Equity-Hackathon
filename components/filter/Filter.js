import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Box } from "@mui/system";
import React from "react";
import PickDate from "../PickDate";
import AmountPicker from "./AmountPicker";
import ChipsSection from "./ChipsSection";

function Filter(props) {
  return (
    <Box sx={{ mt: 12, mb: 5 }}>
      <ChipsSection />
      <PickDate />
      <AmountPicker />
      <Box sx={{ my: 5, fontSize: "inherit" }}>
        <button>
          Filter
          <FilterAltIcon color="white" />
        </button>
      </Box>
    </Box>
  );
}

export default Filter;
