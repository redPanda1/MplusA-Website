import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, TextField, IconButton, CircularProgress, Button } from '@material-ui/core';
import { SectionHeader } from 'components/molecules';
import GetAppIcon from '@material-ui/icons/GetApp';
import Link from '@material-ui/core/Link';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

const DOMAIN = "https://aq2orp2ct9.execute-api.us-east-1.amazonaws.com/"

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        width: '100%',
    },
    answers: { paddingRight: theme.spacing(2), paddingLeft: theme.spacing(2) },
    answer: { marginTop: theme.spacing(2) },
    downloadButton: { display: 'flex', justifyContent: 'center' },
    spinner: { paddingTop: theme.spacing(2), display: 'flex', justifyContent: 'center' },
    error: { color: "red" },
    endOfPage: {paddingBottom: theme.spacing(8), 
                paddingTop: theme.spacing(4),
                marginRight: theme.spacing(2),
                marginLeft: theme.spacing(2)}
}));

const ReviewSubmission = () => {
    const classes = useStyles();
    const { id } = useParams()
    const [submissionData, setSubmissionData] = useState({});
    const [spinner, setSpinner] = useState(false);
    const [error, setError] = useState();
    const [rating, setRating] = useState(0);

    let fileUrl = ""
    let fileName = ""
    if (submissionData.files) {
        if (submissionData.files.length > 0) {
            fileUrl = submissionData.files[0]
            fileName = fileUrl.split('/').pop()
        }
    }
    let name = ""
    if (submissionData.givenName) {
        name += submissionData.givenName
        name += " "
    }
    if (submissionData.familyName) {
        name += submissionData.familyName
    }
    const { email = "" } = submissionData
    const { company = "" } = submissionData
    const { problem = "" } = submissionData
    const { customer = "" } = submissionData
    const { technology = "" } = submissionData
    const { solution = "" } = submissionData
    const { progress = "" } = submissionData
    const { reason = "" } = submissionData
    const { mentorship = "" } = submissionData

    // Do once on page load -> Get Submission Data
    useEffect(() => {
        console.log("Start: Test API")
        setSpinner(true)

        getSubmission(id)
            .then((response) => {
                console.log("Return from call - status 200")
                console.log(response)
                setSpinner(false)
                if (!response.success) {
                    const message = `An error has occured: ${response.errorMessage}`
                    throw new Error(message)
                }
                console.log("Submission retrieved OK")
                console.log(response)
                setSubmissionData(response.data)
            })
            .catch((error) => {
                setSpinner(false)
                setError(error.message)
                console.log(error)
            })

    }, [id]);


    const getSubmission = async (submissionID) => {
        console.log("Start: getSubmissionAPI")
        const url = `${DOMAIN}web/submission?id=${submissionID}`
        const headers = new Headers();
        headers.append('Content-Type', 'application/json')
        const getResponse = await fetch(url, { method: 'GET', headers: headers })

        console.log(`getSubmission returns`)
        if (!getResponse.ok) {
            console.log("ERROR: status")
            const message = `An error has occured: ${getResponse.status}`
            throw new Error(message)
        }

        console.log(`No Error - parsing JSON`)
        return getResponse.json();

    }

    return (
        <div className={classes.root}>
            <Grid container direction="row" justify="space-between" alignItems="center">
                <Grid item xs={12} md={4}>
                    <SectionHeader
                        label="Review Submission"
                        title={company}
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
                            value={name}
                            label="Name"
                            variant="outlined"
                            fullWidth />
                        <TextField className={classes.answer}
                            value={email}
                            label="Email"
                            variant="outlined"
                            fullWidth />
                        <Grid container direction="row" justify="space-between" alignItems="center" className={classes.answer}>
                            <Grid item xs={11}>
                                <TextField
                                    value={fileName}
                                    label="Deck/Video"
                                    variant="outlined"
                                    fullWidth />
                            </Grid>
                            <Grid item xs={1} className={classes.downloadButton}>
                                <IconButton component={Link} href={fileUrl}>
                                    <GetAppIcon />
                                </IconButton>

                            </Grid>

                        </Grid>
                        <TextField className={classes.answer}
                            value={problem}
                            label="Problem"
                            variant="outlined"
                            multiline
                            fullWidth />
                        <TextField className={classes.answer}
                            value={solution}
                            label="Solution"
                            variant="outlined"
                            multiline
                            fullWidth />
                        <TextField className={classes.answer}
                            value={customer}
                            label="Customer"
                            variant="outlined"
                            multiline
                            fullWidth />
                        <TextField className={classes.answer}
                            value={technology}
                            label="Technology"
                            variant="outlined"
                            multiline
                            fullWidth />
                        <TextField className={classes.answer}
                            value={progress}
                            label="Progress"
                            variant="outlined"
                            multiline
                            fullWidth />
                        <TextField className={classes.answer}
                            value={reason}
                            label="Why"
                            variant="outlined"
                            multiline
                            fullWidth />
                        <TextField className={classes.answer}
                            value={mentorship}
                            label="Mentorship"
                            variant="outlined"
                            multiline
                            fullWidth />
                    </Grid>
                </Grid>
            </Grid>
            {spinner ? (<div className={classes.spinner}>
                <CircularProgress />
            </div>) : null}
            {error && (
                <Typography variant="h5">
                    <span className={error}>
                        {error}
                    </span>
                </Typography>
            )}

            <Grid container direction="row" justify="space-between" alignItems="flex-end" className={classes.endOfPage}>
                <Grid item xs={12} md={3}>
                    <TextField className={classes.answer}
                        label="Name"
                        fullWidth />
                </Grid>
                <Grid item xs={12} md={2}>
                    <Box borderColor="transparent">
                        <Typography component="legend">Rate</Typography>
                        <Rating
                            name="rating"
                            value={rating}
                            onChange={(event, rating) => {
                                setRating(rating);
                            }}
                        />
                    </Box>                
                    </Grid>
                <Grid item xs={12} md={6}>
                    <TextField className={classes.answer}
                        label="Comments"
                        multiline
                        fullWidth />
                </Grid>
                <Grid item xs={12} md={1} >
                    <Button variant="contained" color="primary">
                        Rate
                    </Button>
                </Grid>
            </Grid>

        </div>
    );
};

export default ReviewSubmission;
