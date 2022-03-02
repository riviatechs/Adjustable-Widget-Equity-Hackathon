import { Box } from "@mui/system";
import React from "react";
import PickDate from "../PickDate";
import ChipsSection from "./ChipsSection";

function Filter(props) {
  return (
    <Box sx={{ pt: 5 }}>
      <ChipsSection />
      <PickDate />
    </Box>
  );
}

export default Filter;
