import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import makeStyles from '@mui/styles/makeStyles';
import { SectionHeader } from 'components/molecules';
import { Section } from 'components/organisms';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    background: theme.palette.primary.background,
  },
  textWhite: {
    color: 'white',
  },
  title: {
    fontWeight: 'bold',
  },
}));

const Hero = (props = {}) => {
  const { className, companyName, ...rest } = props;
  const classes = useStyles();
  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Section>
        <SectionHeader
          title={"Review Submission: " + companyName}
          subtitle="Please review submission and provide feedback"
          align="left"
          disableGutter
          titleProps={{
            className: clsx(classes.title, classes.textWhite),
            variant: 'h3',
          }}
          subtitleProps={{
            className: classes.textWhite,
          }}
        />
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
