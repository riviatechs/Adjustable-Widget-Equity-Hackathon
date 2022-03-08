import * as React from "react"
import Box from "@mui/material/Box"
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import IosShareIcon from "@mui/icons-material/IosShare"
import LightModeIcon from "@mui/icons-material/LightMode"
import Image from "next/image"
import logo from "../public/logo.png"

import styles from "../styles/components/Appbar.module.css"

export default function Appbar(props) {
  return (
    <div>
      <Box>
        <AppBar
          position="fixed"
          elevation={props.scroll > 10 ? 1 : 0}
          className={styles.appbar}
        >
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex" } }}
              className={styles.logo}
            >
              <Image src={logo} alt="logo" height={40} width={61} />
            </Typography>
            <IconButton className={styles.iconButton}>
              <IosShareIcon />
            </IconButton>
            <IconButton className={styles.iconButton}>
              <LightModeIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
}
