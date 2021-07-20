import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container';
import { makeStyles, withStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import Reviews from './Reviews';
import CompanyDetails from './CompanyDetails';
import MuiAccordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Application from './Application';
import Files from'./Files'
import Actions from './Actions'

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
}));


const ratingTemplate = {
    name: "", comment: "", categories: [{ name: "Team", rating: 0, comment: "" },
    { name: "Market", rating: 0, comment: "" },
    { name: "Product", rating: 0, comment: "" },
    { name: "Traction", rating: 0, comment: "" },
    { name: "Risk", rating: 0, comment: "" }]
  }
  



const CompanyData = () => {
    const classes = useStyles()
    const location = useLocation();
    console.log(location)
    const companyData = location.state.companyData || {}
    const [newReview, setNewReview] = useState(ratingTemplate);



  // Data changed as a result of user input
  const updateReview = (data) => {
    if (data.categories) {
      const newRatings = newReview.categories.map((item) => {
        if (item.name === data.categories.name) {
          return { ...item, ...data.categories }
        } else {
          return item
        }
      })
      let newData = { ...newReview }
      newData.categories = newRatings
      setNewReview(newData)
    } else {
      setNewReview({ ...newReview, ...data })
    }
  }
  // User clicked Submit Review Button
  const submitReview = () => {
    console.log("submitReview")
  }

  // User clicked Share Button
  const shareApplication = () => {
    console.log("shareApplication")
  }



    return (
        <Container className={classes.container}>
            <Paper className={classes.paper}>
                <Typography variant="h4">{companyData.name}</Typography>
                <CompanyDetails companyData={companyData} />
            </Paper>

            <Accordion >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">Application</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Application companyData={companyData} />
                </AccordionDetails>
            </Accordion>

            <Accordion >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">Files ({companyData.files.length})</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Files files={companyData.files}/>
                </AccordionDetails>
            </Accordion>
            <Accordion >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">Reviews ({companyData.reviews.length})</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Reviews reviews={companyData.reviews} newReview={newReview} updateReview={updateReview} submitReview={submitReview} shareApplication={shareApplication} />
                </AccordionDetails>
            </Accordion>
            <Accordion >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">Actions: {companyData.status}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Actions actions={companyData.actions}/>
                </AccordionDetails>
            </Accordion>


        </Container>
    )
}

export default CompanyData