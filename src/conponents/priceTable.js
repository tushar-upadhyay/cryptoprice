import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
});


export default function PricesTable(props) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="Prices">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">Balance</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.tokens.map((token,index) => (
            
            <TableRow onClick={()=>console.log('clicked')} key={token.name}>
              
              <TableCell component="th" scope="row">
                {token.name}
              </TableCell>
              <TableCell align="center">{parseFloat(props.balance[index]).toFixed(2)}</TableCell>
              <TableCell align="right">${parseFloat(props.amount[index]).toFixed(2)}</TableCell>
              
            </TableRow>
           
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
