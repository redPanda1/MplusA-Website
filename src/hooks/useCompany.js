import { useState, useContext } from 'react'
import DataContext from '../context/DataContext'
import { getCompanyListAPI, getCompanyAPI, updateCompanyAPI, uploadLogoAPI } from 'requests/company'
import useAuth from './useAuth'



const useCompany = () => {
    const context = useContext(DataContext)
    if (context === undefined) {
        throw new Error('useCompany must be used within a DataProvider')
    }
    const { data = {}, dispatch } = context
    console.log("useCompany - context")
    console.log(context)
    const auth = useAuth()

    const refreshCompanyData = async () => {
        if (data.company && data.company.length > 0) {
            return
        }

        // dispatch({type:"POPULATE_COMPANIES_START"})
        try {
            const getCompanies = await getCompanyListAPI()
            console.log("Success")
            console.log(getCompanies.data)
            await dispatch({ type: "POPULATE_COMPANIES_SUCCESS", data: getCompanies.data })
            return true
        } catch (error) {
            console.log("Error")
            console.log(error)
            if (error.message === "NotAuthorizedException") {
                auth.logout()
            } else {
                // await dispatch({type:"ERROR", data: {type:"error", text: error.message}})
            }
            return false
        }
    }

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

    const getCompany = (id) => {
        const companyRecord = data.company.find((item) => item.id === `${id}`)
        if (companyRecord) {
            // dispatch({type:"NO_ERROR"})
            return companyRecord
        } else {
            console.log("Company MISSING")
            // dispatch({type:"ERROR", data:{type:"error", text:"Company not found"}})
            return undefined
        }
    }

    // Refresh Company Data from Database
    const refreshCompany = async (id) => {
        dispatch({ type: "GET_COMPANY_START" })
        // setIsLoading(true)
        try {
            const response = await getCompanyAPI(id)
            console.log("Success")
            console.log(response.data)
            dispatch({ type: "GET_COMPANY_SUCCESS", data: { id, companyRecord: response.data } })
            // setIsLoading(false)
        } catch (error) {
            // setIsLoading(false)
            console.log("Error")
            console.log(error)
            if (error.message === "NotAuthorizedException") {
                auth.logout()
            } else {
                dispatch({ type: "ERROR", data: { type: "error", text: error.message } })
                // setUserMessage({type:"error", text: error.message})
            }
        }


    }



    const addCompany = (data) => {
        dispatch({ type: "ADD_COMPANY", data })
        console.log(data.company)
    }
    const test = () => {
        console.log(data)
        // dispatch({type:"TEST", data:{}})

    }

    return [{ getCompany, getCompanyList, refreshCompany, refreshCompanyData, updateCompanyDetails, addCompany, test }]
}

export { useCompany as default }