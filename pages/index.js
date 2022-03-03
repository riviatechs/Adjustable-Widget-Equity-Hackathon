import Header from "../components/Header"
import styles from "../styles/Home.module.css"
import Appbar from "../components/Appbar"
import { Box, Divider, Paper } from "@mui/material"
import Transactions from "../components/transactions/Transactions"
import Filter from "../components/filter/Filter"

export default function HomePage() {
  return (
    <Box className={styles.home}>
      <Header />
      <Appbar />
      <Filter />
      <Divider />
      <Transactions />
    </Box>
  )
}
