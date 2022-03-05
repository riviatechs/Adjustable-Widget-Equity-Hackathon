import { gql } from "@apollo/client"

export const FILTER_QUERY = gql`
  query GetStatements {
    statements {
      DateTime
      confirmations {
        id
        currency
        partyBName
        partyBAccount
        amount
        dateTime
        narrative
        partyAName
        partAAccount
        mark
      }
    }
  }
`
