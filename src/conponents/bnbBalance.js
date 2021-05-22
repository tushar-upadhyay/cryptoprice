import { Typography } from "@material-ui/core";
import React from "react";

export default function Balance(props){
    return (
    <div>
    <Typography variant="h6">
   BNB Balance: {props.balance}
  </Typography>
  <Typography variant="h6">
      Total Worth: ${props.amount?props.amount.toFixed(2):null}
      </Typography>
  </div>
  );
}