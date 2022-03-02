import { gql } from "@apollo/client";

export const GET_TRANSACTION = gql`
  query GetCustStmtMessage($id: Int!) {
    custStmtMsg(id: $id) {
      id
      trn
      rr
      ai {
        custStmtMsgID
        id
        account
        ic
      }
      sn
      ob {
        id
        mark
        dateY
        currency
        amount
      }
      sl {
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
      cb {
        id
        mark
        dateY
        currency
        amount
      }
      cab {
        id
        mark
        dateY
        currency
        amount
      }
      fwab {
        id
        mark
        dateY
        currency
        amount
      }
      iao
    }
  }
`;
