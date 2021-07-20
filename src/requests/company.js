import {apiFetch} from './requests'
import {DOMAIN} from 'common/constants'

const getCompanyListAPI = async () => {
    console.log("Call getCompanyList API: ")
    const url = `${DOMAIN}company/list` 
    console.log(`Calling: ${url}`)
    
    const getResponse = await apiFetch({url, auth:true})
    console.log(getResponse)
    return getResponse

}


export { getCompanyListAPI }
