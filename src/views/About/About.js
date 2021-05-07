import React, {useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Section, SectionAlternate } from 'components/organisms';
import {
  Contact,
  Services,
  Hero,
  Form,
  Story,
  Team,
  WhoWeAre,
} from './components';
import { Link, animateScroll as scroll } from "react-scroll";

import { team, companies, mapData, gallery } from './data';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '100%',
  },
  sectionNoPaddingTop: {
    paddingTop: 0,
  },
  sectionPartners: {
    boxShadow: '0 5px 20px 0 rgba(90, 202, 157, 0.05)',
    '& .section-alternate__content': {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
    },
  },
}));

const About = () => {
  const classes = useStyles();
  const refAbout = React.createRef()
  const refContact = React.createRef()

  return (
    <div className={classes.root}>
      <Hero />
      <Section ref={refAbout}>
        <Story />
      </Section>
      <SectionAlternate  title={"who"} className={classes.sectionNoPaddingTop}>
        <Services />
      </SectionAlternate>
      <Section title={"team"}>
        <Team data={team} />
      </Section>
      <SectionAlternate  ref={refContact}>
        <Form />
      </SectionAlternate>
    </div>
  );
};

export default About;
