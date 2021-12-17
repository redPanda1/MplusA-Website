import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  useMediaQuery,
  Grid
} from '@material-ui/core';

import { CardActionArea, Card, CardContent, CardMedia, Typography } from '@material-ui/core';


import { SectionHeader } from 'components/molecules';

const useStyles = makeStyles(theme => ({

  imageContainer: {
    margin: 'auto',
    height: '140px',
    padding: '20px'
  },
  cardMediaComponent: {
    objectFit:"scale-down"
  },
  cardComponent: {
    backgroundColor: "rgb(247,249,255)",
    boxShadow: "none",
    borderRadius: "13px",
  },
  cardContent: {
    height:"115px",
    paddingTop:"0px"
  },
  listItem: {
    padding: 0,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  }
}));

const Portfolio = props => {
  const { data, className, ...rest } = props;
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={className} {...rest}>
      <SectionHeader
        title="Portfolio"
        subtitle="M+A has invested into ZZ companies since 2020. This activity has created JJ jobs. From the portfolio companies, XX have gone public and YY have been acquired (see the exit listings below)."
      />
      <Grid container spacing={isMd ? 2 : 1}>
        {data.map((item, index) => {
          return (
            <Grid item xs={6} sm={6} md={3} key={index}
              data-aos-delay="500"
              data-aos-once="false"
              data-aos-easing="ease-in-sine"
              data-aos="fade-up">
              <Card sx={{ maxWidth: 345 }} className={classes.cardComponent}>
                <CardActionArea>
                  <div className={classes.imageContainer}>
                  <CardMedia
                      component="img"
                      width="100%"
                      height="100%"
                      className={classes.cardMediaComponent}
                      image = {require(`assets/images/portfolio/${item.logo}`).default}
                      alt={item.company}
                  />
                  </div>
                  <CardContent className={classes.cardContent}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>{item.Company}</strong> {item.snippet}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>


            </Grid>
          )
        })}
      </Grid>
    </div>
  );
};

Portfolio.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
  /**
   * data to be rendered
   */
  data: PropTypes.array.isRequired,
};

export default Portfolio;
