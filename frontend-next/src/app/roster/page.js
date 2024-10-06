'use client';
import Header from '../components/Header';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';

export default function Roster() {

    const user = useContext(UserContext);
    console.log(user);
    return(
        <div>
            <Header />
            <div>
                <h2>Team Roster</h2>
                <p> Hi, {user} </p>
            </div>
        </div>
    );
};