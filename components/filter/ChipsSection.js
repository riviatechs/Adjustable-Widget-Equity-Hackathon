import { Chip } from "@mui/material"
import { Box } from "@mui/system"
import React from "react"

import styles from "../../styles/components/ChipsSection.module.css"

function ChipsSection() {
  return (
    <Box>
      <Chip className={styles.chip} variant="outlined" label="Jan" />
      <Chip className={styles.chip} variant="outlined" label="Feb" />
      <Chip
        className={`${styles.chip} ${styles.active}`}
        variant="outlined"
        label="Recent"
      />
      <Chip className={styles.chip} variant="outlined" label="April" />
      <Chip className={styles.chip} variant="outlined" label="May" />
      <Chip className={styles.chip} variant="outlined" label="Money In" />
      <Chip className={styles.chip} variant="outlined" label="Money Out" />
    </Box>
  )
}

export default ChipsSection
