'use client';
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [ loading, setLoading ] = useState(true);

    
    const userData = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await fetch('api/getUser', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                const data = await response.json();
                console.log('data:', data);
                setUser(data.user);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        }
        setLoading(false); // Remove loading when content is fetched
    };
    useEffect(() => {
        userData();
    }, []);

    return(
        <UserContext.Provider value={{ user, loading, refresh: userData }}>
            { children }
        </UserContext.Provider>
    );
}

