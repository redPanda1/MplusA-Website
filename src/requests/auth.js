import {apiFetch} from './requests'
import {DOMAIN} from 'common/constants'

const loginAPI = async ({userName, password, refreshToken}) => {
    const url = refreshToken ? `${DOMAIN}auth/login?refreshToken=${refreshToken}` :
                               `${DOMAIN}auth/login?userName=${userName}&password=${password}`
    console.log(`Calling: ${url}`)
    
    const getResponse = await apiFetch({url, auth:false})
    console.log(getResponse)
    return getResponse
}
const changePasswordAPI = async ({session, userID, password}) => {
    const url = `${DOMAIN}auth/password/change?userID=${userID}&newPassword=${password}&session=${session}`
    console.log(`Calling: ${url}`)
    
    const getResponse = await apiFetch({url, auth:true})
    console.log(getResponse)
    return getResponse
      
}
const getUserListAPI = async () => {
    const url = `${DOMAIN}auth/user/list` 
    const response = await apiFetch({url})
    return response
}

const lockUserAPI = async ({id}) => {
    const url = `${DOMAIN}auth/user/lock?id=${id}` 
    const response = await apiFetch({url})
    return response
}

const resetUserPasswordAPI = async ({userName}) => {
    const url = `${DOMAIN}auth/password/reset?userName=${userName}` 
    const response = await apiFetch({url, auth:true, method:"POST"})
    return response
}


export { loginAPI, changePasswordAPI, getUserListAPI, lockUserAPI, resetUserPasswordAPI }


