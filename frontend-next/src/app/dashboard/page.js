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

    // Logout user
    function logOut() {
        localStorage.removeItem('token');
        //console.log('User signed out successfully!'); //debugging
        router.push('/');
    }

    if (loading) {
        return <p>Loading your data. Please wait.</p>
    }

    //Get fixtures for display
    const fixtures = user.league.fixtures[0].matches;
    console.log(fixtures)

    return user ? (
        <div className={styles.main}>
            <Header />
            <h2>Welcome, {user && user.username}!</h2>
            <div className={styles.match}>
                <h3>Next game</h3>
                <p><img src={fixtures[2].homeTeam.logo.img}></img> - <img src={fixtures[2].awayTeam.logo.img}></img></p>
                <button>Play Game</button>
            </div>
        </div>
    ) : (
        <p>Error loading user.</p>
    );
}