import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import {
    useMediaQuery,
    Typography,
    Button,
} from '@mui/material';
import { SectionHeader } from 'components/molecules';
import BasicsForm from './BasicsForm'
import BusinessForm from './BusinessForm'
import ChallengesForm from './ChallengesForm'
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import {DOMAIN} from 'common/constants'

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
    const [error, setError] = useState("");
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
        setSpinner(true)
        let companyName = formData.company.replace(/[&\\#,+()$~%.'"@:*?<>{}]/g, '')
        companyName = companyName.replaceAll(" ", "-")
        const path = `uploads/${companyName}`

        // Steps:
        // 1. Prepare Form Data
        // 2. Get s3 upload URLs
        // 3. Upload files
        // 4. Upload Submission
        console.log("<<<< Prepare Form Data")
        //  First check for null/empty values & remove control fields (i.e. dataError)
        let uploadData = Object.fromEntries(Object.entries(formData).filter(([k, v]) => {
            if (k === "dataError") return false
            if (v === null ) return false
            if (typeof v === 'string' && v.length === 0) return false
            return true
        }));
        console.log(uploadData)

        console.log("<<<< Getting URLs")
        getUploadUrls({ files: formData.files, path })
        .then((fileURLs) => {
            console.log(fileURLs)
            console.log("<<<< Uploading Files")
            return uploadFiles({files: formData.files, fileURLs })
        })
        .then((s3Locations) => {
            console.log("<<<< Creating Submission")
            // Update with s3 file locations
            console.log(s3Locations)
            uploadData.files = s3Locations 
            console.log(uploadData)
            return uploadSubmissionAPI({ data: uploadData })
        })
        .then((response) => {
            console.log("<<<< All Done: Submission created OK")
            setSpinner(false)
            console.log(response)
        })
        .catch((error) => {
            console.log("<<<< Catch - Error")
            console.log(error)
            setSpinner(false)
            setError(error.message)
        })
    }

    // Call API to get pre-signed URLs to upload files to s3
    const getUploadUrls = async ({ files, path }) => {
        let urlArray = []
        for (const file of files) {
            const fileName = file.name.replaceAll(" ", "")
            const url = `${DOMAIN}file/geturl?path=${path}&name=${fileName}&mimeType=${file.type}`
            const headers = new Headers();
            headers.append('Content-Type', file.type)
            console.log(`Call Get URL API: ${url}`)
            const getURL = await fetch(url, { method: 'GET', headers: headers })
            if (!getURL.ok) {
                console.log("ERROR: status")
                const message = `An error has occured: ${getURL.status}`
                throw new Error(message)
            }
    
            const responseJson = await getURL.json();
            console.log(responseJson)
            if (!responseJson.success || !responseJson.data) {
                const message = `An error has occured: ${responseJson.errorMessage || "Failed to get URL"}`
                throw new Error(message)
            }
            urlArray.push(responseJson.data.url)
        }
        return urlArray
    }

    // Using pre-signed URL upload file to s3
    const uploadFiles =  async ({files, fileURLs}) => {
        console.log("Start: uploadFiles")
        console.log(files)
        let s3Locations = []
        for (var i = 0; i < files.length; i++) {
            console.log(`Index: ${i}`);
            const file = formData.files[i] 
            const fileURL = fileURLs[i]
            console.log(file)
            console.log(fileURL)
            const headers = new Headers();
            headers.append('Content-Type', file.type)
            const uploadResponse = await fetch(fileURL, { method: 'PUT', headers: headers , body: file})
            if (!uploadResponse.ok) {
                console.log("ERROR: status")
                const message = `An error has occured: ${uploadResponse.status}`
                throw new Error(message)
            }
            s3Locations.push(fileURL.split("?")[0])
        }
        return s3Locations
    }    

    // Create submission record in dynamoDB once file url's are known
    const uploadSubmissionAPI = async ({ data }) => {
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
        return await submissionAPI.json();
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
        <p>If you think that you may qualify, please get in touch and, should you be a good fit, we will get back to you within 72 hours:</p>
    </Typography>)

    return (
        <div className={className} {...rest}>
            <SectionHeader
                title="Are you building a start-up and need some help?"
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
                                    {error.length > 0 ? (
                                        <div>
                                            <Typography variant="h5" className={classes.textError}>
                                                <p>We apologize but there was an error uploading your submission.</p>
                                                <p>Error: {error}</p>
                                            </Typography>
                                            <Typography className={classes.textError}>
                                                <p>If this problem persists please contact simon.hopkins@mac.com</p>
                                            </Typography>
                                        </div>
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
