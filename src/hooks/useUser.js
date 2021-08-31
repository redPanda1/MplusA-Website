import { useContext } from 'react'
import DataContext from '../context/DataContext'
import { getUserListAPI, lockUserAPI, resetUserPasswordAPI } from 'requests/auth'
import useAuth from './useAuth'

const useUser = () => {
    const context = useContext(DataContext)
    if (context === undefined) {
        throw new Error('useUser must be used within a DataProvider')
    }
    const { data = {}, dispatch } = context
    const { userData, isLoading, userMessage } = data
    const auth = useAuth()
 
    const getUserData = async () => {
        // Check if data already loading
        if (isLoading) return
        // Check if we already have data
        if (userData && userData.length > 0) return

        dispatch({ type: "GET_USER_DATA_START" })
        try {
            const getUserDataResponse = await getUserListAPI()
            dispatch({ type: "GET_USER_DATA_SUCCESS", data: getUserDataResponse.data })
        } catch (error) {
            processError(error)        
        }
    }

    const lockUser = async ({id}) => {
        dispatch({type:"LOCK_USER_START"})
        try {
            const lockUserResponse = await lockUserAPI({id})
            dispatch({ type: "LOCK_USER_SUCCESS", id, data:lockUserResponse.data})
        } catch (error) {
            processError(error)        
        }
    }

    const resetUserPassword = async ({userName}) => {
        dispatch({type:"RESET_USER_PASSWORD_START"})
        try {
            const resetPasswordResponse = await resetUserPasswordAPI({userName})
            dispatch({ type: "RESET_USER_PASSWORD_SUCCESS"})
        } catch (error) {
            processError(error)        
        }        
    }

    const processError = (error) => {
        console.log("Error")
        console.log(error)
        if (error.message === "NotAuthorizedException") {
            auth.logout(dispatch)
        } else {
            dispatch({ type: "ERROR", data: { type: "error", text: error.message } })
        }
    }

    const dismissMessage = (event, reason) => {
        if (reason === 'clickaway') return
          dispatch({type:"NO_ERROR"})    
    }

    return [{ userData, userMessage, isLoading, getUserData, lockUser, resetUserPassword, dismissMessage }]
}

export { useUser as default }