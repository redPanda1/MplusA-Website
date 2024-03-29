import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import makeStyles from '@mui/styles/makeStyles';
import { Image } from 'components/atoms';
import { Section } from 'components/organisms';
import heroPhoto from 'assets/images/NY.jpg'
import logo from 'assets/images/logo_inv.png'
import { Grid, Typography } from '@mui/material';



const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    minHeight: 300,
    objectFit: 'cover',
    [theme.breakpoints.down('md')]: {
      width: 'auto',
    },
  },
  textWhite: {
    color: 'white',
  },
  title: {
    fontWeight: 'bold',
  },
  section: {
    position: 'absolute',
    top: '12%',
    left: '50%',
    transform: 'translate(-50%, -40%)',
    paddingTop: 0,
    paddingBottom: 0,
  },
  imageLogo: {
    maxWidth: 250,
  },
  heroTitle: {
    color: "#ffffffcc",
    fontWeight: 'bold',
    marginLeft: theme.spacing(4)
  }

}));

const Hero = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Image
        src={heroPhoto}
        alt="About"
        className={classes.image}
        lazyProps={{
          width: '100%',
          height: '100%',
        }}
      />
      <Section className={classes.section}>
      <Grid container direction="row" justifyContent="flex-start" alignItems="center" 
        data-aos="fade-up"
        data-aos-delay="300"
        data-aos-duration="800"
        data-aos-once="false"
        data-aos-easing="ease-in-sine">
        <Grid item>
        <Image
            src={logo}
            alt="M+A Logo"
            className={classes.imageLogo}
          />        
        </Grid>
        <Grid item>         
           <Typography
           variant={'h4'}
           className={classes.heroTitle}>
          Investing In Under-Represented Founders
          </Typography>
        </Grid>
      </Grid>                

      </Section>
    </div>
  );
};

Hero.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default Hero;
