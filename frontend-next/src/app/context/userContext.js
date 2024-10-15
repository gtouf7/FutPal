'use client';
import { createContext, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const router = useRouter();
    
    const userData = useCallback(async () => {
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
                //console.log('data:', data);
                setUser(prevUser => prevUser !== data.user ? data.user : prevUser);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        } else {
            router.push('/');
        }
        setLoading(false); // Remove loading when content is fetched
    }, [router]);

    useEffect(() => {
        userData();
    }, [userData]);

    return(
        <UserContext.Provider value={{ user, loading, refresh: userData }}>
            { children }
        </UserContext.Provider>
    );
}

