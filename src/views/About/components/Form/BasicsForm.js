import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { DropzoneDialog } from 'material-ui-dropzone';


const useStyles = makeStyles(theme => ({
    question: { marginTop: theme.spacing(4) },
    filesButton: { display: 'flex', justifyContent: 'flex-end' }
}))


const BasicsForm = ({formData, updateData}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [emailHelper, setEmailHelper] = useState('');
    const { givenName = "" } = formData
    const { familyName = "" } = formData
    const { email = "" } = formData
    const { company = "" } = formData
    const { files = [] } = formData

    return (
        <React.Fragment>
            <div className={classes.question}>
                <Typography variant="h6" >
                    Please tell us you name
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
                    value={email}
                    onChange={(e) => {updateData({'email': e.target.value})}}
                    id="email"
                    name="email"
                    label="Email"
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
                Please upload your deck and/or video
            </Typography>
            <Typography>
                (video, pdf or pptx files less than 10MB/file only)
            </Typography>
            <Grid
                container
                direction="row"
                alignItems="center"
            >                <Grid item xs={9}>
                    <TextField
                        value={files.length === 0 ? "" : (`${files.length} files(s) selected`)}
                        required
                        id="files"
                        name="files"
                        label="Files chosen"
                        fullWidth
                        disabled="true"
                    />

                </Grid>
                <Grid item xs={3}>
                    <div className={classes.filesButton}>
                        <Button variant="contained" color="primary" onClick={() => {
                            console.log(files)
                            setOpen(true)}}>
                            Add Files
                 </Button>
                    </div>
                </Grid>
            </Grid>



            <DropzoneDialog
                acceptedFiles={['video/*', 'application/pdf', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation']}
                initialFiles = {files}
                cancelButtonText={"cancel"}
                dialogTitle={"You may upload 1 or 2 files (pdf, ppt or video) each less than 10Mb"}
                submitButtonText={"add"}
                filesLimit={2}
                maxFileSize={10000000}
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
