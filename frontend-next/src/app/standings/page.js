'use client';
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styles from './standings.module.css';
import Header from '../components/Header';
import { UserContext } from "../context/userContext";
import { useContext } from "react/";

export default function Standings() {
    const [ teams, setTeams ] = useState([]);
    console.log('in standings');
    useEffect(() => {
        const getLeague = async () => {
            try {
                const response = await fetch('http://localhost:7700/api/getLeague');
                const data = await response.json();
                setTeams(data);
                console.log(teams);
            } catch (error) {
                console.error(error);
            }
            getLeague();
        };
        
    });
    return(
        <div>
            <Header />
            <h2>League Standings</h2>
            <div>
                
            </div>
        </div>
    );
}