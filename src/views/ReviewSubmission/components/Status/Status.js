import React from 'react';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import {
  useMediaQuery,
  Grid,
  Typography,
  Button,
  Divider,
  TableCell,
  Table,
  TableBody,
  TableRow,
  TableContainer
} from '@material-ui/core';
import MuiTableHead from '@material-ui/core/TableHead'
import StatusLine from './StatusLine'

const TableHead = withStyles(theme => ({
  root: {
    backgroundColor: '#f0f0f0'
  }
}))(MuiTableHead);
const TableHeaderCell = withStyles(theme => ({
  root: {
    fontWeight: 'bold'
  }
}))(TableCell);

const useStyles = makeStyles(theme => ({
  inputTitle: {
    fontWeight: 700,
    // marginBottom: theme.spacing(1),
  },
  flexGrow: {
    flexGrow: 1,
  },
  buttonRow: { marginTop: theme.spacing(2) },
  button: { marginLeft: theme.spacing(2) }
}));

const Status = props => {
  const { className, submissionData = {}, showReject, showNextSteps, ...rest } = props;
  const classes = useStyles();
  let { actions = [] } = submissionData
  const { status = "" } = submissionData

  console.log(submissionData)

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  actions.sort((a, b) => {
    if (a.status < b.status) return -1
    return a.status > b.status ? 1 : 0
  })

  console.log(actions)

  const isSm = useMediaQuery(theme.breakpoints.up('sm'), {
    defaultMatches: true,
  });

  return (
    <div className={className} {...rest}>
      <Grid container spacing={isMd ? 2 : 1} width="100%" justify="space-between">
        <Grid item xs={6}>
          <Typography variant="h5" color="textPrimary">
            Status
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5" color="textSecondary" align="right">
            {status}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Date</TableHeaderCell>
                <TableHeaderCell>Who</TableHeaderCell>
                {isSm && <TableHeaderCell>Comment</TableHeaderCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {actions.map((item, idx) => (
                <StatusLine key={idx} status={item} isSm={isSm} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>


        <Grid item xs={12}>
          <Grid container direction="row" justify="flex-end" alignItems="center" className={classes.buttonRow}>
            <Grid item>
              <Button variant="contained" color="secondary" onClick={showReject} className={classes.button}>
                Send Reject
              </Button>
              <Button variant="contained" color="primary" onClick={showNextSteps} className={classes.button}>
                Send Accept
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

    </div>

  );
};

export default Status;
