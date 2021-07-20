import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Button, TextField, CircularProgress } from '@material-ui/core';
import {Link} from 'react-router-dom'
import validate from 'validate.js';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
}));

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 300,
    },
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 6,
    },
  },
};

const Form = ({login, spinner}) => {
  const classes = useStyles();

  const [formState, setFormState] = React.useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  React.useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (formState.isValid) {
      console.log("Hot to trot!")
      console.log(formState)
      login(formState.values)
    }

    setFormState(formState => ({
      ...formState,
      touched: {
        ...formState.touched,
        ...formState.errors,
      },
    }));
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <form name="login-form" method="post" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              placeholder="user name"
              label="User Name *"
              variant="outlined"
              size="medium"
              name="email"
              disabled={spinner}
              fullWidth
              helperText={hasError('email') ? formState.errors.email[0] : null}
              error={hasError('email')}
              onChange={handleChange}
              type="email"
              value={formState.values.email || ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              placeholder="password"
              label="Password *"
              variant="outlined"
              size="medium"
              name="password"
              fullWidth
              disabled={spinner}
              helperText={
                hasError('password') ? formState.errors.password[0] : null
              }
              error={hasError('password')}
              onChange={handleChange}
              type="password"
              value={formState.values.password || ''}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              size="large"
              variant="contained"
              type="submit"
              color="primary"
              fullWidth
              disabled={spinner}
            >
              {spinner ? <CircularProgress size={20} color="inherit" /> : "Sign In"}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              align="center"
            >
              Forgot your password?{' '}
              <Link to="/admin/password-reset" >
              Reset Password
              </Link>
            </Typography>

          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Form;
