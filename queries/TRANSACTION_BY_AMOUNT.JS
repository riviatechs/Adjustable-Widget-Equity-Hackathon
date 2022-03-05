import { gql } from "@apollo/client"

export const FILTER_QUERY = gql`
  query StatementsFiltered($input: FilterInput) {
    statementsFiltered(input: $input) {
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
