import {apiFetch} from './requests'
import {DOMAIN} from 'common/constants'

const loginAPI = async ({userName, password, refreshToken}) => {
    const url = refreshToken ? `${DOMAIN}auth/login?refreshToken=${refreshToken}` :
                               `${DOMAIN}auth/login?userName=${userName}&password=${password}`
    console.log(`Calling: ${url}`)
    
    const getResponse = await apiFetch({url})
    console.log(getResponse)
    return getResponse
}
const changePasswordAPI = async ({session, userID, password}) => {
    const url = `${DOMAIN}auth/password/change?userID=${userID}&newPassword=${password}&session=${session}`
    console.log(`Calling: ${url}`)
    
    const getResponse = await apiFetch({url})
    console.log(getResponse)
    return getResponse
      
}


export { loginAPI, changePasswordAPI }


