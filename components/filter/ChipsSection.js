import { Chip } from "@mui/material"
import { Box } from "@mui/system"
import React, { useState } from "react"

import styles from "../../styles/components/ChipsSection.module.css"

function ChipsSection(props) {
  const [active, setActive] = useState(props.active)

  // Execute when one clicks on more filters button
  const showMoreFilters = () => {
    props.onClickFilters()
    setActive("active-6")
  }
  return (
    <Box className={styles.chips}>
      <Chip
        className={
          styles.chip + " " + (active === "active-1" ? styles.active : " ")
        }
        clickable
        variant="outlined"
        label="All"
      />
      <Chip
        clickable
        className={
          styles.chip + " " + (active === "active-2" ? styles.active : " ")
        }
        variant="outlined"
        label="Top Credit"
      />
      <Chip
        clickable
        className={
          styles.chip + " " + (active === "active-3" ? styles.active : " ")
        }
        variant="outlined"
        label="Money In"
      />
      <Chip
        clickable
        className={
          styles.chip + " " + (active === "active-4" ? styles.active : " ")
        }
        variant="outlined"
        label="Last Year"
      />
      <Chip
        clickable
        className={
          styles.chip + " " + (active === "active-5" ? styles.active : " ")
        }
        variant="outlined"
        label="Money Out"
      />
      <Chip
        className={
          styles.chip + " " + (active === "active-6" ? styles.active : " ")
        }
        clickable
        onClick={showMoreFilters}
        variant="outlined"
        label="More Filters"
      />
    </Box>
  )
}

export default ChipsSection
