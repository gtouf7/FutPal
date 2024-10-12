'use client';
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styles from './standings.module.css';
import Header from '../components/Header';
import { UserContext } from "../context/userContext";
import { useContext } from "react";

export default function Standings() {
    const { user, loading } = useContext(UserContext);
    if(loading) {
        return<p>Loading...</p>
    }
    console.log(user);

    // League setup
    const teams = [...user.league.teams].sort((a, b) => {
        if(b.stats.pts !== a.stats.pts) {
            return b.stats.pts - a.stats.pts; //sort by points
        } else if (b.stats.gd !== a.stats.gd) {
            return b.stats.gd - a.stats.gd //Sort by goal difference
        } else if (b.stats.gf !== a.stats.gf) {
            return b.stats.gf - a.stats.gf //sort by goals scored
        } else if (a.stats.ga !== b.stats.ga) {
            return a.stats.ga - b.stats.ga //sort be less goals conceded
        } else {
            return a.teamId.name.localeCompare(b.teamId.name);
        }    
    });

    return(
        <div className={styles.standingsPage}>
            <Header />
            <h2>English Premier League Standings</h2>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Position</th>
                            <th>Team</th>
                            <th>GP</th>
                            <th>PTS</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>GF</th>
                            <th>GA</th>
                            <th>GD</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teams.map((team, index) => (
                            <tr key={team.teamId._id}>
                                <td>{index+1}</td>
                                <td>{team.teamId.name}</td>
                                <td>{team.stats.gp}</td>
                                <td>{team.stats.pts}</td>
                                <td>{team.stats.w}</td>
                                <td>{team.stats.d}</td>
                                <td>{team.stats.l}</td>
                                <td>{team.stats.gf}</td>
                                <td>{team.stats.ga}</td>
                                <td>{team.stats.gd}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}