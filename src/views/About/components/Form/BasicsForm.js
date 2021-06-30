import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { DropzoneDialog } from 'material-ui-dropzone';
import validate from 'validate.js';



const useStyles = makeStyles(theme => ({
    question: { marginTop: theme.spacing(4) },
    filesButton: { display: 'flex', justifyContent: 'flex-end' }
}))


const BasicsForm = ({formData, updateData}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [emailHelper, setEmailHelper] = useState('');
    const [urlHelper, setUrlHelper] = useState('');
    const { givenName = "" } = formData
    const { familyName = "" } = formData
    const { email = "" } = formData
    const { company = "" } = formData
    const { website = "" } = formData
    const { files = [] } = formData


    const emailChangeHandler = (emailValue) => {
        console.log(emailValue)
        const emailCheck = validate.single(emailValue, {presence: true, email: true})
        console.log(emailCheck)
        if (emailCheck) {
            setEmailHelper(emailCheck[0])
            updateData({'email': emailValue, 'dataError': true})
        } else {
            setEmailHelper("")
            updateData({'email': emailValue, 'dataError': false})
        }
    }

    const urlChangeHandler = (urlValue) => {
        if (urlValue.length === 0) {
            setUrlHelper("")
            updateData({'website': "", 'dataError': false})
            return
        }
        const checkUrl = validate({website: urlValue}, {website: {url: true}});
        if (checkUrl) {
            setUrlHelper(checkUrl.website)
            updateData({'website': urlValue, 'dataError': true})
        } else {
            setUrlHelper("")
            updateData({'website': urlValue, 'dataError': false})
        }
    }


    return (
        <React.Fragment>
            <div className={classes.question}>
                <Typography variant="h6" >
                    Please tell us your name
                </Typography>
            </div>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        value={givenName}
                        onChange={(e) => {updateData({'givenName': e.target.value})}}
                        id="firstName"
                        name="firstName"
                        label="First name"
                        fullWidth
                        autoComplete="given-name"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        value={familyName}
                        onChange={(e) => {updateData({'familyName': e.target.value})}}
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        fullWidth
                        autoComplete="family-name"
                    />
                </Grid>
            </Grid>
            <Typography variant="h6" className={classes.question}>
                Please tell us your email so we can get back to you
            </Typography>
            <Grid item xs={12}>
                <TextField
                    required
                    error={!!emailHelper}
                    helperText={emailHelper}
                    value={email}
                    onChange={(e) => {emailChangeHandler(e.target.value)}}
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth
                />
            </Grid>
            <Typography variant="h6" className={classes.question}>
                What is your company name?
            </Typography>
            <Grid item xs={12}>
                <TextField
                    required
                    value={company}
                    onChange={(e) => {updateData({'company': e.target.value})}}
                    id="company"
                    name="company name"
                    label="Company Name"
                    fullWidth
                />
            </Grid>
            <Typography variant="h6" className={classes.question}>
                If you have a website, please let us know
            </Typography>
            <Grid item xs={12}>
                <TextField
                    value={website}
                    error={!!urlHelper}
                    helperText={urlHelper}
                    onChange={(e) => {urlChangeHandler(e.target.value)}}
                    id="website"
                    name="website"
                    label="Website"
                    placeholder="https://example.com"
                    type="url"
                    fullWidth
                />
            </Grid>
            <Typography variant="h6" className={classes.question}>
                Please upload your deck or video
            </Typography>
            <Typography>
                (video, pdf or pptx files less than 20MB)
            </Typography>
            <Grid
                container
                direction="row"
                alignItems="center"
            >                <Grid item xs={9}>
                    <TextField
                        value={files.length === 0 ? "" : (`${files.length} file selected`)}
                        required
                        id="files"
                        name="file"
                        label="File chosen"
                        fullWidth
                        disabled="true"
                    />

                </Grid>
                <Grid item xs={3}>
                    <div className={classes.filesButton}>
                        <Button variant="contained" color="primary" onClick={() => {
                            console.log(files)
                            setOpen(true)}}>
                            Add File
                 </Button>
                    </div>
                </Grid>
            </Grid>

            <DropzoneDialog
                acceptedFiles={['video/*', 'application/pdf', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation']}
                initialFiles = {files}
                cancelButtonText={"cancel"}
                dialogTitle={"You may upload 1 file (pdf, ppt or video) less than 20Mb"}
                submitButtonText={"add"}
                filesLimit={1}
                maxFileSize={20000000}
                open={open}
                onClose={() => setOpen(false)}
                onSave={(files) => {
                    console.log('Files:', files)
                    updateData({'files': files})
                    setOpen(false);
                }}
                showPreviews={true}
                showFileNamesInPreview={true}
            />

        </React.Fragment>
    );
}

export default BasicsForm
