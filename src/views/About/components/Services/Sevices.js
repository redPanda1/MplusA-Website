import React from 'react';
import PropTypes from 'prop-types';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { useMediaQuery, Grid, Typography, colors } from '@material-ui/core';
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
    icon: 'fas fa-handshake',
    title: 'Advise',
    subtitle:
      'Provide advice and on-going business guidance in portfolio companies. We are advisors and board members in a number of early-stage companies, public companies and non-profits. We leverage our vertical industry expertise to help on strategy, team and execution.',
  },
  {
    icon: 'fas fa-hand-holding-usd',
    title: 'Invest',
    subtitle:
      "Make angel investments through several angel groups as well as independently. We are associated, amongst other angel investment and mentoring groups, with NY Angels, Harvard Angels, Astia Angels , Broad Street Angels and 1863.",
  },
];
const Services = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
   
  const title = (
    <Typography variant="h4" component="span" className={classes.fontWeight900}>
      What We Do
    </Typography>
  );

  return (
    <div className={className} {...rest}>
      <Section narrow className={classes.noPaddingBottom}>
        <SectionHeader
          title={"What We Do"}
          align="center"
          titleProps={{
            color: 'textPrimary',
          }}
          data-aos="fade-up"
        />
      </Section>
      <Section className={classes.noPaddingTop}>
        <Grid container spacing={isMd ? 4 : 2}>
          {data.map((item, index) => (
            <Grid key={index} item xs={12} sm={4} data-aos={'fade-up'}>
              <DescriptionListIcon
                title={item.title}
                subtitle={item.subtitle}
                icon={
                  <IconAlternate
                    fontIconClass={item.icon}
                    size="medium"
                    color={colors.indigo}
                  />
                }
                align="left"
              />
            </Grid>
          ))}
        </Grid>
      </Section>
    </div>
  );
};

Services.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default Services;
