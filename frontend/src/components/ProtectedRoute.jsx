import {Navigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants"; /* Importing auth tokens */
import { useState, useEffect } from "react";

/* Function to check authorization */
function ProtectedRoute({children}) {
    const [isAuthorized, setIsAuthorized] = useState(null);


    /* When we load the route this function will be run which sets our authorization level */
    useEffect(() => {
        auth().catch(() => setIsAuthorized(false));
    }, [])

    /* Function to refresh token using async */
    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        /* Try-catch which sends request to api to check if the user is authorized */
        try {
           const res = await api.post("/api/token/refresh/", {refresh: refreshToken, });
            /* If the status code is 200 then the request was successful and we have got the new access token */
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuthorized(true);
            }
            else {
                setIsAuthorized(false);
            }

        }
        catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }

    }
    
    /* Function to verify the token is valid. Not very secure as this is frontend code, however the user cannot access the api anyway */
    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        /* If token is null then the user is not authorized */
        if (!token) {
            setIsAuthorized(false);
            return;
        }
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;
        
        /*Checks if the token has expired yet */
        if (tokenExpiration < now) {
            await refreshToken();
        }
        else {
            setIsAuthorized(true);
        }

    }
    
    // Gives a loading screen if the user is not yet authorized
    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }
    
    // Navigates to /login if the user is authorized
    return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
