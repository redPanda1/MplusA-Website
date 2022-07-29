import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container';
import { makeStyles, withStyles } from '@mui/styles';
import { Typography } from '@mui/material';
import Reviews from './Reviews';
import CompanyDetails from './CompanyDetails';
import MuiAccordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Application from './Application';
import Files from './Files'
import Actions from './Actions'
import useCompany from 'hooks/useCompany';
import MuiAlert from '@mui/material/Alert';
import Footer from 'common/Footer'


const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    '&:before': {
      display: 'none',
    },
  },
  expanded: {},
})(MuiAccordion);

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    backgroundColor: "#F7F9FF",
    height: '100vh',
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  cancelButton: {
    marginRight: theme.spacing(2)
  }
}));





const CompanyData = () => {
  const classes = useStyles()
  const history = useHistory()
  const { id } = useParams()
  const [{ getCompany, updateCompanyDetails, getCompanyDetails, isLoading, userMessage, dismissMessage }] = useCompany()
  const [companyData, setCompanyData] = useState({})
  const [readOnly, setReadOnly] = useState(true)

  console.log(companyData)


  useEffect(() => {
    console.log("<<<<<USE EFFECT START>>>>>>>")
    getCompanyDetails(id)
  }, []);

  useEffect(() => {
    console.log("<<<<<USE EFFECT UPDATE>>>>>>>")
    if (getCompany(id)) {
      setCompanyData(getCompany(id))
    }
  }, [getCompany(id)])

  const handleSaveUpdate = () => {
    console.log("Click")
    console.log(companyData.details)
    // Must be a save...
    if (!readOnly) {
      updateCompanyDetails({ id, details: companyData.details })
    }
    setReadOnly(!readOnly)
  }

  const updateDetails = (data) => {
    if (data.hasOwnProperty('contact')) {
      const newContact = { ...companyData.details.contact, ...data.contact }
      setCompanyData({ ...companyData, details: { ...companyData.details, contact: { ...newContact } } })
    } else {
      setCompanyData({ ...companyData, details: { ...companyData.details, ...data } })
    }
  }
  const handleCancel = () => {
    history.push('/admin/company/list')
  }

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper}>
        <Grid container direction="row" justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h4">{companyData.details ? companyData.details.name : ""}</Typography>
          </Grid>
          <Grid item>
            {!readOnly && (<Button
              variant="contained"
              className={classes.cancelButton}
              onClick={handleCancel}>
              Cancel
            </Button>)}
            <Button variant="contained" onClick={handleSaveUpdate} color={readOnly ? "default" : "primary"}>
              {readOnly ? "Change" : "Save"}
            </Button>
          </Grid>
        </Grid>
        <CompanyDetails companyDetails={companyData.details} updateDetails={updateDetails} readOnly={readOnly} />
      </Paper>

      <Accordion >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Application</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Application applicationData={companyData.application} />
        </AccordionDetails>
      </Accordion>

      <Accordion >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Files ({companyData.files ? companyData.files.length : []})</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Files files={companyData.files} />
        </AccordionDetails>
      </Accordion>
      <Accordion >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Reviews ({companyData.reviews ? companyData.reviews.length : 0})</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Reviews companyData={companyData} />
        </AccordionDetails>
      </Accordion>
      <Accordion >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Actions: {companyData.status}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Actions actions={companyData.actions} />
        </AccordionDetails>
      </Accordion>
      <Footer userMessage={userMessage} isLoading={isLoading} close={dismissMessage}/>
    </Container>
  );
}

export default CompanyData