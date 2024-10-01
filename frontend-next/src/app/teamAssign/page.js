// ASSIGN A TEAM TO A NEW USER
'use client';
import { useState } from "react";
import { useRouter } from "next/router";
import { set } from "mongoose";

export default function teamAssign() {
    // Check if user is logged in
    function userAuth() {
    
        useEffect(() => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login'); // If there is no token this page will be inaccessible and will redirect the user to the login page
            }
        }, [router]);
    }
    userAuth();

    const [ teamId, setTeamId ] = useState('');
    const [ message, setMessage ] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/assignTeam', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorizaion: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ teamId }),
            });

            const data = response.json();
            if (response.ok) {
                setMessage('Team successfully assigned');
            } else {
                setMessage(data.message || 'Error assigning team.');
            }
        } catch (error) {
            console.error('Error:', error.message);
            setMessage('Something went wrong');
        }
    }
    return(
        <>
        <h2>Choose your team</h2>
        </>
    );
}