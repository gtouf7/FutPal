'use client';
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styles from './dashboard.module.css';

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState('');
    const [ error, setError] = useState('');
     // User authorization function to see if the user is logged in
    function userAuth() {
        useEffect(() => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login'); // If there is no token this page will be inaccessible and will redirect the user to the login page
            }
        }, [router]);
    }

    
    async function fetchUser() {
        const token = localStorage.getItem('token');
        console.log('before fetch', token);
        try {
            const response = await fetch('http://localhost:7700/api/getUser', {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                setUser(data.user);
            } else {
                setError('Error getting user');
            }
        } catch (error) {
            setError('Internal server error.');
        }
    }
    // Logout user
    function logOut() {
        localStorage.removeItem('token');
        //console.log('User signed out successfully!'); //debugging
        router.push('/');
    }

    userAuth();
    fetchUser();

    return(
        <div>
            <h2>Welcome! {user && user.name}</h2>
            <nav>
                <ul>
                    <li>Roster</li>
                    <li>Standings</li>
                    <li>Calendar</li>
                </ul>
            </nav>
            <div>
                <h3>Next game</h3>

            </div>
            <p className={styles.logOutBtn} onClick={logOut}>Log Out</p>
        </div>
    );
}