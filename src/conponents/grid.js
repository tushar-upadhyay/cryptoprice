import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Balance from './bnbBalance';
import OtherTokens from './otherTokens';
import AddToken from './addToken';
import RemoveToken from './removeToken';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
      margin:16,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function GridView(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container >
        <Grid item sm={6} xs={12}>
          <Paper className={classes.paper}>
              <Balance  amount={props.amount} balance={props.balance}/>
          </Paper>
          <Paper className={classes.paper}>
                <OtherTokens tokens={[]}/>
          </Paper>
        </Grid>
        <Grid sm={6} item xs={12}>
          <Paper className={classes.paper}>
              <AddToken />
             
          </Paper>
          <Paper className={classes.paper}>
          <RemoveToken />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}