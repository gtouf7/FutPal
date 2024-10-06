'use client';
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserAccess = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
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
                    setUser(data.user);
                } catch (error) {
                    console.error('Error fetching user:', error);
                }
            }
        };
        userData();
    }, []);

    return(
        <UserAccess.Provider value={{ user }}>
            { children }
        </UserAccess.Provider>
    );
}

