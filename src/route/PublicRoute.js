import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import useAuth from 'hooks/useAuth'

const PrivateRoute = ({render, ...rest}) => {
    const auth = useAuth()
    return auth.userAuthenticated ? (
        <Redirect to='/admin' />
    ) : (
        <Route {...rest} render={render}/>
    )    
}

export default PrivateRoute