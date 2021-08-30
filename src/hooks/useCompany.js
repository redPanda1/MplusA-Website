import { useContext } from 'react'
import DataContext from '../context/DataContext'
import { getCompanyListAPI, getCompanyAPI, updateCompanyAPI, uploadLogoAPI } from 'requests/company'
import useAuth from './useAuth'

const useCompany = () => {
    const context = useContext(DataContext)
    if (context === undefined) {
        throw new Error('useCompany must be used within a DataProvider')
    }
    const { data = {}, dispatch } = context
    const { companyData, isLoading, userMessage } = data
    const auth = useAuth()

    console.log(companyData)

    const getCompanyData = async () => {
        // Check if data already loading
        if (isLoading) return

        // Check if we already have data
        if (companyData && companyData.length > 0) return

        dispatch({ type: "GET_COMPANY_DATA_START" })
        try {
            const getCompanies = await getCompanyListAPI()
            console.log("Success")
            console.log(getCompanies.data)
            dispatch({ type: "GET_COMPANY_DATA_SUCCESS", data: getCompanies.data })
        } catch (error) {
            console.log("Error")
            console.log(error)
            if (error.message === "NotAuthorizedException") {
                auth.logout()
            } else {
                dispatch({ type: "ERROR", data: { type: "error", text: error.message } })
            }
        }
    }

    const getCompany = (id) => {
        return data.companyData.find((item) => item.id === `${id}`)
    }

    // Refresh Company Data from Database
    const getCompanyDetails = async (id) => {
        // Check if data already loading
        if (isLoading) return

        dispatch({ type: "GET_COMPANY_START" })
        try {
            const response = await getCompanyAPI(id)
            console.log("Success")
            console.log(response.data)
            dispatch({ type: "GET_COMPANY_SUCCESS", data: { id, companyRecord: response.data } })
        } catch (error) {
            console.log("Error")
            console.log(error)
            if (error.message === "NotAuthorizedException") {
                auth.logout()
            } else {
                dispatch({ type: "ERROR", data: { type: "error", text: error.message } })
            }
        }
    }




    // >>>>OLD
    const updateCompanyDetails = async ({ id, details }) => {
        dispatch({ type: "COMPANY_UPDATE_START" })

        // First check if we need to upload a new Logo
        if (details.logoFile) {
            console.log(">>>NEW LOGO")
            try {
                const response = await uploadLogoAPI({ name: details.name, file: details.logoFile })
                console.log(response)
                // Update data with URL
                details.logoUrl = response.fileName
                delete details.logoFile
            } catch (error) {
                // Invalid Logo - do error stuff
                console.log(error)
                dispatch({ type: "ERROR", data: { type: "error", text: error.message } })
                return
            }
        }

        //   Now update record
        try {
            const response = await updateCompanyAPI({ id, data: { details: details } })
            console.log("Success")
            console.log(response.data)
            dispatch({ type: "COMPANY_UPDATE_SUCCESS", data: { id, companyRecord: response.data } })
        } catch (error) {
            console.log("Error")
            console.log(error)
            if (error.message === "NotAuthorizedException") {
                auth.logout()
            } else {
                dispatch({ type: "ERROR", data: { type: "error", text: error.message } })
            }
        }
    }


    const getCompanyList = () => {
        return data.company
    }




    const addCompany = (data) => {
        dispatch({ type: "ADD_COMPANY", data })
        console.log(data.company)
    }
    const test = () => {
        console.log(data)
        // dispatch({type:"TEST", data:{}})

    }

    const dismissMessage = (event, reason) => {
        if (reason === 'clickaway') return
        dispatch({ type: "NO_ERROR" })
    }

    return [{ companyData, getCompany, getCompanyDetails, getCompanyData, updateCompanyDetails, addCompany, test, userMessage, isLoading, dismissMessage }]
}

export { useCompany as default }