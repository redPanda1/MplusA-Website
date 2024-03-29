import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import {
  useMediaQuery,
  Grid
} from '@mui/material';

import { CardActionArea, Card, CardContent, CardMedia, Typography } from '@mui/material';


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
    [theme.breakpoints.down('md')]: {
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
        subtitle="M+A team members have invested into 42 early-stage companies. We preferentially invest in, and mentor audacious founders who are building early-stage technology companies and who have been historically overlooked."
      />
      <Grid container spacing={isMd ? 2 : 1}>
        {data.map((item, index) => {
          return (
            <Grid item xs={6} sm={6} md={3} key={index}
              data-aos-delay="500"
              data-aos-once="false"
              data-aos-easing="ease-in-sine"
              data-aos="fade-up">
              <a target="_blanl" href={item.website}>
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
              </a>


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
