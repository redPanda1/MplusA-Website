import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Section, SectionAlternate } from 'components/organisms';
import Button from '@material-ui/core/Button';
import {
  Contact,
  Services,
  Hero,
  Form,
  Story,
  Team,
  WhoWeAre,
} from './components';
import { Link, animateScroll, Element, scroller } from "react-scroll";

import { team, companies, mapData, gallery } from './data';

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

  const scrollToTop = () => {
    console.log("Get Here")
    animateScroll.scrollToTop()
  }
  const scrollToTeam = (ele) => {
    console.log("Get Here2")
    scroller.scrollTo(ele, {
      duration: 1000,
      delay: 100,
      smooth: true,
      offset: 50
    })
  }

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
      <Element name={"contact"}>
        <SectionAlternate>
          <Form />
        </SectionAlternate>
      </Element>
      <Button variant="contained" onClick={scrollToTop}>To the top!</Button>
      <Button variant="contained" onClick={() => scrollToTeam("team")}>To the team!</Button>

    </div>
  );
};

export default About;
