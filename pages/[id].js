import Header from "../components/Header"
import Appbar from "../components/Appbar"
import { Box, Button } from "@mui/material"
import FileDownloadIcon from "@mui/icons-material/FileDownload"
import Filter from "../components/filter/Filter"
import { useState } from "react"
import ExportModal from "../components/ExportModal"

import styles from "../styles/components/TransactionDetails.module.css"

export default function DetailsPage() {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Box className={styles.home}>
      <Header />
      <ExportModal open={open} onClose={handleClose} />

      <Box className={styles.contentSection}>
        <Appbar />
        <h1 className={styles.h1}>Transaction Details</h1>
        The details
      </Box>

      <Button onClick={handleOpen} className={`button2 ${styles.exportButton}`}>
        <FileDownloadIcon />
        <span className={styles.exportSpan}>Export Statements</span>
      </Button>
    </Box>
  )
}
