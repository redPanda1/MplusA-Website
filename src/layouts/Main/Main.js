import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import { Topbar, Footer } from './components';
import {
  Services,
  Hero,
  Form,
  Story,
  Team,
} from 'views/About/components';
import { animateScroll, Element, scroller } from "react-scroll";
import { team } from 'views/About/data';
import { Section, SectionAlternate } from 'components/organisms';



const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
  },
  sectionNoPaddingTop: {
    paddingTop: 0,
  },
}));

const Main = ({ children, themeToggler, themeMode }) => {
  const classes = useStyles();
  const pages = {
        company: {
          groupTitle: 'Company',
          pages: [
            {
              title: 'About',
              href: '/about',
            }
          ],
        }
  };

  // const [openSidebar, setOpenSidebar] = useState(false);

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


  // const handleSidebarOpen = () => {
  //   setOpenSidebar(true);
  // };

  // const handleSidebarClose = () => {
  //   setOpenSidebar(false);
  // };

  // const open = isMd ? false : openSidebar;

  return (
    // <div
    //   className={clsx({
    //     [classes.root]: true,
    //   })}
    // >
      <div>
      <Topbar pages={pages} scrollTo={scrollTo}/>
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
      <Element name={"contact"}>
        <SectionAlternate>
          <Form />
        </SectionAlternate>
      </Element>
      </main>
      <Footer pages={pages} scrollTo={scrollTo} />
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node,
  themeToggler: PropTypes.func.isRequired,
  themeMode: PropTypes.string.isRequired,
};

export default Main;
