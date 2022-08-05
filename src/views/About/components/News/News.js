import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { 
  useMediaQuery, 
  Avatar,
  Typography,
  Grid,
  Divider } from '@mui/material';
import { IconAlternate, SectionHeader } from 'components/molecules';
import { DescriptionListIcon, Section } from 'components/organisms';
import { CardProduct } from 'components/organisms';
import clsx from 'clsx';
import { Image } from 'components/atoms';

const useStyles = makeStyles(theme => ({
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
  cardProduct: {
    display: 'flex',
    height: '100%',
    borderRadius: theme.spacing(1),
    position: 'relative',
    '& .card-product__media': {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  },
  cardProductReverse: {
    '& .blog-content': {
      alignSelf: 'flex-end',
    },
  },
  imageContainer: {
    width: '100%',
    height: '100%',
  },
  image: {
    objectFit: 'cover',
  },
  imageCover: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'black',
    opacity: 0.3,
  },
  blogContent: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    zIndex: 3,
    maxWidth: '50%',
    [theme.breakpoints.down('xs')]: {
      maxWidth: '100%',
    },
  },
  list: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatarContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    marginRight: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  tag: {
    padding: theme.spacing(1 / 2, 1),
    borderRadius: theme.spacing(1 / 2),
    background: theme.palette.secondary.light,
    color: 'white',
    margin: theme.spacing(0, 1, 1, 0),
    cursor: 'pointer',
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(0, 2, 2, 0),
    },
  },
  textWhite: {
    color: 'white',
  },
}));

const News = ({ className, data, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const BlogMediaContent = props => (
    <div className={classes.imageContainer}>
      <Image
        {...props}
        className={classes.image}
        lazyProps={{ width: '100%', height: '100%' }}
      />
      <div className={classes.imageCover} />
    </div>
  );

  const BlogContent = props => (
    <div className={clsx(classes.blogContent, 'blog-content')}>
      <Typography variant="h5" gutterBottom className={classes.textWhite}>
        {props.title}
      </Typography>
      <Typography
        variant="subtitle1"
        gutterBottom
        className={classes.textWhite}
      >
        {props.subtitle}
      </Typography>
      {/* <div className={classes.tags}>
        {props.tags.map((item, index) => (
          <Typography
            variant="caption"
            color="primary"
            className={classes.tag}
            key={index}
          >
            {item}
          </Typography>
        ))}
      </div> */}
      <div style={{ flexGrow: 1 }} />
      <Divider className={classes.divider} />
      <div className={classes.list}>
        <div className={classes.avatarContainer}>
          <Avatar {...props.author.photo} className={classes.avatar} />
          <Typography variant="body2" className={classes.textWhite}>
            {props.author.name}
          </Typography>
        </div>
        <Typography variant="overline" className={classes.textWhite}>
          {props.date}
        </Typography>
      </div>
    </div>
  );

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
        {/* <HorizontalCover data={data} /> */}
        {/* <Grid container spacing={isMd ? 4 : 2}>
            <Grid item>Hello</Grid>
        </Grid> */}
        <Grid container spacing={isMd ? 4 : 2}>
          {data.map((item, index) => (
            <Grid item xs={12} key={index} data-aos="fade-up">
              <CardProduct
                withShadow
                liftUp
                url={item.url}
                className={clsx(
                  classes.cardProduct,
                  index % 2 !== 0 ? classes.cardProductReverse : {},
                )}
                mediaContent={
                  <BlogMediaContent {...item.cover} alt={item.title} />
                }
                cardContent={
                  <BlogContent
                    title={item.title}
                    subtitle={item.subtitle}
                    tags={item.tags}
                    author={item.author}
                    date={item.date}
                  />
                }
              />
            </Grid>
          ))}
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
