import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, Grid, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    divider: {
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    },
    dataField: {
        [theme.breakpoints.up('sm')]: {
            paddingRight: theme.spacing(2)
        }
    }
}));



const Application = ({ companyData }) => {
    const classes = useStyles()
    // const theme = useTheme(); 
    // const isSm = useMediaQuery(theme.breakpoints.up('sm'), {
    //     defaultMatches: true,
    //   });


    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs={12}>
                    <Typography
                        variant="subtitle1"
                        color="textPrimary"
                        className={classes.inputTitle}
                    >
                        Business Problem
                    </Typography>
                    <TextField
                        inputProps={{
                            readOnly: Boolean(true),
                            disabled: Boolean(true),
                        }}
                        placeholder="business problem"
                        variant="outlined"
                        name="problem"
                        value={companyData.application.problem}
                        fullWidth
                        multiline
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        variant="subtitle1"
                        color="textPrimary"
                        className={classes.inputTitle}
                    >
                        Company's Solution
                    </Typography>
                    <TextField
                        inputProps={{
                            readOnly: Boolean(true),
                            disabled: Boolean(true),
                        }}
                        placeholder="company's solution"
                        variant="outlined"
                        name="solution"
                        value={companyData.application.solution}
                        fullWidth
                        multiline
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        variant="subtitle1"
                        color="textPrimary"
                        className={classes.inputTitle}
                    >
                        Target Customer
                    </Typography>
                    <TextField
                        inputProps={{
                            readOnly: Boolean(true),
                            disabled: Boolean(true),
                        }}
                        placeholder="target customer"
                        variant="outlined"
                        name="customer"
                        value={companyData.application.customer}
                        fullWidth
                        multiline
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        variant="subtitle1"
                        color="textPrimary"
                        className={classes.inputTitle}
                    >
                        Use of Technology
                    </Typography>
                    <TextField
                        inputProps={{
                            readOnly: Boolean(true),
                            disabled: Boolean(true),
                        }}
                        placeholder="use of technology"
                        variant="outlined"
                        name="technology"
                        value={companyData.application.technology}
                        fullWidth
                        multiline
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        variant="subtitle1"
                        color="textPrimary"
                        className={classes.inputTitle}
                    >
                        Progress
                    </Typography>
                    <TextField
                        inputProps={{
                            readOnly: Boolean(true),
                            disabled: Boolean(true),
                        }}
                        placeholder="progress"
                        variant="outlined"
                        name="progress"
                        value={companyData.application.progress}
                        fullWidth
                        multiline
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        variant="subtitle1"
                        color="textPrimary"
                        className={classes.inputTitle}
                    >
                        Reason
                    </Typography>
                    <TextField
                        inputProps={{
                            readOnly: Boolean(true),
                            disabled: Boolean(true),
                        }}
                        placeholder="reason for contact"
                        variant="outlined"
                        name="reason"
                        value={companyData.application.reason}
                        fullWidth
                        multiline
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        variant="subtitle1"
                        color="textPrimary"
                        className={classes.inputTitle}
                    >
                        Mentorship
                    </Typography>
                    <TextField
                        inputProps={{
                            readOnly: Boolean(true),
                            disabled: Boolean(true),
                        }}
                        placeholder="mentorship"
                        variant="outlined"
                        name="mentorship"
                        value={companyData.application.mentorship}
                        fullWidth
                        multiline
                    />
                </Grid>

            </Grid>



        </React.Fragment>

    )
}

export default Application


