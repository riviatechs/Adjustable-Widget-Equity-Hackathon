import { Box } from "@mui/system"
import React, { useState } from "react"
import Transaction from "./Transaction"

import { useQuery } from "@apollo/client"
import { GET_TRANSACTION } from "../../queries/TRANSCTION_QUERY"
import { getDate } from "../../util/util"

function Transactions(props) {
  const [filteredSls, setFilteredSls] = useState(props.slsData)

  return (
    <Box sx={{ mt: 8 }}>
      <h2>Transactions</h2>
      {filteredSls.map((MT940) => {
        const transDate = getDate(MT940.ValueDate)
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
        )
      })}
    </Box>
  )
}

export default Transactions
