import { loginAPI } from 'requests/auth'

// Format Headers 
const jsonHeader = (auth) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    // Get token from local storage if needed
    if (auth) {
        const token = localStorage.getItem('idToken')
        headers.append('Authorization', token);
    }
    return headers
}

// Wrapper for Fetch - includes handling 401 returns
const apiFetch = async ({ url, method = "GET", auth = false }) => {
    console.log(`Calling ${url}`)
    const response = await fetch(url, { method, headers: jsonHeader(auth) })
    if (response.status === 204) {
        return { noChange: true }
    } else if (response.status === 401) {
        // Retry login 
        return retryLogin({ url, method, auth })
    } else if (!response.ok) {
        console.log("ERROR: status")
        const message = `An error has occured: ${response.status}`
        throw new Error(message)
    }

    const jsonResponse = await response.json()
    console.log(jsonResponse)
    return evaluateResponse(jsonResponse)
}

// In the case of a 401 - re-login using refresh token
const retryLogin = async ({ url, method, auth }) => {
    // Does a refresh token exist?
    const refreshToken = localStorage.getItem('refreshToken')
    if (!refreshToken) {
        throw new Error("NotAuthorizedException")
    }
    const authResponse = await loginAPI({ refreshToken })

    // Worked => save data 
    console.log(authResponse)
    if (!authResponse.success || !authResponse.data.idToken) {
        throw new Error("NotAuthorizedException")
    }
    const idToken = authResponse.data.idToken
    localStorage.setItem('idToken', idToken);

    // Now recall original API with new token
    return await retryRequest({ url, method, idToken })
}

// Now remake call (this time using new token) - any 401 is a genuine exception
const retryRequest = async ({ url, method, idToken }) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', idToken);
    
    console.log("Calling Re-try API: " + url)
    const retryResponse = await fetch(url, { method, headers })

    if (retryResponse.status === 204) {
        return { noChange: true }
    } else if (!retryResponse.ok) {
        const message = `An error has occured: ${retryResponse.status}`
        throw new Error(message)
    }

    const jsonResponse = await retryResponse.json()
    return evaluateResponse(jsonResponse)
}

// Common error checking
const evaluateResponse = (response) => {
    if (!response.success) {
        if (response.errorType) {
            throw new Error(response.errorType)
        } else if (response.errorMessage) {
            throw new Error(response.errorMessage)
        }
        const message = `An error has occured: ${JSON.stringify(response)}`
        throw new Error(message)
    }
    return response
}


export { apiFetch, jsonHeader }
