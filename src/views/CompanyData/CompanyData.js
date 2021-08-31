import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container';
import { makeStyles, withStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import Reviews from './Reviews';
import CompanyDetails from './CompanyDetails';
import MuiAccordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Application from './Application';
import Files from './Files'
import Actions from './Actions'
import useCompany from 'hooks/useCompany';
import MuiAlert from '@material-ui/lab/Alert';
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

  console.log(companyData.application)


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
            {!readOnly && (<Button variant="contained" color={"default"} className={classes.cancelButton} onClick={handleCancel}>
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
          <Reviews reviews={companyData.reviews} />
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
  )
}

export default CompanyData