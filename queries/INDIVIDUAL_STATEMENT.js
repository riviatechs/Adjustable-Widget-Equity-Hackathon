import { gql } from "@apollo/client"

export const INDIVIDUAL_STATEMENT = gql`
  query GetStatement($id: Int!) {
    getStatement(ID: $id) {
      id
      currency
      amount
      partyBName
      partyBAccount
      amount
      dateTime
      narrative
      mark
    }
  }
`
