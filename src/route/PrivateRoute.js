import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import useAuth from 'hooks/useAuth'

const PrivateRoute = ({render, ...rest}) => {
    const auth = useAuth()
    
    console.log("PRivate Route")
    console.log(auth.userAuthenticated)

    return auth.userAuthenticated ? (
        <Route {...rest} render={render}/>
    ) : (
        <Redirect to='/admin/login' />
    )    
}

export default PrivateRoute