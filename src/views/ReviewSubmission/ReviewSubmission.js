import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, TextField, IconButton } from '@material-ui/core';
import { SectionHeader } from 'components/molecules';
import GetAppIcon from '@material-ui/icons/GetApp';



const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        width: '100%',
    },
    answers: { paddingRight: theme.spacing(2), paddingLeft: theme.spacing(2) },
    answer: { marginTop: theme.spacing(2) },
    downloadButton: {display: 'flex', justifyContent: 'center'}
}));

const ReviewSubmission = () => {
    const classes = useStyles();

    const handleClick = () => {
        window.history.back();
    };

    return (
        <div className={classes.root}>
            <Grid container direction="row" justify="space-between" alignItems="center">
                <Grid item xs={12} md={4}>
                    <SectionHeader
                        label="Review Submission"
                        title="Company Name"
                        titleProps={{
                            variant: 'h3',
                        }}
                        labelProps={{
                            color: 'secondary',
                            className: classes.label,
                            variant: 'h5',
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Grid container direction="column" justify="flex-start" alignItems="center" className={classes.answers}>
                        <TextField className={classes.answer}
                            value={"Name Person"}
                            label="Name"
                            variant="outlined"
                            fullWidth />
                        <TextField className={classes.answer}
                            value={"email"}
                            label="Email"
                            variant="outlined"
                            fullWidth />
                        <Grid container direction="row" justify="space-between" alignItems="center" className={classes.answer}>
                            <Grid item xs={11}>
                                <TextField 
                                    value={"file name"}
                                    label="Deck/Video"
                                    variant="outlined"
                                    fullWidth />
                            </Grid>
                            <Grid item xs={1} className={classes.downloadButton}>
                                <IconButton>
                                    <GetAppIcon />
                                </IconButton>

                            </Grid>

                        </Grid>
                        <TextField className={classes.answer}
                            value={"problem"}
                            label="Problem"
                            variant="outlined"
                            multiline
                            fullWidth />
                        <TextField className={classes.answer}
                            value={"solution"}
                            label="Solution"
                            variant="outlined"
                            multiline
                            fullWidth />
                        <TextField className={classes.answer}
                            value={"customer"}
                            label="Customer"
                            variant="outlined"
                            multiline
                            fullWidth />
                        <TextField className={classes.answer}
                            value={"technology"}
                            label="Technology"
                            variant="outlined"
                            multiline
                            fullWidth />
                        <TextField className={classes.answer}
                            value={"why"}
                            label="Why"
                            variant="outlined"
                            multiline
                            fullWidth />
                        <TextField className={classes.answer}
                            value={"mentorship"}
                            label="Mentorship"
                            variant="outlined"
                            multiline
                            fullWidth />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default ReviewSubmission;
