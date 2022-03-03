import * as React from "react"
import Box from "@mui/material/Box"
import SwipeableDrawer from "@mui/material/SwipeableDrawer"
import MenuIcon from "@mui/icons-material/Menu"
import List from "@mui/material/List"
import Divider from "@mui/material/Divider"
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import InboxIcon from "@mui/icons-material/MoveToInbox"
import MailIcon from "@mui/icons-material/Mail"
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import IosShareIcon from "@mui/icons-material/IosShare"
import LightModeIcon from "@mui/icons-material/LightMode"
import Image from "next/image"
import logo from "../public/logo.png"

import styles from "../styles/components/Appbar.module.css"

export default function Appbar(props) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  })

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return
    }

    setState({ ...state, [anchor]: open })
  }

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <div>
      <Box>
        <AppBar position="fixed" elevation={0} className={styles.appbar}>
          <Toolbar>
            <IconButton
              className={styles.iconButton}
              aria-label="open drawer"
              onClick={toggleDrawer("left", true)}
              edge="start"
              sx={{ display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "block" } }}
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

        <SwipeableDrawer
          anchor="left"
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
          onOpen={toggleDrawer("left", true)}
        >
          {list("anchor")}
        </SwipeableDrawer>
      </Box>
    </div>
  )
}
