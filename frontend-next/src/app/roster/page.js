'use client';
import Header from '../components/Header';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';

export default function Roster() {

    const {user, loading}= useContext(UserContext);

    if (loading) {
        return <p>Loading...</p>
    }

    return user ? (
        <div>
            <Header />
            <div>
                <h2>Team Roster</h2>
                <p> Hi, {user.username} </p>
            </div>
        </div>
    ) : (
        <p>Error</p>
    );
};