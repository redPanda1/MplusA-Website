import React, { useReducer } from 'react'

const DataContext = React.createContext()
const contextTemplate = { company: [], isLoading: false, userMessage: undefined }

const dataReducer = (state, action) => {
  console.log("Reducer called: " + action.type)
  console.log(action.data)
  switch (action.type) {
    case 'ADD_COMPANY': {
      return { ...state, company: [...state.company, action.data] }
    }
    // case 'POPULATE_COMPANIES_START': {
    //   return { ...state, isLoading: true }
    // }
    case 'POPULATE_COMPANIES_SUCCESS': {
      return { ...state, company: [...state.company, ...action.data] }
    }
    case 'GET_COMPANY_START': {
      return { ...state, isLoading: true }
    }
    case 'GET_COMPANY_SUCCESS': {
      // Check id doesn't exist & then add returned data
      let otherCompanies = state.company.filter(({id}) => id !== action.data.id)
      return { ...state, isLoading: false, userMessage: undefined,
        company: [...otherCompanies, action.data.companyRecord] }
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
    case 'TEST': {
      return state
    }
    case 'ERROR': {
      return { ...state, isLoading: false, userMessage: action.data }
    }
    case 'NO_ERROR': {
      return { ...state, isLoading: false, userMessage: undefined }
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
