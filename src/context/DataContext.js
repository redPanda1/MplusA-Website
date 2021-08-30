import React, { useReducer } from 'react'

const DataContext = React.createContext()
const contextTemplate = { companyData: [], userData: [], isLoading: false, userMessage: undefined }

const dataReducer = (state, action) => {
  console.log("Reducer called: " + action.type)
  console.log(action.data)
  switch (action.type) {
    case 'GET_COMPANY_DATA_START': {
      return { ...state, isLoading: true, userMessage: undefined }
    }
    case 'GET_COMPANY_DATA_SUCCESS': {
      return { ...state, companyData: action.data, isLoading: false, userMessage: {type:"success", text: "Data retrieved OK" }}
    }
    case 'GET_COMPANY_START': {
      return { ...state, isLoading: true, userMessage: undefined }
    }
    case 'GET_COMPANY_SUCCESS': {
      // Check id doesn't exist & then add returned data
      let otherCompanies = state.companyData.filter(({id}) => id !== action.data.id)
      return { ...state, isLoading: false, userMessage: {type:"success", text: "Data retrieved OK" },
        companyData: [...otherCompanies, action.data.companyRecord] }
    }
    case 'GET_USER_DATA_START': {
      return { ...state, isLoading: true, userMessage: undefined }
    }
    case 'GET_USER_DATA_SUCCESS': {
      return { ...state, userData: action.data, isLoading: false, userMessage: {type:"success", text: "Data retrieved OK" }}
    }
    case 'ERROR': {
      return { ...state, isLoading: false, userMessage: {type:"error", text: action.data} }
    }
    case 'NO_ERROR': {
      return { ...state, isLoading: false, userMessage: undefined }
    }


// OLD>>>>>>>>>>>>>>
    
    case 'ADD_COMPANY': {
      return { ...state, company: [...state.companyData, action.data] }
    }
    // case 'POPULATE_COMPANIES_START': {
    //   return { ...state, isLoading: true }
    // }
    case 'POPULATE_COMPANIES_SUCCESS': {
      return { ...state, company: [...state.companyData, ...action.data] }
    }
    case 'GET_COMPANY_DATA_START': {
      return { ...state, isLoading: true }
    }
    case 'COMPANY_UPDATE_START': {
      return { ...state, isLoading: true }
    }
    case 'COMPANY_UPDATE_SUCCESS': {
      // Check id doesn't exist & then add returned data
      let otherCompanies = state.company.filter(({id}) => id !== action.data.id)
      return { ...state, isLoading: false, userMessage: {type:"success", text:"Company Details Updated"},
        company: [...otherCompanies, action.data.companyRecord] }
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const DataProvider = ({ children }) => {
  const [data, dispatch] = useReducer(dataReducer, contextTemplate)
  return (<DataContext.Provider value={{ data, dispatch }}>
    {children}
  </DataContext.Provider>)
}



export { DataContext as default, DataProvider }
