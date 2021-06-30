import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  useMediaQuery,
  Grid,
  Typography,
  TextField,
  Divider,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  inputTitle: {
    fontWeight: 700,
    // marginBottom: theme.spacing(1),
  },
  flexGrow: {
    flexGrow: 1,
  },
}));

const Rate = props => {
  const { className, submissionData = {}, ...rest } = props;
  const classes = useStyles();
  const { problem = "" } = submissionData
  const { progress = "" } = submissionData
  const { reason = "" } = submissionData
  const { mentorship = "" } = submissionData

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={className} {...rest}>
      <Grid container spacing={isMd ? 2 : 1} width="100%">
        <Grid item xs={12}>
          <Typography variant="h6" color="textPrimary">
            Basic Information
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

Rate.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default Rate;
