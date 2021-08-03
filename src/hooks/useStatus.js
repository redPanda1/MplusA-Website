import { useContext } from 'react'
import DataContext from 'context/DataContext'


const useStatus = () => {
    const context = useContext(DataContext)
    if (context === undefined) {
        throw new Error('useCompany must be used within a DataProvider')
    }
    const { data: { isLoading, userMessage }, dispatch } = context

    const resetUserMessage = () => dispatch({ type: "NO_ERROR" })


    return { isLoading, userMessage, resetUserMessage }
}

export { useStatus as default, }