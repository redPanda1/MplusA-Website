import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, CircularProgress, Snackbar } from '@material-ui/core';
import { SectionAlternate, CardBase } from 'components/organisms';
import { Hero, Submission, Reviews, Status, RejectPopUp, SharePopUp } from './components';
import MuiAlert from '@material-ui/lab/Alert';

const DOMAIN = "https://aq2orp2ct9.execute-api.us-east-1.amazonaws.com/"

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '100%',
  },
  section: {
    '& .section-alternate__content': {
      paddingTop: 0,
      marginTop: theme.spacing(-5),
      position: 'relative',
      zIndex: 1,
    },
    '& .card-base__content': {
      padding: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(3),
      },
    },
  },
  menu: {
    height: 'auto',
  },
  list: {
    display: 'inline-flex',
    overflow: 'auto',
    flexWrap: 'nowrap',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      flexDirection: 'column',
      marginRight: theme.spacing(-3),
      marginLeft: theme.spacing(-3),
    },
  },
  listItem: {
    marginRight: theme.spacing(2),
    flex: 0,
    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing(3),
      paddingLeft: theme.spacing(3),
      borderLeft: '2px solid transparent',
    },
  },
  listItemActive: {
    [theme.breakpoints.up('md')]: {
      borderLeft: `2px solid ${theme.palette.primary.dark}`,
    },
    '& .menu__item': {
      color: theme.palette.text.primary,
    },
  },
  textError: { marginTop: theme.spacing(2), color: "red" },
  spinner: { paddingTop: theme.spacing(2), display: 'flex', justifyContent: 'center' },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ratingTemplate = {
  name: "", comment: "", categories: [{ name: "Team", rating: 0, comment: "" },
  { name: "Market", rating: 0, comment: "" },
  { name: "Product", rating: 0, comment: "" },
  { name: "Traction", rating: 0, comment: "" },
  { name: "Risk", rating: 0, comment: "" }]
}


// Call API to get Submission data
const getSubmissionAPI = async (submissionID) => {
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
  return await getResponse.json();
}

// Call API to update Submission Data
const updateSubmissionAPI = async (submissionData) => {
  console.log("Start: updateSubmissionAPI")
  const url = `${DOMAIN}web/submission?id=${submissionData.id}`
  const headers = new Headers();
  headers.append('Content-Type', 'application/json')
  const updateResponse = await fetch(url, { method: 'PUT', headers: headers, body: JSON.stringify(submissionData) })

  console.log(`updateSubmissionAPI returns`)
  if (!updateResponse.ok) {
    console.log("ERROR: status")
    const message = `An error has occured: ${updateResponse.status}`
    throw new Error(message)
  }

  console.log(`No Error - parsing JSON`)
  return updateResponse.json();

}

const callShareSubmissionAPI = async ({messageData, id}) => {
  // Call API to email submission Data
    console.log("Start: shareSubmissionAPI")
    const url = `${DOMAIN}web/submission/share?id=${id}`
    const headers = new Headers();
    headers.append('Content-Type', 'application/json')
    const getResponse = await fetch(url, { method: 'POST', headers: headers, body: JSON.stringify(messageData) })

    console.log(`shareSubmissionAPI returns`)
    if (!getResponse.ok) {
      console.log("ERROR: status")
      const message = `An error has occured: ${getResponse.status}`
      throw new Error(message)
    }
    console.log(`No Error - parsing JSON`)
    return await getResponse.json();
}


const callSendRejectAPI = async ({id, messageData}) => {
  const url = `${DOMAIN}email/reject?id=${id}`
  const headers = new Headers();
  headers.append('Content-Type', 'application/json')
  console.log("Start: callSendRejectAPI " + url)
  const getResponse = await fetch(url, { method: 'POST', headers: headers, body: JSON.stringify(messageData) })

  console.log(`callSendRejectAPI returns`)
  if (!getResponse.ok) {
    console.log("ERROR: status")
    const message = `An error has occured: ${getResponse.status}`
    throw new Error(message)
  }
  console.log(`No Error - parsing JSON`)
  return await getResponse.json();  
}


