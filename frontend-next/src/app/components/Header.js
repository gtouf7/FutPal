'use client';
import styles from './header.module.css';
import { useRouter } from 'next/navigation';

export default function Header() {
    const router = useRouter();
    /**
     * NAVIGATION FUNCTIONS
     * 0. HOME
     * 1. ROSTER
     * 2. FIXTURES
     * 3. TRANSFERS
     * 4. LOGOUT
     */

    // 0. Home
    function goToHome() {
        router.push("/dashboard");
    }
    // 1. Roster
    function goToRoster() {
        router.push("/roster");
    }
    // 4. Logout user
    function logOut() {
        localStorage.removeItem('token');
        //console.log('User signed out successfully!'); //debugging
        router.push('/');
    }
    
    return(
        <div>
            <img src="/futpal-logo.png" alt="FutPal logo" />
            <nav>
                <ul>
                    <li onClick={goToHome}>Home</li>
                    <li onClick={goToRoster}>Roster</li>
                    <li>Fixtures</li>
                    <li>Transfers</li>
                </ul>
            </nav>
            <p className={styles.logOutBtn} onClick={logOut}>Log Out</p>
        </div>
    );
}