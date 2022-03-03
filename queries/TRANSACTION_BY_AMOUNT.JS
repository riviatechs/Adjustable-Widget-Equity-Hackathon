import { gql } from "@apollo/client"

export const TRANSACTION_BY_AMOUNT_QUERY = gql`
  query GetStmtLinesFilterByAmount($amount: AmountInput!) {
    getStmtLinesFilterByAmount(amount: $amount) {
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
