import Header from "../components/Header";
import styles from "../styles/Home.module.css";
import Appbar from "../components/Appbar";
import PickDate from "../components/PickDate";
import { Box, Paper } from "@mui/material";

export default function HomePage() {
  return (
    <Box sx={{ mt: 10, mx: 15 }}>
      <Header />
      <Appbar
        sx={{
          px: 6,
          background: "#ffffff",
        }}
      />
      <PickDate />
      <Paper sx={{ p: 5, borderRadius: 5, my: 5 }}>
        <p>content</p>
      </Paper>
      <button>Next page</button>
    </Box>
  );
}
