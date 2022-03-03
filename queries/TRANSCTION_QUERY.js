import { gql } from "@apollo/client"

export const GET_TRANSACTION = gql`
  query GetStmtLineGroupDate {
    getStmtLineGroupedByDate {
      ValueDate
      Sls {
        custStmtMsgID
        valueDate
        entryDate
        mark
        fundsCode
        amount
        ttic
        refOwner
        refAsi
        supp
        iao
      }
    }
  }
`
