import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import {
    useMediaQuery,
    Typography,
    Button,
} from '@material-ui/core';
import { SectionHeader } from 'components/molecules';
import BasicsForm from './BasicsForm'
import BusinessForm from './BusinessForm'
import ChallengesForm from './ChallengesForm'
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';


const DOMAIN = "https://aq2orp2ct9.execute-api.us-east-1.amazonaws.com/"


const useStyles = makeStyles(theme => ({
    form: {
        maxWidth: 550,
        margin: `0 auto`,
        '& .MuiTextField-root': {
            background: theme.palette.background.paper,
        },
        '& .MuiOutlinedInput-input': {
            background: theme.palette.background.paper,
        },
    },
    inputTitle: {
        fontWeight: 700,
        marginBottom: theme.spacing(1),
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    question: { marginTop: theme.spacing(4) },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    textError: { color: "red" },
}));

const steps = ['Basics', 'Business', 'Challenges'];

const Form = props => {
    const { className, ...rest } = props;
    const classes = useStyles();

    const theme = useTheme();
    const isMd = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true,
    });

    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(false);
    const [spinner, setSpinner] = useState(false);


    const updateData = (data) => {
        const updatedFormData = { ...formData, ...data }
        setFormData(updatedFormData)
    }

    // Work out next step for the form
    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <BasicsForm formData={formData} updateData={updateData} />;
            case 1:
                return <BusinessForm formData={formData} updateData={updateData} />;
            case 2:
                return <ChallengesForm formData={formData} updateData={updateData} />;
            default:
                throw new Error('Unknown step');
        }
    }

    const submitData = () => {
        console.log("Start: Test API")
        setSpinner(true)

        const companyName = formData.company.replaceAll(" ", "")
        const path = `uploads/${companyName}`

        uploadFiles({ files: formData.files, path })
            .then((response1) => {
                if (!response1.success) {
                    const message = `An error has occured: ${response1.errorMessage = "File upload error"}`
                    throw new Error(message)
                }
                console.log("Files loaded OK")
                console.log(response1)
                let uploadData = { ...formData, files: [response1.fileName] }
                delete uploadData.dataError
                console.log(uploadData)
                return uploadSubmissionAPI({ data: uploadData })
            })
            .then((response2) => {
                setSpinner(false)
                console.log("Submission created OK")
                console.log(response2)
            })
            .catch((error) => {
                setSpinner(false)
                setError(true)
                console.log(error)
            })

    }

    const uploadFiles = ({ files, path }) => {
        console.log("Start: Upload files")
        // We are only uploading one file for now
        return uploadFileAPI(files[0], path)
    }

    const uploadFileAPI = async (file, path) => {
        console.log("Start: uploadFileAPI")

        const fileName = file.name.replaceAll(" ", "")
        const url = `${DOMAIN}file?path=${path}&name=${fileName}`
        const headers = new Headers();
        headers.append('Content-Type', file.type)
        console.log(`Call Upload File API: ${url}`)
        const upload1 = await fetch(url, { method: 'POST', headers: headers, body: file })

        console.log(`uploadFile returns`)
        if (!upload1.ok) {
            console.log("ERROR: status")
            const message = `An error has occured: ${upload1.status}`
            throw new Error(message)
        }

        console.log(`No Error - parsing JSON`)
        return upload1.json();

    }

    const uploadSubmissionAPI = async ({ data }) => {
        console.log("Start: Test API")

        const url = `${DOMAIN}web/submission`
        const headers = new Headers();
        headers.append('Content-Type', "application/json")
        console.log(`Call Create Submission API: ${url}`)

        const submissionAPI = await fetch(url, { method: 'POST', headers: headers, body: JSON.stringify(data) })

        if (!submissionAPI.ok) {
            console.log("ERROR: status")
            const message = `An error has occured: ${submissionAPI.status}`
            throw new Error(message)
        }

        console.log(`No Error - parsing JSON`)
        return submissionAPI.json();
    }

    const handleNext = () => {
        // Check for submission
        if (activeStep === steps.length - 1) {
            console.log("Submit data - call API")
            console.log(formData)
            submitData()
        }
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const checkMissingData = (step) => {
        switch (step) {
            case 0:
                const { givenName = "" } = formData
                const { familyName = "" } = formData
                const { email = "" } = formData
                const { company = "" } = formData
                const { dataError = false } = formData
                const { files = [] } = formData
                if (givenName.length > 0 && familyName.length > 0 && email.length > 0 && company.length > 0 && files.length > 0 && !dataError) {
                    return false
                }
                return true
            case 1:
                const { problem = "" } = formData
                const { solution = "" } = formData
                const { customer = "" } = formData
                const { progress = "" } = formData
                if (problem.length > 0 && solution.length > 0 && customer.length > 0 && progress.length > 0) {
                    return false
                }
                return true
            case 2:
                const { reason = "" } = formData
                const { mentorship = "" } = formData
                if (reason.length > 0 && mentorship.length > 0) {
                    return false
                }
                return true
            default:
                throw new Error('Unknown step');
        }
    }



    const subTitle = (<Typography>
        <p>We want to work with the most dynamic, far-sighted and passionate under-represented founders.</p>
        <p>We hold office-hours style meetings with candidate companies to assess their needs, as well as provide advice.</p>
        <p>If you think that you may qualify, please get in touch and we will get back to you within 72 hours:</p>
    </Typography>)

    return (
        <div className={className} {...rest}>
            <SectionHeader
                title="Got an idea or need some help?"
                subtitle={subTitle}
                subtitleProps={{
                    variant: 'body1',
                    color: 'textPrimary',
                }}
                data-aos="fade-up"
                align={isMd ? 'center' : 'left'}
            />
            <div className={classes.form}>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <React.Fragment>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            {!spinner && (
                                <div>
                                    <Typography variant="h5" gutterBottom>
                                        Thank you for your submission.
                                   </Typography>
                                    {error ? (
                                        <Typography variant="h5" className={classes.textError}>
                                            Unfortunately but there was an error uploading your submission.
                                            We're sorry for the inconvenience - please try again.
                                        </Typography>
                                    )
                                        :
                                        (
                                            <Typography variant="subtitle1">
                                                We will be in touch within the next 72 hours.
                                            </Typography>
                                        )}
                                </div>
                            )}
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {getStepContent(activeStep)}
                            <div className={classes.buttons}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} className={classes.button}>
                                        Back
                                    </Button>
                                )}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disabled={checkMissingData(activeStep)}
                                    onClick={handleNext}
                                    className={classes.button}
                                >
                                    {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                                </Button>
                            </div>
                        </React.Fragment>
                    )}
                </React.Fragment>

            </div>
            <Backdrop className={classes.backdrop} open={spinner} >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
};

Form.propTypes = {
    /**
     * External classes
     */
    className: PropTypes.string,
};

export default Form;
