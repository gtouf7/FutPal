// LOGIN PAGE
'use client';

import styles from './login.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [email, setEmail ] = useState('');
    const [password, setPassword ] = useState('');
    const router = useRouter();
    const [ error, setError ] = useState(''); // TBD

    const handleLogin = async (e) => {
        e.preventDefault();

        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        //console.log(data.JWToken);
        //console.log(data.user.team);
        if (response.ok) {
            //console.log(data);
            const selTeam = data.user.team;
            localStorage.setItem('token', data.JWToken);
            if(!selTeam) {
                //localStorage.setItem('token', data.JWToken);
                router.push('/teamAssign');
            } else {
            //localStorage.setItem('token', data.JWToken);
            router.push('/dashboard');
            }
            
        } else {
            console.log('Login failed');
        }
    };

    function redirectSignUp() {
        router.push('/register');
    }

    return(
        <div className={styles.test}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
                <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
                <button type="submit">Login</button>
            </form>
            <p className={styles.registerBtn} onClick={redirectSignUp}>Create an Account</p>
        </div>
    );
}