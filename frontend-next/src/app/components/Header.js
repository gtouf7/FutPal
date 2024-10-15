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
     * 3. STANDINGS
     * 4. TRANSFERS
     * 5. LOGOUT
     */

    // 0. Home
    function goToHome() {
        router.push("/dashboard");
    }
    // 1. Roster
    function goToRoster() {
        router.push("/roster");
    }

    // 2. FIXTURES
    function goToFixtures() {
        router.push("/fixtures");
    }

    //3. STANDINGS
    function goToStandings() {
        router.push("/standings");
    }

    //5. TRANSFERS
    function goToTransfers() {
        router.push("/transfers");
    }
    
    // 5. Logout user
    function logOut() {
        localStorage.removeItem('token');
        //console.log('User signed out successfully!'); //debugging
        router.push('/');
    }
    
    return(
        <div className={styles.main}>
            <img src="/futpal-logo.png" alt="FutPal logo" />
            <nav>
                <ul>
                    <li className={styles.listItem} onClick={goToHome}>Home</li>
                    <li className={styles.listItem} onClick={goToRoster}>Roster</li>
                    <li className={styles.listItem} onClick={goToStandings}>Standings</li>
                    <li className={styles.listItem} onClick={goToFixtures}>Fixtures</li>
                    <li className={styles.listItem} onClick={goToTransfers}>Transfers</li>
                </ul>
            </nav>
            <p className={styles.logOutBtn} onClick={logOut}>Log Out</p>
        </div>
    );
}