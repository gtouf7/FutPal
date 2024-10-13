'use client';
import styles from './fixtures.module.css';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import Header from '../components/Header';

export default function Fixtures() {
    const { user, loading } = useContext(UserContext);

    if(loading) {
        <p>Loading...</p>
    }

    if (!user || !user.league || !user.league.teams) {
        return <p>Loading your data...</p> 
    }
    console.log(user.league);
    const teams = user.league.teams.map((team) => ({
        id: team.teamId._id,
        name: team.teamId.name
    }));
    
    //schedule generator
    function ScheduleGenerator(teams) {
        return 0;
    }
    return(
        <div className={styles.fixturesPage}>
            <Header />
            <h2>Fixtures</h2>
        </div>
    );
}