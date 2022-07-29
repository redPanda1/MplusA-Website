import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { SectionHeader } from 'components/molecules';
import { Section } from 'components/organisms';
import ConnectTest from './ConnectTest'
import UploadTest from './UploadTest'


const useStyles = makeStyles(theme => ({
  formContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: `calc(100vh - ${theme.mixins.toolbar['@media (min-width:600px)'].minHeight}px)`,
    maxWidth: 500,
    margin: `0 auto`,
  },
  section: {
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

const Troubleshoot = () => {
  const classes = useStyles();

  return (
    <div>
      <Section className={classes.section}>
        <SectionHeader
          title="Troubleshooting"
          subtitle="Tests for server connectivity:"
          titleProps={{
            variant: 'h3',
          }}
        />
        <ConnectTest />
        <UploadTest />
      </Section>
    </div>
  );
};

export default Troubleshoot;
