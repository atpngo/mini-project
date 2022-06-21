import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export default AuthContext;


export const AuthProvider = ({children}) => 
{
     
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null);
    const navigate = useNavigate();

    let loginUser = async (e) =>
    {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        let payload = new FormData();
        payload.append('username', data.get('username'));
        payload.append('password', data.get('password'));
        axios.post('http://localhost:8000/api/token/', payload)
            .then(res => 
                {
                    if (res.status == 200)
                    {
                        setAuthTokens(res.data);
                        setUser(jwt_decode(res.data.access));
                        localStorage.setItem('authTokens', JSON.stringify(res.data));
                        // navigate('/map');
                    }
                    else
                    {
                        alert("Something went wrong!");
                    }
                })
            .catch(err =>
                {
                    alert("Something went wrong!");
                })
        
    }

    let logoutUser = () => 
    {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        navigate('/');
    }

    let contextData = {
        user:user,
        loginUser:loginUser,
        logoutUser:logoutUser
    }

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
}