import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import IconButton from '@mui/material/IconButton';
import LaunchIcon from '@material-ui/icons/Launch'
import {
  useMediaQuery,
  Grid,
  Typography,
  TextField,
  Divider,
} from '@mui/material';
import FileLine from './FileLine'

const useStyles = makeStyles(theme => ({
  inputTitle: {
    fontWeight: 700,
    // marginBottom: theme.spacing(1),
  },
}));

const Submission = props => {
  const { className, submissionData, ...rest } = props;
  const classes = useStyles();

  const { email = "" } = submissionData
  const { company = "" } = submissionData
  const { problem = "" } = submissionData
  const { website = "" } = submissionData
  const { files = [] } = submissionData
  const { contact = "" } = submissionData
  const { customer = "" } = submissionData
  const { technology = "" } = submissionData
  const { solution = "" } = submissionData
  const { progress = "" } = submissionData
  const { reason = "" } = submissionData
  const { mentorship = "" } = submissionData

  let name = ""
  if (submissionData.givenName) {
      name += submissionData.givenName
      name += " "
  }
  if (submissionData.familyName) {
      name += submissionData.familyName
  }


  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={className} {...rest}>
      <Grid container spacing={isMd ? 2 : 1}>
        <Grid item xs={12}>
          <Typography variant="h6" color="textPrimary">
            Basic Information
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            Company Name
          </Typography>
          <TextField
            inputProps={{
              readOnly: Boolean(true),
              disabled: Boolean(true),
            }}
            value={company}
            placeholder="company name"
            variant="outlined"
            size="medium"
            name="companyName"
            fullWidth
            type="text"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            Website
          </Typography>
          <Grid container>
            <Grid item xs={11} md={11}>
              <TextField
                inputProps={{
                  readOnly: Boolean(true),
                  disabled: Boolean(true),
                }}
                value={website}
                placeholder="website"
                variant="outlined"
                size="medium"
                name="website"
                type="url"
                fullWidth
              />
            </Grid>
            <Grid item md={1} xs={1}>
              <IconButton
                color="primary"
                onClick={() => {
                  window.open(website, '_blank');
                }}
                size="large">
                <LaunchIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            Contact
          </Typography>
          <TextField
            inputProps={{
              readOnly: Boolean(true),
              disabled: Boolean(true),
            }}
            value={name}
            placeholder="contact Name"
            variant="outlined"
            size="medium"
            name="contactName"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            Email
          </Typography>
          <TextField
            inputProps={{
              readOnly: Boolean(true),
              disabled: Boolean(true),
            }}
            value={email}
            placeholder="email"
            variant="outlined"
            size="medium"
            name="email"
            fullWidth
            type="email"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            M+A Contact
          </Typography>
          <TextField
            inputProps={{
              readOnly: Boolean(true),
              disabled: Boolean(true),
            }}
            value={contact}
            placeholder="m+a contact Name"
            variant="outlined"
            size="medium"
            name="contactName"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" color="textPrimary">
            Files
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        {files.map((file) => (<FileLine fileUrl={file}/>))}        
        <Grid item xs={12}>
          <Typography variant="h6" color="textPrimary">
            Business Information
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>


        <Grid item xs={12}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            Business Problem
          </Typography>
          <TextField
            inputProps={{
              readOnly: Boolean(true),
              disabled: Boolean(true),
            }}
            placeholder="business problem"
            variant="outlined"
            name="problem"
            value={problem}
            fullWidth
            multiline
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            Company's Solution
          </Typography>
          <TextField
            inputProps={{
              readOnly: Boolean(true),
              disabled: Boolean(true),
            }}
            placeholder="company's solution"
            variant="outlined"
            name="solution"
            value={solution}
            fullWidth
            multiline
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            Target Customer 
          </Typography>
          <TextField
            inputProps={{
              readOnly: Boolean(true),
              disabled: Boolean(true),
            }}
            placeholder="target customer"
            variant="outlined"
            name="customer"
            value={customer}
            fullWidth
            multiline
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            Use of Technology 
          </Typography>
          <TextField
            inputProps={{
              readOnly: Boolean(true),
              disabled: Boolean(true),
            }}
            placeholder="use of technology"
            variant="outlined"
            name="technology"
            value={technology}
            fullWidth
            multiline
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            Progress 
          </Typography>
          <TextField
            inputProps={{
              readOnly: Boolean(true),
              disabled: Boolean(true),
            }}
            placeholder="progress"
            variant="outlined"
            name="progress"
            value={progress}
            fullWidth
            multiline
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" color="textPrimary">
            Challenges
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            Reason 
          </Typography>
          <TextField
            inputProps={{
              readOnly: Boolean(true),
              disabled: Boolean(true),
            }}
            placeholder="reason for contact"
            variant="outlined"
            name="reason"
            value={reason}
            fullWidth
            multiline
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            Mentorship 
          </Typography>
          <TextField
            inputProps={{
              readOnly: Boolean(true),
              disabled: Boolean(true),
            }}
            placeholder="mentorship"
            variant="outlined"
            name="mentorship"
            value={mentorship}
            fullWidth
            multiline
          />
        </Grid>
      </Grid>
    </div>
  );
};

Submission.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default Submission;
