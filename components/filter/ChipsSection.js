import { Chip } from "@mui/material"
import { Box } from "@mui/system"
import React, { useState } from "react"

import styles from "../../styles/components/ChipsSection.module.css"

function ChipsSection(props) {
  const [newActive, setNewActive] = useState(props.active)

  // Execute when one clicks choose filter
  const allFilter = () => {
    setNewActive("active-1")
    props.onClickFilters("active-1")
  }

  const recentFilter = () => {
    setNewActive("active-2")
    props.onClickFilters("active-2")
  }

  const moneyInFilter = () => {
    setNewActive("active-3")
    props.onClickFilters("active-3")
  }

  const moneyOutFilter = () => {
    setNewActive("active-5")
    props.onClickFilters("active-5")
  }

  return (
    <Box className={styles.chips}>
      <Chip
        className={
          styles.chip + " " + (newActive === "active-1" ? styles.active : " ")
        }
        clickable
        variant="outlined"
        label="All"
        onClick={allFilter}
      />
      <Chip
        clickable
        className={
          styles.chip + " " + (newActive === "active-2" ? styles.active : " ")
        }
        variant="outlined"
        onClick={recentFilter}
        label="Recent"
      />
      <Chip
        clickable
        className={
          styles.chip + " " + (newActive === "active-3" ? styles.active : " ")
        }
        variant="outlined"
        onClick={moneyInFilter}
        label="Money In"
      />
      <Chip
        clickable
        className={
          styles.chip + " " + (newActive === "active-5" ? styles.active : " ")
        }
        variant="outlined"
        label="Money Out"
        onClick={moneyOutFilter}
      />
    </Box>
  )
}

export default ChipsSection
