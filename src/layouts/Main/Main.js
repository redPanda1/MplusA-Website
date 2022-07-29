import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Divider } from '@mui/material';
import { Topbar, Footer } from './components';
import {
  Services,
  Hero,
  Form,
  Portfolio,
  Story,
  News,
  Team,
} from 'views/About/components';
import { animateScroll, Element, scroller } from "react-scroll";
import { team, portfolio } from 'views/About/data';
import { Section, SectionAlternate } from 'components/organisms';


const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
  },
  sectionNoPaddingTop: {
    paddingTop: 0,
  },
}));

const Main = () => {
  const classes = useStyles();

  const scrollTo = (ele) => {
    if (ele === "top") {
      animateScroll.scrollToTop()
    } else {
      scroller.scrollTo(ele, {
        duration: 1000,
        delay: 100,
        smooth: true,
        offset: 50
      })
    }
  }

  return (
    <div>
      <Topbar scrollTo={scrollTo} />
      <main>
        <Divider />
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
        {/* <Element name={"news"}>
          <SectionAlternate className={classes.sectionNoPaddingTop}>
            <News />
          </SectionAlternate>
        </Element> */}
        <Element name={"portfolio"}>
          <Section>
            <Portfolio data={portfolio} />
          </Section>
        </Element>
        <Element name={"contact"}>
          <SectionAlternate>
            <Form />
          </SectionAlternate>
        </Element>
      </main>
      <Footer scrollTo={scrollTo} />
    </div>
  );
};

export default Main;
