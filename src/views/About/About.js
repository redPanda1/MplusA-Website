import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Section, SectionAlternate } from 'components/organisms';
import {
  Services,
  Hero,
  Form,
  Story,
  Portfolio,
  News,
  Team,
} from './components';
import { Element } from "react-scroll"
import { team } from 'common/team'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '100%',
  },
  sectionNoPaddingTop: {
    paddingTop: 0,
  },
}));

const About = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Hero />
      <Element name={"about"}>
        <Section>
          <Story />
        </Section>
      </Element>
      <Element name={"services"}>
        <SectionAlternate className={classes.sectionNoPaddingTop}>
          <Services />
        </SectionAlternate>
      </Element>
      <Element name={"team"}>
        <Section>
          <Team data={team} />
        </Section>
      </Element>
      <Element name={"news"}>
        <Section>
          <News />
        </Section>
      </Element>
      <Element name={"contact"}>
        <SectionAlternate>
          <Form />
        </SectionAlternate>
      </Element>
    </div>
  );
};

export default About;
