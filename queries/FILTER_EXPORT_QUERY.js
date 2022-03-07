import { gql } from "@apollo/client"

export const FILTER_EXPORT_QUERY = gql`
  query Download($input: DownloadInput!) {
    download(input: $input)
  }
`
