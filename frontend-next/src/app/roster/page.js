'use client';
import Header from '../components/Header';
//import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';

export default function Roster() {
    const {user, loading}= useContext(UserContext);
    if (loading) {
        return <p>Loading...</p>
    }
    console.log(user.team.players);
    return user ? (
        <div>
            <Header />
            <div>
                <h2>Team Roster</h2>
                <img src={user.team.logo.img} alt={user.team.logo.alt}></img>
                <p>{user.team.name} </p>
                <ul>
                    {user.team.players.map((player) => (
                        <li key={player._id}># {player.jerseyNO} | {player.Fname} {player.Lname} | {player.position}{player.positionSec ? `/${player.positionSec}` : ''} - OVR:{player.OVR} </li>
                    ))}
                </ul>
            </div>
        </div>
    ) : (
        <p>Error</p>
    );
};