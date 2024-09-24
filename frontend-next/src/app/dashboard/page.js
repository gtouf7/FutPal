'use client';
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from './dashboard.module.css';

export default function Dashboard() {
    const router = useRouter();
     // User authorization function to see if the user is logged in
    function userAuth() {
    
        useEffect(() => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login'); // If there is no token this page will be inaccessible and will redirect the user to the login page
            }
        }, [router]);
    }

    // Logout user
    function logOut() {
        localStorage.removeItem('token');
        console.log('User signed out successfully!'); //debugging
        router.push('/');
    }
    userAuth();
    return(
        <div>
            <h2>Welcome!</h2>
            <p className={styles.logOutBtn} onClick={logOut}>Log Out</p>
        </div>
    );
}