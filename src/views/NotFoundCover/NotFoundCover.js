import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Button } from '@mui/material';
import { Image } from 'components/atoms';
import { SectionHeader } from 'components/molecules';
import { HeroShaped } from 'components/organisms';

const useStyles = makeStyles(theme => ({
  root: {
    '& .hero-shaped': {
      borderBottom: 0,
    },
    '& .hero-shaped__wrapper': {
      [theme.breakpoints.up('md')]: {
        minHeight: `calc(100vh - ${theme.mixins.toolbar['@media (min-width:600px)'].minHeight}px)`,
      },
    },
  },
  formContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      maxWidth: 500,
      margin: `0 auto`,
    },
  },
  image: {
    objectFit: 'cover',
  },
  label: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
}));

const NotFoundCover = () => {
  const classes = useStyles();

  const handleClick = () => {
    window.history.back();
  };

  return (
    <div className={classes.root}>
      <HeroShaped
        leftSide={
          <div className={classes.formContainer}>
            <SectionHeader
              label="404"
              title="Uh oh."
              subtitle={
                "There’s nothing here... the page you are looking for can't be found"
              }
              titleProps={{
                variant: 'h3',
              }}
              labelProps={{
                color: 'secondary',
                className: classes.label,
                variant: 'h5',
              }}
              ctaGroup={[
                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  onClick={handleClick}
                >
                  Go Back
                </Button>,
              ]}
              disableGutter
            />
          </div>
        }
        rightSide={
          <Image
            src="https://mentorsplusangels-data.s3.amazonaws.com/images/404Error.jpg"
            className={classes.image}
            lazy={false}
          />
        }
      />
    </div>
  );
};

export default NotFoundCover;
