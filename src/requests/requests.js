import {DOMAIN} from 'common/constants'

// Format Headers 
const jsonHeader = ({auth, mimeType}) => {
    const headers = new Headers();
    if (mimeType) {
        headers.append('Content-Type', mimeType);
    } else{
        headers.append('Content-Type', 'application/json');
    }

    // Get token from local storage if needed
    if (auth) {
        const token = localStorage.getItem('idToken')
        headers.append('Authorization', token);
    }
    return headers
}

// Wrapper for Fetch - includes handling 401 returns
const apiFetch = async ({ url, method = "GET", auth = true, body, mimeType }) => {
    console.log(`Calling: ${url}`)
    const response = await fetch(url, { method, headers: jsonHeader({auth, mimeType}), body })
    console.log(`Response Status: ${response.status}`)
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
    console.log("Parsing JSON")
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
    const loginUrl = `${DOMAIN}auth/login?refreshToken=${refreshToken}` 
    console.log(`Calling: ${loginUrl}`)
    const authResponse = await fetch(loginUrl, { method, headers: jsonHeader(false) })
    console.log(`Response Status: ${authResponse.status}`)

    if (authResponse.status !== 200) {
        throw new Error("NotAuthorizedException")
    }
    
    // Worked => save data 
    const jsonAuthResponse = await authResponse.json()
    console.log(jsonAuthResponse)
    // Check for failure
    if (!jsonAuthResponse.success || !jsonAuthResponse.data.idToken) {
        throw new Error("NotAuthorizedException")
    }
    const idToken = jsonAuthResponse.data.idToken
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
    console.log("Evaluating Response")

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
