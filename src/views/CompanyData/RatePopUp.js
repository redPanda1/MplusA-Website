import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import { DialogTitle, DialogContent, DialogActions } from 'common/ui'
import ReviewItem from './ReviewItem';
import { OverallItem } from './OverallItem';

const useStyles = makeStyles((theme) => ({
  entryField: { marginBottom: theme.spacing(4) }
}));


const RatePopUp = ({ open, handleClose, rating }) => {
  const classes = useStyles()
  const [newRating, setNewRating] = useState()

  console.log(rating)
  useEffect(()=>{
    console.log("Hello Sweetie")
    setNewRating(rating)
  },[rating])

  const updateReview = (data) => {  
    console.log(data)
    if (data.categories) {
      const updatedRatings = newRating.categories.map((item) => {
        if (item.name === data.categories.name) {
          return { ...item, ...data.categories }
        } else {
          return item
        }
      })
      let newData = { ...newRating }
      newData.categories = updatedRatings
      setNewRating(newData)
    } else {
      setNewRating({ ...newRating, ...data })
    }
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="rate-pop-up" onClose={handleClose}>
          Rate Submission
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            Please rate the company on the following categories and overall (if you recommend that the company continues or is rejected):
          </DialogContentText>
            {newRating && 
            newRating.categories.map((item, idx) => <ReviewItem key={idx} name={item.name} data={item} updateReview={updateReview} />)}
            <OverallItem ratingData={newRating} updateReview={updateReview} />
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => handleClose()}>
            Cancel
          </Button>
          <Button onClick={(e) => handleClose(rating)}>
            Rate
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default RatePopUp