import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid, Typography } from '@material-ui/core';
import { Image } from 'components/atoms';
import { SectionHeader } from 'components/molecules';
// import multiTask from 'assets/images/multiTask.jpg'
import rock from 'assets/images/rock.jpg'

const useStyles = makeStyles(() => ({
  image: {
    maxWidth: 420,
  },
  paragraph: {
    marginTop: '1rem'
  }
}));

const Story = props => {
  const { className, ...rest } = props;
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const subTitle = (<Typography>
    <p>
    Mentors+Angels is a group of individuals who are dedicated to helping under-represented founders fully capture the future of their start-ups.
    The team has deep business experience as senior corporate leaders, entrepreneurs and investment professionals. 
    </p>
    <p className={classes.paragraph}>
    We work collectively as a team to identify opportunities and help coach founders to success. 
    </p>
    <p className={classes.paragraph}>
    We make individual angel investments in early-stage companies, as well as bring opportunities to our investor communities.
    </p>
  </Typography>)


  return (
    <div className={className} {...rest}>
      <Grid
        container
        justify="space-between"
        spacing={isMd ? 4 : 2}
        direction={isMd ? 'row' : 'column-reverse'}
      >
        <Grid
          item
          // alignItems="center"
          // justify="flex-start"
          xs={12}
          md={6}
          data-aos='fade-right'
          data-aos-delay="600"
          data-aos-once="false"
          data-aos-easing="ease-in-sine">
          <div>
            <SectionHeader
              title="Mentors+Angels"
              subtitle={subTitle}
              align="left"
              disableGutter
              subtitleProps={{
                color: 'textPrimary',
                variant: 'body1',
              }}
            />
          </div>
        </Grid>
        <Grid
          item
          // justify={isMd ? 'flex-end' : 'flex-start'}
          // alignItems="center"
          xs={12}
          md={6}
          data-aos='fade-left'
          data-aos-delay="600"
          data-aos-once="false"
          data-aos-easing="ease-in-sine">
          <Image
            src={rock}
            alt="Our story"
            className={classes.image}
          />
        </Grid>
      </Grid>
    </div>
  );
};

Story.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default Story;
