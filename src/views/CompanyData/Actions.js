import React from 'react';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import {
    useMediaQuery,
    Grid,
    Button,
    TableCell,
    Table,
    TableBody,
    TableRow,
    TableContainer
} from '@material-ui/core';
import MuiTableHead from '@material-ui/core/TableHead'
import ActionsLine from './ActionsLine'

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

const Actions = ({ className, actions = [], showReject, showNextSteps }) => {
    const classes = useStyles();

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
        <React.Fragment>
            <Grid container spacing={isMd ? 2 : 1} width="100%" justify="space-between">
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
                                <ActionsLine key={idx} status={item} isSm={isSm} />
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
        </React.Fragment>

    );
};

export default Actions;
