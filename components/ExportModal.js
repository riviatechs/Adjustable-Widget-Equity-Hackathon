import * as React from "react"

import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import EventAvailableTwoToneIcon from "@mui/icons-material/EventAvailableTwoTone"
import FileDownloadTwoToneIcon from "@mui/icons-material/FileDownloadTwoTone"
import { styled, Box } from "@mui/system"
import Fade from "@mui/material/Fade"
import ModalUnstyled from "@mui/base/ModalUnstyled"
import Divider from "@mui/material/Divider"

import SelectUnstyled, { selectUnstyledClasses } from "@mui/base/SelectUnstyled"
import OptionUnstyled, { optionUnstyledClasses } from "@mui/base/OptionUnstyled"
import PopperUnstyled from "@mui/base/PopperUnstyled"

import { useLazyQuery, useMutation, useQuery } from "@apollo/client"
import { Alert, Button } from "@mui/material"

import styles from "../styles/components/Modal.module.css"

import Checkbox from "@mui/material/Checkbox"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank"
import CheckBoxIcon from "@mui/icons-material/CheckBox"
import { FILTER_EXPORT_QUERY } from "../queries/FILTER_EXPORT_QUERY"
import Link from "next/link"

import { csv } from "d3-request"

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon sx={{ color: "#a42d2d" }} fontSize="small" />

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.9);
  -webkit-tap-highlight-color: transparent;
`

const style = {
  width: 780,
  height: "fit-content",
  minHeight: 450,
  bgcolor: "white",
  position: "relative",
  boxShadow: 24,
  borderRadius: 5,
  "@media only screen and (max-width: 600px)": {
    width: "100%",
  },
}

const MyTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#a42d2d",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#a42d2d",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#00000033",
      borderRadius: 30,
      padding: "20px",
    },
    "&:hover fieldset": {
      borderColor: "#000000",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#a42d2d",
    },
  },
})

function ExportModal(props) {
  const fieldOptions = [
    "Date",
    "Name",
    "Account Number",
    "Amount",
    "Description",
  ]

  const exportOptions = ["csv", "pdf", "text", "xls"]

  const [fields, setFields] = React.useState([])
  const [type, setType] = React.useState(null)
  const [link, setLink] = React.useState("")

  const [sendData, { loading, error, data }] = useLazyQuery(FILTER_EXPORT_QUERY)

  // if (loading) return null
  if (error) return `Error! ${error}`

  const onSelectFieldsHandler = (e) => {
    if (e.target.textContent !== "") {
      setFields((prev) => [...prev, e.target.textContent])
    }
  }

  const onSelectTypesHandler = (e) => {
    setType(e.target.textContent)
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    const sends = [...new Set(fields)]

    const fieldsToSend = sends.map((field) => {
      let fd = ""
      if (field === "Date") {
        fd = "date"
      }
      if (field === "Amount") {
        fd = "amount"
      }
      if (field === "Account Number") {
        fd = "accountNumber"
      }
      if (field === "Name") {
        fd = "accountName"
      }
      if (field === "Description") {
        fd = "narrative"
      }
      return { [fd]: "Available" }
    })

    let obj = {}

    fieldsToSend.forEach((element) => {
      Object.assign(obj, element)
    })

    sendData({
      variables: {
        input: {
          fields: obj,
          downLoadType: type,
        },
      },
    })

    console.log(data)
    if (data?.download !== null) download("Statements", data?.download)

    setFields([])
  }

  return (
    <div>
      <StyledModal
        open={props.open}
        onClose={props.onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 2500,
        }}
      >
        <Fade in={props.open}>
          <Box sx={style}>
            <Box className={styles.closeButtonBox}>
              <CloseRoundedIcon
                className={styles.closeButton}
                onClick={props.onClose}
              />
            </Box>

            <div className={styles.contents}>
              <div className={styles.leftSide}>
                <FileDownloadTwoToneIcon
                  sx={{ width: 200, height: 200, color: "#a42d2d" }}
                />
                <h2 className={styles.h2}>Export Statements</h2>
              </div>

              <Divider className={styles.hr} orientation="vertical" flexItem />

              <div className={styles.rightSide}>
                <h2>Export</h2>
                <form onSubmit={onSubmitHandler}>
                  <div className={styles.inputSelect}>
                    <label className={styles.label}>Choose Fields</label>
                    <Autocomplete
                      multiple
                      options={fieldOptions}
                      disableCloseOnSelect
                      onChange={onSelectFieldsHandler}
                      getOptionLabel={(option) => option}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option}
                        </li>
                      )}
                      style={{ width: 350 }}
                      renderInput={(params) => (
                        <MyTextField
                          size="small"
                          {...params}
                          placeholder="Select Fields"
                        />
                      )}
                    />
                  </div>
                  <div className={styles.inputSelect}>
                    <label className={styles.label}>Export Format</label>
                    <Autocomplete
                      options={exportOptions}
                      getOptionLabel={(option) => option}
                      onChange={onSelectTypesHandler}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option}
                        </li>
                      )}
                      style={{ width: 350 }}
                      renderInput={(params) => (
                        <MyTextField
                          size="small"
                          {...params}
                          placeholder="Export as"
                        />
                      )}
                    />
                  </div>

                  <Button type="submit" className="button1">
                    Export
                  </Button>
                  {loading ? <p>Exporting...</p> : ""}
                </form>
              </div>
            </div>
          </Box>
        </Fade>
      </StyledModal>
    </div>
  )
}

export default ExportModal

function download(name, uri) {
  fetch(uri).then((response) => {
    response.blob().then((blob) => {
      let url = window.URL.createObjectURL(blob)
      let a = document.createElement("a")
      a.href = url
      a.download = `${name}.csv`
      a.click()
    })
    //window.location.href = response.url;
  })
}
