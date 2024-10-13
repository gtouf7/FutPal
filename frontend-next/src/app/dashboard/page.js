'use client';
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styles from './dashboard.module.css';
import Header from '../components/Header';
import { UserContext } from "../context/userContext";
import { useContext } from "react/";

export default function Dashboard() {
    const router = useRouter();
    //const [user, setUser] = useState('');
    //const [ error, setError] = useState('');
    //const [ error, setError] = useState('');
    //const [ team, setTeam ] = useState('');

    const { user, loading } = useContext(UserContext);

    if (loading) {
        return <p>Loading...</p>
    }
    useEffect(() => {
        if (!loading && !user) {
            router.push('/');
        }
    }, [loading, user, router]);
    useEffect(() => {
        if (!loading && !user) {
            router.push('/dashboard');
        }
    }, [loading, user, router]);
    // COMMENTED OUT AS USERCONTEXT NOWW RENDERS THE PAGES AND COMPONENTS TO THE USER
    /*useEffect(() => {

        // User authorization to see if the user is logged in
        const token = localStorage.getItem('token');
            if (!token) {
                // If there is no token this page will be inaccessible and will redirect the user to the login page
                router.push('/login'); 
            }

        //console.log('before fetch', token);
        //fetching user data
        async function fetchUser() {
            try {
                const response = await fetch('/api/getUser', {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await response.json();
            console.log(data.user);

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
        //fetchUser();
    }, [router]); */

    // Logout user
    function logOut() {
        localStorage.removeItem('token');
        //console.log('User signed out successfully!'); //debugging
        router.push('/');
    }

    if (loading) {
        return <p>Loading...</p>
    }

    return user ? (
        <div className={styles.main}>
            <Header />
            <h2>Welcome, {user && user.username}!</h2>
            <div>
                <h3>Next game</h3>
                { user.team.name } vs Arsenal
            </div>
        </div>
    ) : (
        <p>Error loading user.</p>
    );
}