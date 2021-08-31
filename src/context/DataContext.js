import React, { useReducer } from 'react'

const DataContext = React.createContext()
const contextTemplate = { companyData: [], userData: [], isLoading: false, userMessage: undefined }

const dataReducer = (state, action) => {
  console.log("Reducer called: " + action.type)
  if (action.data) console.log(action.data)
  switch (action.type) {
    case 'GET_COMPANY_DATA_START': 
    case 'GET_COMPANY_START': 
    case 'COMPANY_UPDATE_START':
    case 'GET_USER_DATA_START': 
    case 'RESET_USER_PASSWORD_START': 
    case 'LOCK_USER_START': {
      return { ...state, isLoading: true, userMessage: undefined }
    }
    case 'GET_COMPANY_DATA_SUCCESS': {
      return { ...state, companyData: action.data, isLoading: false, userMessage: {type:"success", text: "Data retrieved OK" }}
    }
    case 'GET_COMPANY_SUCCESS': {
      let otherCompanies = state.companyData.filter(({id}) => id !== action.data.id)
      return { ...state, isLoading: false, userMessage: {type:"success", text: "Data retrieved OK" },
        companyData: [...otherCompanies, action.data.companyRecord] }
    }
    case 'COMPANY_UPDATE_SUCCESS': {
      let otherCompanies = state.companyData.filter(({id}) => id !== action.data.id)
      return { ...state, isLoading: false, userMessage: {type:"success", text: "Company data saved" },
        companyData: [...otherCompanies, action.data.companyRecord] }
    }
    case 'GET_USER_DATA_SUCCESS': {
      return { ...state, userData: action.data, isLoading: false, userMessage: {type:"success", text: "Data retrieved OK" }}
    }
    case 'RESET_USER_PASSWORD_SUCCESS': {
      return { ...state, isLoading: false, userMessage: {type:"success", text: "User's password has been reset and email confirmation sent." }}
    }
    case 'LOCK_USER_SUCCESS': {
      const active = action.data.active
      const newUserData = state.userData.map((item) => {
        if (item.id === action.id) {
          return {...item, active}
        } else {
          return item
        }
      })
      return { ...state, userData: newUserData, isLoading: false, userMessage: {type:"success", text: active ? "User Unlocked" : "User Locked" }}
    }
    case 'ERROR': {
      return { ...state, isLoading: false, userMessage: {type:"error", text: action.data} }
    }
    case 'NO_ERROR': {
      return { ...state, isLoading: false, userMessage: undefined }
    }
    case 'LOGOUT': {
      return contextTemplate
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
