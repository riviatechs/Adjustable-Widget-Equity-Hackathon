import * as React from "react"

import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import EventAvailableTwoToneIcon from "@mui/icons-material/EventAvailableTwoTone"
import FileDownloadTwoToneIcon from "@mui/icons-material/FileDownloadTwoTone"
import { styled, Box } from "@mui/system"
import Fade from "@mui/material/Fade"
import ModalUnstyled from "@mui/base/ModalUnstyled"
import Divider from "@mui/material/Divider"
import { Document, Page, pdfjs } from "react-pdf"

import { useLazyQuery } from "@apollo/client"
import { Button } from "@mui/material"

import styles from "../styles/components/Modal.module.css"

import Checkbox from "@mui/material/Checkbox"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank"
import CheckBoxIcon from "@mui/icons-material/CheckBox"
import { FILTER_EXPORT_QUERY } from "../queries/FILTER_EXPORT_QUERY"

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

async function downloadLink(name, uri) {
  // await fetch(uri).then((response) => {
  //   response.blob().then((blob) => {
  //     let url = window.URL.createObjectURL(blob)
  //     let a = document.createElement("a")
  //     a.href = url
  //     a.download = `${name}`
  //     a.click()
  //   })
  // })

  const resp = await fetch(uri)
  const blob = await resp.blob()
  let url = window.URL.createObjectURL(blob)
  let a = document.createElement("a")
  a.href = url
  a.download = `${name}`
  a.click()
}

function ExportModal(props) {
  const fieldOptions = [
    "Date",
    "Name",
    "Account Number",
    "Debit/Credit",
    "Amount",
    "Description",
  ]

  const exportOptions = ["csv", "pdf"]

  const [fields, setFields] = React.useState(fieldOptions)
  const [newFields, setNewFields] = React.useState([])
  const [types, setTypes] = React.useState(exportOptions)
  const [newTypes, setNewTypes] = React.useState([])

  const [loadCSVDownload, setLoadCSVDownload] = React.useState(false)
  const [CSVDownload, setCSVDownload] = React.useState(false)

  const [loadPDFDownload, setLoadPDFDownload] = React.useState(false)
  const [links, setLinks] = React.useState("")
  const [downloadPDFURL, setDownloadPDFURL] = React.useState("")

  const [sendData, { loading, error, data }] = useLazyQuery(FILTER_EXPORT_QUERY)

  // if (loading) {
  //   return <p>loading!!</p>
  // }

  const [downloadData, setDownloadData] = React.useState(data)

  React.useEffect(() => {
    setDownloadData(data)
    console.log("Refreshed!!")
  }, [data])

  // React.useEffect(() => {
  //   setDownloadData(data)
  //   if (typeof downloadData !== "undefined" && loadCSVDownload) {
  //     setTimeout(() => {
  //       console.log("CSV Download accessed!", downloadData.download)
  //       downloadLink("bank_statements.csv", downloadData.download)
  //       setLoadCSVDownload(false)
  //       // setDownloadData("")
  //     }, 3000)
  //   }

  // return () => {

  // }
  // }, [downloadData, data, loadCSVDownload])

  // React.useEffect(() => {
  //   if (typeof data !== "undefined" && downloadPDFURL) {
  //     setTimeout(() => {
  //       console.log("PDF Download accessed!", data.download)
  //       setLinks(data.download)
  //       downloadLink("bank_statements.pdf", downloadPDFURL)
  //     }, 3000)
  //   }

  //   return () => {
  //     setLoadPDFDownload(false)
  //   }
  // }, [data, downloadPDFURL])

  if (error) console.log(error)

  const onSelectFieldsHandler = (event, value, reason) => {
    setNewFields(value)
  }

  const onSelectTypesHandler = (event, value, reason) => {
    setNewTypes(value)
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    const sends = [...new Set(newFields)]

    console.log(sends, newTypes)

    const fieldsToSend = sends.map((field) => {
      let fd = ""
      if (field === "Date") {
        fd = "date"
      }
      if (field === "Amount") {
        fd = "amount"
      }
      if (field === "Debit/Credit") {
        fd = "tt"
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

    console.log(fieldsToSend, newTypes)

    fieldsToSend.forEach((element) => {
      Object.assign(obj, element)
    })

    console.log(obj)

    sendData({
      variables: {
        input: {
          fields: obj,
          downLoadType: types[0],
        },
      },
    })

    if (newTypes === "csv") {
      setLoadCSVDownload(true)
      if (typeof downloadData === "undefined") {
        console.log("Failed to load data try again!")
      }
    } else if (newTypes === "pdf") {
      pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

      async function handleSubmit() {
        const resp = await fetch("/api/doc/", {
          method: "GET",
        })

        const file = await resp.json()
        const bearer = file.access_token
        const clientID = file.client_id

        const id = data?.download
        const pollURL = `https://cpf-ue1.adobe.io/ops/id/${id}`
        const authorization = `Bearer ${bearer}`

        const resp2 = await fetch(pollURL, {
          method: "GET",
          headers: {
            "x-api-key": clientID,
            Authorization: authorization,
          },
        })

        const blob = await resp2.blob()

        const newBlob = new Blob([blob], { type: "application/pdf" })
        const newFileURL = URL.createObjectURL(newBlob)

        setDownloadPDFURL(newFileURL)

        setLoadPDFDownload(true)
        if (typeof data !== "undefined") {
          console.log("Failed to load data try again!")
        }
      }

      handleSubmit()

      // setDownload(true)
      // setLoadDownload(true)
    }

    // setNewFields([])
    // setNewTypes("")
  }

  const resetDownload = async () => {
    setLoadCSVDownload(false)
    await downloadLink("bank_statements.csv", downloadData?.download)
    setDownloadData(null)
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
                <h2>Export Statements</h2>
                <form onSubmit={onSubmitHandler}>
                  <div className={styles.inputSelect}>
                    <label className={styles.label}>Choose Fields</label>
                    <Autocomplete
                      multiple
                      options={fields}
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
                      options={types}
                      getOptionLabel={(option) => option}
                      onChange={onSelectTypesHandler}
                      // value={newTypes}
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
                  {loading ? (
                    <span>Exporting...</span>
                  ) : (
                    downloadData?.download && loadCSVDownload && resetDownload()
                  )}
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
