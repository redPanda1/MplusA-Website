import React, { useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Form } from './components';
import { SectionHeader } from 'components/molecules';
import { Section } from 'components/organisms';
import PasswordPopUp from './components/PasswordPopUp';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import useAuth from 'hooks/useAuth';
import { loginAPI, changePasswordAPI } from 'requests/auth'

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

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// // Call API to Login
// const loginAPI = async ({ userName, password }) => {
//   console.log(DOMAIN)
//   console.log("Start: loginAPI")
//   const url = `${DOMAIN}auth/login?userName=${userName}&password=${password}`
//   const headers = new Headers();
//   headers.append('Content-Type', 'application/json')
//   console.log(`Calling: ${url}`)
//   const getResponse = await fetch(url, { method: 'GET', headers: headers })

//   console.log(`loginAPI returns`)
//   if (!getResponse.ok) {
//     console.log("ERROR: status")
//     const message = `An error has occured: ${getResponse.status}`
//     throw new Error(message)
//   }
//   console.log(`No Error - parsing JSON`)
//   return await getResponse.json();
// }

// Call API to Reset Password
// const changePasswordAPI = async ({ session, userID, password }) => {
//   console.log("Start: ChangePasswordAPI")
//   const url = `${DOMAIN}auth/password/change?userID=${userID}&newPassword=${password}&session=${session}`
//   const headers = new Headers();
//   headers.append('Content-Type', 'application/json')
//   console.log(`Calling: ${url}`)
//   const getResponse = await fetch(url, { method: 'GET', headers: headers })

//   console.log(`ChangePasswordAPI returns`)
//   if (!getResponse.ok) {
//     console.log("ERROR: status")
//     const message = `An error has occured: ${getResponse.status}`
//     throw new Error(message)
//   }
//   console.log(`No Error - parsing JSON`)
//   return await getResponse.json();
// }


const SigninSimple = () => {
  const classes = useStyles();
  const auth = useAuth()

  const [userMessage, setUserMessage] = useState();
  const [spinner, setSpinner] = useState();
  const [passwordPopUp, setPasswordPopUp] = useState();

  const closePasswordPopUp = ({ data, password }) => {
    console.log(password)
    console.log(data.session)
    console.log(data.userID)
    setUserMessage();
    setPasswordPopUp(false)
    setSpinner(true)

    // const session = data.session
    // const userName = 

    changePasswordAPI({ session: data.session, userID: data.userID, password })
      .then((response) => {
        console.log("Return from Reset Password - status 200")
        console.log(response)
        setSpinner(false)
        if (!response.success) {
          // Show message
          let message = "An error has occured, pleasee try again"
          if (response.errorMessage) {
            message = `${response.errorMessage}`
          }
          throw new Error(message)
        }
        console.log("Change Password OK")
        console.log(response.data)
        setUserMessage({ text: `Password Updated Successfully`, type: "success" })
      })
      .catch((error) => {
        setSpinner(false)
        console.log(error)
        setUserMessage({ text: `${error.message}`, type: "error" })
      })
  }

  const handleUserMessgaeClose = (event, reason) => {
    if (reason === 'clickaway') return
    setUserMessage();
  }

  const handleLogin = ({ email, password }) => {
    console.log(email)
    console.log(password)
    setSpinner(true)
    loginAPI({ userName: email, password })
      .then((response) => {
        console.log("Success")
        console.log(response)
        console.log(response.errorType)
        setSpinner(false)
        // Check for new password
        if (response.errorType === "NEW_PASSWORD_REQUIRED") {
          setUserMessage({ text: "A Password Reset is Required", type: "warning" })
          setPasswordPopUp({ data: response.data })
        } else {
          auth.login(response.data)
        }
      })
      .catch((error) => {
        console.log("error")
        console.log(error.message)
        // Check for exception
        setSpinner(false)
        let errorMessage = error.message
        if (error.message === "NotAuthorizedException") {
          errorMessage = "Invalid Credentials - Please Try Again"
        }
        setUserMessage({ text: errorMessage, type: "error" })
      })
  }

  return (
    <div>
      <Section className={classes.section}>
        <div className={classes.formContainer}>
          <SectionHeader
            title="Sign in"
            titleProps={{
              variant: 'h3',
            }}
          />
          <Form login={handleLogin} spinner={spinner} />
        </div>
      </Section>
      <PasswordPopUp open={!!passwordPopUp} data={passwordPopUp} handleClose={closePasswordPopUp} />
      {!!userMessage && (
        <Snackbar open={!!userMessage} autoHideDuration={6000} onClose={handleUserMessgaeClose}>
          <Alert onClose={handleUserMessgaeClose} severity={userMessage ? userMessage.type : "success"}>
            {userMessage && userMessage.text}
          </Alert>
        </Snackbar>
      )}

    </div>
  );
};

export default SigninSimple;
