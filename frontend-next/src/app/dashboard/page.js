'use client';
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styles from './dashboard.module.css';

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState('');
    const [ error, setError] = useState('');
    const [ team, setTeam ] = useState('');

    
    useEffect(() => {

        // User authorization to see if the user is logged in
        const token = localStorage.getItem('token');
            if (!token) {
                // If there is no token this page will be inaccessible and will redirect the user to the login page
                router.push('/login'); 
            }

        console.log('before fetch', token);
        //fetching user data
        async function fetchUser() {
            try {
                const response = await fetch('/api/getUser', {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await response.json();
            //console.log(data.user.team.name);

            if (response.ok) {
                setUser(data.user);
                setTeam(data.user.team.name);
            } else {
                setError('Error getting user');
            }
            } catch (error) {
                setError('Internal server error.');
            }
        }
        fetchUser();
    }, [router]);

    // Logout user
    function logOut() {
        localStorage.removeItem('token');
        //console.log('User signed out successfully!'); //debugging
        router.push('/');
    }

    return(
        <div>
            <h2>Welcome, {user && user.username}!</h2>
            <nav>
                <ul>
                    <li>Roster</li>
                    <li>Standings</li>
                    <li>Calendar</li>
                </ul>
            </nav>
            <div>
                <h3>Next game</h3>
                { team } vs Arsenal
            </div>
            <p className={styles.logOutBtn} onClick={logOut}>Log Out</p>
        </div>
    );
}