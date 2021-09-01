import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ReviewBlock from './ReviewBlock';
import SharePopUp from './SharePopUp';
import RatePopUp from './RatePopUp';
import useAuth from 'hooks/useAuth'



const useStyles = makeStyles((theme) => ({
}))

const ratingTemplate = {
    name: "", userID: "", comment: "", categories: [{ name: "Team", rating: 0, comment: "" },
    { name: "Market", rating: 0, comment: "" },
    { name: "Product", rating: 0, comment: "" },
    { name: "Traction", rating: 0, comment: "" },
    { name: "Risk", rating: 0, comment: "" }]
  }
  

const Reviews = ({ companyData = {} }) => {
    const classes = useStyles()
    const {reviews = []} = companyData
    const [newReview, setNewReview] = useState(ratingTemplate);
    const [showSharePopUp, setShowSharePopUp] = useState(false);
    const [showRatePopUp, setShowRatePopUp] = useState(false);
    const [userRating, setUserRating] = useState();
    const auth = useAuth();
    const { givenName: userName, id: userID } = auth.userData

    console.log(reviews)

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
  // User clicked Rate Submission Button
  const rateApplication = () => {
    console.log("submitReview")
    setUserRating(ratingTemplate)
    setShowRatePopUp(true)
  }

  // User clicked Share Button
  const shareApplication = () => {
    console.log("shareApplication")
    setShowSharePopUp(true)
  }
  const closeSharePopUp = () => {
    setShowSharePopUp(false)
  }
  const closeRatePopUp = (rating) => {
    setShowRatePopUp(false)
    if (rating) {
      console.log(">>> update rating")
      console.log(rating)
    } else {
      console.log(">>> forget it")
    }


  }

    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs={12}>
                    {(typeof reviews != 'object' || reviews.length === 0) ?
                        (<Typography variant="h6" color="textPrimary">
                            Be the first to review
                        </Typography>) :
                        (reviews.map((review, idx) => (
                            <div key={`${idx}-${review.name}`} className={classes.reviewLine}>
                                <ReviewBlock reviewData={review} index={idx}/>
                            </div>)))
                    }
                </Grid>
                <Grid item xs={12}>
                    <Grid container direction="row" justifyContent="flex-end" alignItems="center">
                        <Grid item>
                            <Button variant="contained" color="secondary" onClick={shareApplication} className={classes.button}>
                                Share
                            </Button>
                            <Button variant="contained" color="primary" onClick={rateApplication} className={classes.button}>
                                Rate Application
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>


            </Grid>
            <SharePopUp open={showSharePopUp} handleClose={closeSharePopUp} companyName={companyData.name} />
            <RatePopUp open={showRatePopUp} handleClose={closeRatePopUp} rating={newReview}/>


        </React.Fragment>)
}

export default Reviews