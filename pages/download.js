import { Button } from "@mui/material"
import { useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"

export default function DownloadPage() {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

  const [data, setData] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()

    const resp = await fetch("api/doc/", {
      method: "GET",
    })

    const file = await resp.json()

    const bearer = file.access_token
    const clientID = file.client_id

    const id = "DVrSm43PUBdB0voadIab6yHeEBG63zZA"
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
    setData(newFileURL)

    window.open(newFileURL)
  }

  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
    setPageNumber(1)
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset)
  }

  function previousPage() {
    changePage(-1)
  }

  function nextPage() {
    changePage(1)
  }

  function onDocumentLoadError(err) {
    console.log(err)
  }
  return (
    <div>
      <form>
        <input type="submit" value="Submit" onClick={handleSubmit} />
      </form>

      <div>
        <Document
          file={data}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div>
    </div>
  )
}
