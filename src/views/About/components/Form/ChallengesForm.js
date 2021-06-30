import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import validate from 'validate.js';


const useStyles = makeStyles(theme => ({
    question: { marginTop: theme.spacing(4) }
}))


const ChallengesForm = ({formData, updateData}) => {
    const classes = useStyles();
    const [emailHelper, setEmailHelper] = useState('');
    const { reason = "" } = formData
    const { mentorship = "" } = formData
    const { contact = "" } = formData

    const contactChangeHandler = (emailValue) => {
        // if (emailValue.length === 0) {
        //     setEmailHelper("")
        //     updateData({'contact': emailValue, 'dataError': false})
        //     return
        // }
        const emailCheck = validate.single(emailValue, {presence: true, email: true})
        if (!emailCheck || emailValue.length === 0) {
            setEmailHelper("")
            updateData({'contact': emailValue, 'dataError': false})
        } else {
            setEmailHelper(emailCheck[0])
            updateData({'contact': emailValue, 'dataError': true})
        }
    }


    return (
        <React.Fragment>
            <Typography variant="h6" className={classes.question}>
                Why are you reaching out to M+A?
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        value={reason}
                        onChange={(e) => {updateData({'reason': e.target.value})}}    
                        id="reason"
                        name="reason"
                        label="Reason"
                        multiline
                        fullWidth
                    />
                </Grid>
            </Grid>
            <Typography variant="h6" className={classes.question}>
                In addition to fundraising are you interested in mentorship?
            </Typography>
            <Typography gutterBottom>
                If yes, what kind of help are you looking for?
            </Typography>
            <Grid item xs={12}>
                <TextField
                    required
                    value={mentorship}
                    onChange={(e) => {updateData({'mentorship': e.target.value})}}
                    id="mentorship"
                    name="mentorship"
                    label="Mentorship"
                    multiline
                    fullWidth
            />
            </Grid>
            <Typography variant="h6" className={classes.question}>
                If you have already spoken to someone in the group, please include their email
            </Typography>
            <Typography>
                (Prior contact with M+A is not a requirement to apply)
            </Typography>
            <Grid item xs={12}>
                <TextField
                    error={!!emailHelper}
                    helperText={emailHelper}
                    value={contact}
                    onChange={(e) => {contactChangeHandler(e.target.value)}}
                    id="contact"
                    name="contact"
                    label="Contact"
                    type="email"
                    fullWidth
                />
            </Grid>



        </React.Fragment>
    );
}

export default ChallengesForm