import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid, Typography } from '@material-ui/core';
import { Image } from 'components/atoms';
import { SectionHeader } from 'components/molecules';
import cowork from 'assets/images/cowork.png'

const useStyles = makeStyles(() => ({
  image: {
    maxWidth: 420,
  },
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
    The team has deep business experience as senior corporate leaders, entrepreneurs and investment professionals. We make individual angel investments in early-stage companies.
    We work collectively as a team to identify opportunities and help coach founders to success. In terms of investing, we make individual investment decisions, as well as to bring opportunities to our investor communities.
    We provide operating mentorship to founders from early business stages, through funding pitches and investment, and into growth phases. 
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
          container
          alignItems="center"
          justify="flex-start"
          xs={12}
          md={6}
          data-aos-delay="500"
          data-aos={'fade-right'}
        >
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
          container
          justify={isMd ? 'flex-end' : 'flex-start'}
          alignItems="center"
          xs={12}
          md={6}
          data-aos={'fade-left'}
          data-aos-delay="500"
        >
          <Image
            src={cowork}
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
