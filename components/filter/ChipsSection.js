import { Chip } from "@mui/material"
import { Box } from "@mui/system"
import React from "react"

import styles from "../../styles/components/ChipsSection.module.css"

function ChipsSection(props) {
  const showFilters = () => {
    props.onClickFilters()
  }
  return (
    <Box
      sx={{
        my: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Chip
        className={
          styles.chip +
          " " +
          (props.active === "active-1" ? styles.active : " ")
        }
        clickable
        variant="outlined"
        label="All"
      />
      <Chip
        clickable
        className={
          styles.chip +
          " " +
          (props.active === "active-2" ? styles.active : " ")
        }
        variant="outlined"
        label="Top Credit"
      />
      <Chip
        clickable
        className={
          styles.chip +
          " " +
          (props.active === "active-3" ? styles.active : " ")
        }
        variant="outlined"
        label="Money In"
      />
      <Chip
        clickable
        className={
          styles.chip +
          " " +
          (props.active === "active-4" ? styles.active : " ")
        }
        variant="outlined"
        label="Last Year"
      />
      <Chip
        clickable
        className={
          styles.chip +
          " " +
          (props.active === "active-5" ? styles.active : " ")
        }
        variant="outlined"
        label="Money Out"
      />
      <Chip
        className={
          styles.chip +
          " " +
          (props.active === "active-6" ? styles.active : " ")
        }
        clickable
        onClick={showFilters}
        variant="outlined"
        label="More Filters"
      />
    </Box>
  )
}

export default ChipsSection
