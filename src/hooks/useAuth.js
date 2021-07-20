import {useState, useContext} from 'react'
import AuthContext from 'context/AuthContext';

const useAuth = () => useContext(AuthContext)

const useAuthProvider = () => {
    const [userAuthenticated, setUserAuthenticated] = useState(false)
    const [userData, setUserData] = useState({})

    console.log("useAuth")
    console.log(userAuthenticated)

    const logout = () => {
        // Remove Data from local storage
        localStorage.removeItem('userData');
        localStorage.removeItem('idToken');
        localStorage.removeItem('refreshToken');
        setUserAuthenticated(false)
    }
    const login = (data) => {
        console.log(data)
        // Save Data to local storage
        const { idToken, refreshToken, ...other } = data;
        localStorage.setItem('userData', JSON.stringify(other));
        localStorage.setItem('idToken', idToken);
        localStorage.setItem('refreshToken', refreshToken);
        setUserData({ ...other })
        setUserAuthenticated(true)        
    }
    const checkRefresh = () => {
        console.log("Check Refresh")
        // After a refresh if we have a valid token => keep calm and carry on
        if (!userData.givenName) {
            if (localStorage.getItem("idToken")) {
                const savedData = JSON.parse(localStorage.getItem('userData'))
                if (savedData.givenName) {
                    setUserData(savedData)
                    setUserAuthenticated(true)        
                }
            }
        }
    }

    return {userAuthenticated, logout, login, checkRefresh, userData}
}

export {useAuth as default, useAuthProvider}