import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { useMediaQuery, Grid, colors } from '@mui/material';
import { IconAlternate, SectionHeader } from 'components/molecules';
import { DescriptionListIcon, Section } from 'components/organisms';

const useStyles = makeStyles(() => ({
  fontWeight900: {
    fontWeight: 900,
  },
  noPaddingBottom: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  noPaddingTop: {
    paddingTop: 0,
  },
}));

const data = [
  {
    icon: 'fas fa-graduation-cap',
    title: 'Mentor',
    subtitle:
      'Work with entrepreneurs to strengthen their pitches for early-stage investors. Provide input on business proposition, product/service, raise/valuation and financials.  Review pitch deck and provide feedback on presentation and supporting materials.',
  },
  {
    icon: 'fas fa-hand-holding-usd',
    title: 'Invest',
    subtitle:
      "Make angel investments through several Angel groups as well as independently. We are associated, amongst other angel investment and mentoring groups, with New York Angels, Harvard Business School Angels, Astia Angels , Broad Street Angels and 1863.",
  },
  {
    icon: 'fas fa-handshake',
    title: 'Advise',
    subtitle:
      'Provide advice and on-going business guidance to portfolio companies. We leverage our vertical industry expertise and business contacts to help with strategy, team and execution.',
  }
];
const News = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
   
  return (
    <div className={className} {...rest}>
      <Section narrow className={classes.noPaddingBottom}>
        <SectionHeader
          title={"News"}
          align="center"
          titleProps={{
            color: 'textPrimary',
          }}
          data-aos="fade-up"
        />
      </Section>
      <Section className={classes.noPaddingTop}>
        <Grid container spacing={isMd ? 4 : 2}>
            <Grid item>Hello</Grid>
        </Grid>
      </Section>
    </div>
  );
};

News.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default News;
