import { useContext } from 'react'
import DataContext from '../context/DataContext'
import { getUserListAPI } from 'requests/auth'
import useAuth from './useAuth'

const useUser = () => {
    const context = useContext(DataContext)
    if (context === undefined) {
        throw new Error('useUser must be used within a DataProvider')
    }
    const { data = {}, dispatch } = context
    const { userData, isLoading, userMessage } = data
    const auth = useAuth()
 
    console.log(userData)

    const getUserData = async () => {
        // Check if data already loading
        if (isLoading) return

        // Check if we already have data
        if (userData && userData.length > 0) return

        dispatch({ type: "GET_USER_DATA_START" })
        try {
            const getUserDataResponse = await getUserListAPI()
            console.log("Success")
            console.log(getUserDataResponse.data)
            dispatch({ type: "GET_USER_DATA_SUCCESS", data: getUserDataResponse.data })
        } catch (error) {
            console.log("Error")
            console.log(error)
            if (error.message === "NotAuthorizedException") {
                auth.logout()
            } else {
                dispatch({type:"ERROR", data: {type:"error", text: error.message}})
            }
        }
    }

    const dismissMessage = (event, reason) => {
        if (reason === 'clickaway') return
          dispatch({type:"NO_ERROR"})    
    }

    return [{ userData, userMessage, isLoading, getUserData, dismissMessage }]
}

export { useUser as default }