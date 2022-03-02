import { Box } from "@mui/system";
import React from "react";
import Transaction from "./Transaction";

import { useQuery } from "@apollo/client";
import { GET_TRANSACTION } from "../../queries/TRANSCTION_QUERY";

function Transactions(props) {
  const {
    data: fullMT940,
    loading,
    error,
  } = useQuery(GET_TRANSACTION, {
    variables: {
      id: 1,
    },
  });

  if (loading)
    return <Box sx={{ width: "100%", padding: "10% 25%" }}>Loading...</Box>;
  if (error)
    return (
      <Box
        sx={{ width: "100%", padding: "10% 25%", color: "red" }}
      >{`${error}`}</Box>
    );

  console.log(fullMT940.custStmtMsg);

  return (
    <Box sx={{ mt: 2 }}>
      <h2>Transactions</h2>
      <h3>{fullMT940.custStmtMsg.cb.dateY}</h3>
      {fullMT940.custStmtMsg.sl.map((trans) => (
        <Transaction key={trans.refAsi} data={trans} />
      ))}
    </Box>
  );
}

export default Transactions;
