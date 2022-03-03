import { Box } from "@mui/system";
import React from "react";
import Transaction from "./Transaction";

import { useQuery } from "@apollo/client";
import { GET_TRANSACTION } from "../../queries/TRANSCTION_QUERY";
import { getDate } from "../../util/util";

function Transactions(props) {
  const { data: fullMT940, loading, error } = useQuery(GET_TRANSACTION);

  if (loading)
    return <Box sx={{ width: "100%", padding: "10% 25%" }}>Loading...</Box>;
  if (error)
    return (
      <Box
        sx={{ width: "100%", padding: "10% 25%", color: "red" }}
      >{`${error}`}</Box>
    );

  // console.log(fullMT940.getStmtLineGroupedByDate);

  return (
    <Box sx={{ mt: 10 }}>
      <h2>Transactions</h2>
      {fullMT940.getStmtLineGroupedByDate.map((MT940) => {
        const transDate = getDate(MT940.ValueDate);
        return (
          <Box key={MT940.ValueDate}>
            <h3>
              {transDate.dayName} {transDate.day} {transDate.month}{" "}
              {transDate.year}
            </h3>
            {MT940.Sls.map((trans) => (
              <Transaction key={trans.refAsi} data={trans} />
            ))}
          </Box>
        );
      })}
    </Box>
  );
}

export default Transactions;
