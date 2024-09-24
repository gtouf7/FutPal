// REGISTRATION PAGE
'use client';

import styles from './register.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [country, setCountry] = useState('X');
    const router = useRouter();
    const [error, setError] = useState('');

    const handleRegistration = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match!');
            alert("Passwords don't match!"); // Debugging message
            return;
        }
        console.log(username, password); // debugging
        //response field for fetching the data
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ username, email, password, confirmPassword, country }),
        });

        const data = await response.json();

        if (response.ok) {
            //route to be changed with choose a team page
            router.push('/login');
        } else {
            setError(data.message || 'Registration failed');
        }
    };

    function toHome() {
        router.push('/');
    }

    return(
        <div>
            <h1 className={styles.logo} onClick={toHome}>FUTPAL</h1>
            <form className={styles.registrationForm} onSubmit={handleRegistration}>
                <label>Username</label>
                <input className={styles.input} type="text" value={username} placeholder="Your username" onChange={(e) => setUsername(e.target.value)} required /><br />

                <label>Email</label>
                <input className={styles.input} type="email" value={email} placeholder="user@example.com" onChange={(e) => setEmail(e.target.value)} required /><br />
                
                <label>Password</label>
                <input className={styles.input} type="password" value={password} placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} required /><br />

                <label>Confirm Password</label>
                <input className={styles.input} type="password" value={confirmPassword} placeholder="Re-enter your password" onChange={(e) => setConfirmPassword(e.target.value)} required /><br />

                <label>Country</label>
                <select className={styles.input} value={country} onChange={(e) => setCountry(e.target.value)}>
                    <option value='X' disabled>-- Choose a Country --</option>
                    <option value='USA'>United States of America</option>
                    <option value='Canada'>Canada</option>
                    <option value='Greece'>Greece</option>
                    <option value='Germany'>Germany</option>
                </select><br />
                <button id={styles.btn} type="submit">Create Account</button>
            </form>
        </div>
    );
}