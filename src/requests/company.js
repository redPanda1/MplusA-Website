import {apiFetch} from './requests'
import {DOMAIN} from 'common/constants'

const getCompanyListAPI = async () => {
    const url = `${DOMAIN}company/list` 
    const response = await apiFetch({url})
    return response
}
const getCompanyAPI = async (id) => {
    const url = `${DOMAIN}company?id=${id}` 
    const response = await apiFetch({url})
    return response
}
const updateCompanyAPI = async ({id, data}) => {
    const url = `${DOMAIN}company?id=${id}` 
    const body = JSON.stringify(data)
    const response = await apiFetch({method:"PUT", url, body})
    return response
}
const uploadLogoAPI = async ({name, file}) => {
    const path = "logos"
    let companyName = name.replace(/[&\\#,+()$~%.'"@:*?<>{}]/g, '')
    companyName = companyName.replaceAll(" ", "-")
    const extension = file.type.split("/")[1]
    const fileName = `${companyName}.${extension}`
    const url = `${DOMAIN}file?path=${path}&name=${fileName}` 
    const response = await apiFetch({method:"POST", url, body:file, mimeType: file.type})
    return response
}


export { getCompanyListAPI, getCompanyAPI, updateCompanyAPI, uploadLogoAPI }
