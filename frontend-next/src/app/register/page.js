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
    const router = useRouter();
    const [error, setError] = useState('');

    const handleRegistration = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match!');
            return 0;
        }

        //response field for fetch
        const response = await fetch('api/register', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ username, email, password, country }),
        });

        const data = await response.json();

        if (response.ok) {
            //route to be changed with choose a team page
            router.push('login');
        } else {
            setError(data.message || 'Registration failed');
        }
    };

    return(
        <div>
            <h1>FUTPAL</h1>
            <form onSubmit={handleRegistration}>
                <label>Username</label><br />
                <input type="text" value={username} placeholder="Your username" onChange={(e) => setUsername(e.target.username)} required />

                <label>Email</label><br />
                <input type="email" value={email} placeholder="user@example.com" onChange={(e) => setEmail(e.target.email)} required />
                
                <label>Password</label><br />
                <input type="password" value={password} placeholder="Enter your password" onChange={(e) => setPassword(e.target.password)} required />

                <label>Confirm Password</label><br />
                <input type="password" value={confirmPassword} placeholder="Re-enter your password" onChange={(e) => setConfirmPassword(e.target.confirmPassword)} required />

                <label>Country</label><br />
                <select value={country} onChange={(e) => setCountry(e.target.country)}>
                    <option value='USA'>United States of America</option>
                    <option value='Canada'>Canada</option>
                    <option value='Greece'>Greece</option>
                    <option value='Germany'>Germany</option>
                </select>
                <button type="submit">Create Account</button>
            </form>
        </div>
    );
}