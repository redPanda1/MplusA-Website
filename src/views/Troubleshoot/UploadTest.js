import React, { useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import logo from 'assets/images/logo.png'
import { DOMAIN } from 'common/constants'

const useStyles = makeStyles(theme => ({
    statusField: {
        [theme.breakpoints.up('sm')]: {
            paddingRight: theme.spacing(2),
        }
    },
    messageField: {
        [theme.breakpoints.down('md')]: {
            marginTop: theme.spacing(1),
        }
    },
    spinner: { paddingTop: theme.spacing(2), display: 'flex', justifyContent: 'center' },
    testLine: { marginBottom: theme.spacing(4) },
    button: { paddingRight: theme.spacing(2) },
}))






const ConnectTest = () => {
    const classes = useStyles();
    const [spinner, setSpinner] = useState(false);
    const [status, setStatus] = useState('');
    const [message, setMessage] = useState('');

    const callUploadTest = () => {
        setSpinner(true)

        callTestAPI()
            .then((response) => {
                console.log("Return from call - status 200")
                console.log(response)
                setSpinner(false)
                console.log("Submission retrieved OK")
                console.log(response)
                setMessage(response.message)
            })
            .catch((error) => {
                console.log("Catch - ERROR")
                setSpinner(false)
                setMessage(error.message)
                console.log(error)
            })
    }

    const callTestAPI = async () => {
        console.log("Start: testAPI")
        const url = `${DOMAIN}?test=test`
        const headers = new Headers();
        headers.append('Content-Type', 'application/json')
        const getResponse = await fetch(url, { method: 'POST', headers: headers, body: logo })

        setStatus(getResponse.status)

        console.log(`testAPI returns`)
        console.log(getResponse.headers)
        if (!getResponse.ok) {
            console.log("ERROR: status")
            const message = `An error has occured: ${getResponse.status}`
            throw new Error(message)
        }
        console.log(`No Error - parsing JSON`)
        return await getResponse.json();

    }

    return (
        <div>
            <Grid container direction="row" justifyContent="space-between" alignItems="center" className={classes.testLine}>
                <Grid item xs={4} sm={2} className={classes.button}>
                    <Button variant="contained" color="primary" onClick={callUploadTest}
                        fullWidth >
                        Test Upload
                    </Button>
                </Grid>
                <Grid item xs={8} sm={2} className={classes.statusField}>
                    <TextField variant="outlined"
                        label={"Status"}
                        name={"status"}
                        value={status}
                        inputProps={{
                            readOnly: Boolean(true),
                            disabled: Boolean(true),
                        }}
                        multiline
                        fullWidth />
                </Grid>
                <Grid item xs={12} sm={8} className={classes.messageField}>
                    <TextField variant="outlined"
                        name={"messageError"}
                        label={"Message/Error"}
                        value={message}
                        inputProps={{
                            readOnly: Boolean(true),
                            disabled: Boolean(true),
                        }}
                        multiline
                        fullWidth />
                </Grid>

            </Grid>
            {spinner ? (<div className={classes.spinner}>
                <CircularProgress />
            </div>) : null}

        </div>

    )
}

export default ConnectTest