const ReviewSubmission = (props = {}) => {
  console.log("starting ReviewSubmission")
  const classes = useStyles();
  const { id } = useParams()
  const [submissionData, setSubmissionData] = useState({});
  const [newReview, setNewReview] = useState(ratingTemplate);
  const [userMessage, setUserMessage] = useState();
  const [spinner, setSpinner] = useState(false);
  const [reviewError, setReviewError] = useState();
  const [showSharePopUp, setShowSharePopUp] = useState(false);
  const [showRejectPopUp, setShowRejectPopUp] = useState(false);


  const { reviews = [] } = submissionData
  const { company = "" } = submissionData
  // const reviews = submissionData.reviews ? submissionData.reviews : []
  // const company = submissionData.company ? submissionData.company : ""

  // console.log("reviews")
  // console.log(reviews)

  // Do once on page load -> Get Submission Data
  useEffect(() => {
    console.log("Start: Use Effect to get Submission")
    setSpinner(true)

    getSubmissionAPI(id)
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
        console.log(error)
        setUserMessage({text: `${error.message}`, type:"error"})
    })

  }, [id]);

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

  // User clicked Share Button
  const shareSubmission = () => {
    console.log("shareSubmission")
    console.log(submissionData)
    setShowSharePopUp(true)
  }

  const closeSharePopUp = (messageData) => {
    setShowSharePopUp(false)
    console.log(messageData)
    if (messageData) {
      callShareSubmissionAPI({messageData, id})
        .then((response) => {
          console.log("Return from Update call - status 200")
          console.log(response)
          setSpinner(false)
          if (!response.success) {
            const message = `An error has occured: ${response.errorMessage}`
            throw new Error(message)
          }
          console.log("Email sent OK")
          console.log(response)
          setUserMessage({text:"Email sent", type:"success"})
        })
        .catch((error) => {
          setSpinner(false)
          console.log(error)
          setUserMessage({text: `${error.message}`, type:"error"})
        })
    }
  }

  // User clicked Reject Button
  const showRejectSubmission = () => {
    console.log("rejectSubmission")
    setShowRejectPopUp(true)
  }
  const closeRejectPopUp = (messageData) => {
    setShowRejectPopUp(false)
    console.log(messageData)
    if (messageData) {
      messageData.rejectionReasons = messageData.rejectionReasons.map((item) => item.text)
      console.log(messageData)
      callSendRejectAPI({messageData, id})
        .then((response) => {
          console.log("Return from Update call - status 200")
          console.log(response)
          setSpinner(false)
          if (!response.success) {
            const message = `An error has occured: ${response.errorMessage}`
            throw new Error(message)
          }
          console.log("Email sent OK")
          console.log(response)
          setSubmissionData(response.data)
          setUserMessage({text:"Email sent", type:"success"})
        })
        .catch((error) => {
          setSpinner(false)
          console.log(error)
          setUserMessage({text: `${error.message}`, type:"error"})
        })
    }
  }

  // User clicked Submit Review Button
  const submitReview = () => {
    console.log("submitReview")
    const noName = newReview.name.length === 0
    const noOverallRating = !("overall" in newReview)
    if (noName || noOverallRating) {
      setReviewError("Incomplete Review: As a minimum please enter your name and an overall evaluation")
      return
    }
    setReviewError()

    // submit
    let revisedSubmissionData = { ...submissionData }
    const timestamp = moment().toISOString()
    let updatedNewReview = { ...newReview, ...{ timestamp } }
    if (revisedSubmissionData.reviews) {
      revisedSubmissionData.reviews.push(updatedNewReview)
    } else {
      revisedSubmissionData.reviews = [updatedNewReview]
    }

    const currentStatus = parseInt(revisedSubmissionData.status.charAt(0))
    if (currentStatus < 2) {
      revisedSubmissionData["status"] = "2-review"
    }
    console.log(revisedSubmissionData)

    updateSubmissionAPI(revisedSubmissionData)
      .then((response) => {
        console.log("Return from Update call - status 200")
        console.log(response)
        setSpinner(false)
        if (!response.success) {
          const message = `An error has occured: ${response.errorMessage}`
          throw new Error(message)
        }
        console.log("Submission updated OK")
        console.log(response)
        setSubmissionData(response.data)
        setNewReview(ratingTemplate)
        setUserMessage({text:"Your review has been saved", type:"success"})
      })
      .catch((error) => {
        setSpinner(false)
        console.log(error)
        setUserMessage({text: `${error.message}`, type:"error"})
    })
  }
  const handleUserMessgaeClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setUserMessage();
  };

  // User clicked NextSteps Button
  const showNextSteps = () => {
    console.log("showNextSteps")
    // setShowRejectPopUp(true)
  }
  

  return (
    <div className={classes.root}>
      <Hero companyName={company} />
      <SectionAlternate className={classes.section}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={12}>
            <CardBase withShadow align="left">
              <Submission submissionData={submissionData} />
            </CardBase>
          </Grid>
          <Grid item xs={12} md={12}>
            <CardBase withShadow align="left">
              <Reviews reviewData={reviews} newReview={newReview} updateReview={updateReview} submitReview={submitReview} shareSubmission={shareSubmission} />
              {reviewError && <Typography variant="h5" className={classes.textError}>
                {reviewError}
              </Typography>}
            </CardBase>
          </Grid>
          <Grid item xs={12} md={12}>
            <CardBase withShadow align="left">
              <Status submissionData={submissionData} showReject={showRejectSubmission} showNextSteps={showNextSteps}/>
            </CardBase>
          </Grid>
        </Grid>
        {spinner ? (<div className={classes.spinner}>
          <CircularProgress />
        </div>) : null}
      </SectionAlternate>

      <RejectPopUp open={showRejectPopUp} handleClose={closeRejectPopUp} submissionData={submissionData} />
      <SharePopUp open={showSharePopUp} handleClose={closeSharePopUp} companyName={submissionData.company} />
      <Snackbar open={!!userMessage} autoHideDuration={6000} onClose={handleUserMessgaeClose}>
        <Alert onClose={handleUserMessgaeClose} severity={userMessage ? userMessage.type : "success"}>
          {userMessage && userMessage.text} 
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ReviewSubmission;
