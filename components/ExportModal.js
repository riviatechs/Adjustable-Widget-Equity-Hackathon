import * as React from "react"

import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import FileDownloadTwoToneIcon from "@mui/icons-material/FileDownloadTwoTone"
import { styled, Box } from "@mui/system"
import Fade from "@mui/material/Fade"
import ModalUnstyled from "@mui/base/ModalUnstyled"
import Divider from "@mui/material/Divider"
import { pdfjs } from "react-pdf"
import ClipLoader from "react-spinners/ClipLoader"

import { useLazyQuery } from "@apollo/client"
import { Button } from "@mui/material"

import styles from "../styles/components/Modal.module.css"

import Checkbox from "@mui/material/Checkbox"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank"
import CheckBoxIcon from "@mui/icons-material/CheckBox"
import { FILTER_EXPORT_QUERY } from "../queries/FILTER_EXPORT_QUERY"

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

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
  "@media only screen and (max-width: 768px)": {
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
  const resp = await fetch(uri)
  const blob = await resp.blob()
  const newBlob = new Blob([blob], { type: "text/csv;charset=utf-8" })
  let url = URL.createObjectURL(newBlob)
  let a = document.createElement("a")
  a.href = url
  a.download = `${name}`
  document.body.appendChild(a)
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
  const [loadPDFDownload, setLoadPDFDownload] = React.useState(false)

  const [sendDataCSV, { loading: CSVloading, error: CSVError, data: CSVData }] =
    useLazyQuery(FILTER_EXPORT_QUERY)
  const [sendDataPDF, { loading: PDFloading, error: PDFError, data: PDFData }] =
    useLazyQuery(FILTER_EXPORT_QUERY)

  const [loadingPDFFromServer, setLoadingPDFFromServer] = React.useState(false)

  const [downloadPDFData, setDownloadPDFData] = React.useState(null)
  const [downloadCSVData, setDownloadCSVData] = React.useState(null)

  const [amountRange, setAmount] = React.useState(props.amountToFilter)
  const [transactionType, setTransactionType] = React.useState(props.tt)
  const [dateRange, setDateRange] = React.useState(props.dateRange)
  const [date, setDate] = React.useState(props.date)
  const [errorValue, setErrorValue] = React.useState(null)

  React.useEffect(() => {
    setAmount(props.amountToFilter)
    setTransactionType(props.tt)
    setDateRange(props.dateRange)
    setDate(props.date)
  }, [props.amountToFilter, props.tt, props.dateRange, props.date])

  React.useEffect(() => {
    setDownloadPDFData(PDFData)
  }, [PDFData])

  React.useEffect(() => {
    setDownloadCSVData(CSVData)
  }, [CSVData])

  if (PDFError) console.log(PDFError)
  if (CSVError) console.log(CSVError)

  const onSelectFieldsHandler = (event, value, reason) => {
    setNewFields(value)
  }

  const onSelectTypesHandler = (event, value, reason) => {
    setNewTypes(value)
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()

    if (newFields.length === 0 || newTypes.length === 0) {
      setErrorValue(
        <Box sx={{ color: "darkred", my: 2, textAlign: "center" }}>
          Error!! Fill all fields!
        </Box>
      )
    } else {
      const sends = [...new Set(newFields)]

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

      fieldsToSend.forEach((element) => {
        Object.assign(obj, element)
      })

      if (newTypes === "csv") {
        setLoadCSVDownload(true)
        if (transactionType === "ALL") {
          if (date === "NONE" || Array.isArray(date)) {
            sendDataCSV({
              variables: {
                input: {
                  fields: obj,
                  downLoadType: newTypes,
                  filters: {
                    amountRange: {
                      lower: amountRange[0].toString(),
                      upper: amountRange[1].toString(),
                    },
                    period: {
                      start: dateRange[0],
                      end: dateRange[1],
                    },
                  },
                },
              },
            })
          } else {
            sendDataCSV({
              variables: {
                input: {
                  fields: obj,
                  downLoadType: newTypes,
                  filters: {
                    amountRange: {
                      lower: amountRange[0].toString(),
                      upper: amountRange[1].toString(),
                    },
                    period: {
                      date: date,
                    },
                  },
                },
              },
            })
          }
        } else {
          if (date === "NONE" || Array.isArray(date)) {
            sendDataCSV({
              variables: {
                input: {
                  fields: obj,
                  downLoadType: newTypes,
                  filters: {
                    amountRange: {
                      lower: amountRange[0].toString(),
                      upper: amountRange[1].toString(),
                    },
                    period: {
                      start: dateRange[0],
                      end: dateRange[1],
                    },
                    tt: transactionType,
                  },
                },
              },
            })
          } else {
            sendDataCSV({
              variables: {
                input: {
                  fields: obj,
                  downLoadType: newTypes,
                  filters: {
                    amountRange: {
                      lower: amountRange[0].toString(),
                      upper: amountRange[1].toString(),
                    },
                    period: {
                      date: date,
                    },
                    tt: transactionType,
                  },
                },
              },
            })
          }
        }
      } else if (newTypes === "pdf") {
        setLoadPDFDownload(true)
        if (transactionType === "ALL") {
          if (date === "NONE" || Array.isArray(date)) {
            sendDataPDF({
              variables: {
                input: {
                  fields: obj,
                  downLoadType: newTypes,
                  filters: {
                    amountRange: {
                      lower: amountRange[0].toString(),
                      upper: amountRange[1].toString(),
                    },
                    period: {
                      start: dateRange[0],
                      end: dateRange[1],
                    },
                  },
                },
              },
            })
          } else {
            sendDataPDF({
              variables: {
                input: {
                  fields: obj,
                  downLoadType: newTypes,
                  filters: {
                    amountRange: {
                      lower: amountRange[0].toString(),
                      upper: amountRange[1].toString(),
                    },
                    period: {
                      date: date,
                    },
                  },
                },
              },
            })
          }
        } else {
          if (date === "NONE" || Array.isArray(date)) {
            sendDataPDF({
              variables: {
                input: {
                  fields: obj,
                  downLoadType: newTypes,
                  filters: {
                    amountRange: {
                      lower: amountRange[0].toString(),
                      upper: amountRange[1].toString(),
                    },
                    period: {
                      start: dateRange[0],
                      end: dateRange[1],
                    },
                    tt: transactionType,
                  },
                },
              },
            })
          } else {
            sendDataPDF({
              variables: {
                input: {
                  fields: obj,
                  downLoadType: newTypes,
                  filters: {
                    amountRange: {
                      lower: amountRange[0].toString(),
                      upper: amountRange[1].toString(),
                    },
                    period: {
                      date: date,
                    },
                    tt: transactionType,
                  },
                },
              },
            })
          }
        }
      }

      setErrorValue(null)
    }
  }

  async function handleSubmit(docID) {
    setLoadingPDFFromServer(true)
    const resp = await fetch("api/doc/", {
      method: "GET",
    })

    const file = await resp.json()

    const bearer = file.access_token
    const clientID = file.client_id

    const pollURL = `https://cpf-ue1.adobe.io/ops/id/${docID}`
    const authorization = `Bearer ${bearer}`

    let status
    let resp2
    while (status !== 200) {
      resp2 = await fetch(pollURL, {
        method: "GET",
        headers: {
          "x-api-key": clientID,
          Authorization: authorization,
        },
      })

      status = resp2.status
    }

    const blob = await resp2.blob()

    const newBlob = new Blob([blob], { type: "application/pdf" })
    const newFileURL = URL.createObjectURL(newBlob)

    let a = document.createElement("a")
    a.href = newFileURL
    a.download = "statements.pdf"
    a.click()

    setLoadingPDFFromServer(false)
    console.log("download successful!!")
  }

  const resetCSVDownload = async () => {
    setLoadCSVDownload(false)
    await downloadLink("bank_statements.csv", downloadCSVData?.download)
    setDownloadCSVData(null)
  }

  const resetPDFDownload = async () => {
    setLoadPDFDownload(false)
    await handleSubmit(downloadPDFData?.download)
    setDownloadPDFData(null)
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
                <Box display={{ lg: "none" }}>
                  <h2>Export Statements</h2>
                </Box>
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

                  {errorValue}

                  <div className={styles.button}>
                    <Button type="submit" className="button1 export">
                      Export
                    </Button>
                    {CSVloading || loadingPDFFromServer ? (
                      <span className="loader">
                        <ClipLoader />
                      </span>
                    ) : (
                      downloadCSVData?.download &&
                      loadCSVDownload &&
                      resetCSVDownload()
                    )}
                    {downloadPDFData?.download &&
                      loadPDFDownload &&
                      resetPDFDownload() &&
                      !PDFloading}
                  </div>
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
