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
    <p>We are a team of individual angel investors who have come together to advise, coach and invest in underrepresented founders. M+A’s  purpose is to level the early-stage investment playing field by helping founders from diverse walks of life pitch their business propositions to early stage investors, access funding and capture the full potential of their start-ups.</p>
    <p>At M+A we work collaboratively in identifying investment opportunities and supporting founders through the fundraising process and subsequent execution, while making individual investment decisions in each funding opportunity.</p>
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
