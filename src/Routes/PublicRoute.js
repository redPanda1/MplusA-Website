import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import useAuth from 'hooks/useAuth'

const PrivateRoute = ({render, ...rest}) => {
    const auth = useAuth()
    console.log("PRivate Route")
    console.log(auth.userAuthenticated)

    return auth.userAuthenticated ? (
        <Redirect to='/admin' />
    ) : (
        <Route {...rest} render={render}/>
    )    
}

    // return <Route {...rest} component={(props) => (
    //     <Component {...props} />
    // )
    // })


export default PrivateRoute