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
    //console.log('user:', user);
    const fixtures = user.league.fixtures[0].matches;
    //console.log(fixtures);
    const matchdays = fixtures.reduce((acc, fixture, index) => {
        const matchday = Math.floor(index / 2) + 1;
        if (!acc[matchday]) acc[matchday] = [];
        acc[matchday].push(fixture);
        return acc;
    }, {});
    
    return(
        <div className={styles.fixturesPage}>
            <Header />
            <h2>Fixtures</h2>
            {/* Matchday rendering */}
            {Object.keys(matchdays).map((matchday) => (
                <div key={matchday} className={styles.matchday}>
                    <h3>Matchday {matchday}</h3>
                    {matchdays[matchday].map((fixture, index)=> (
                        <p key={index}>
                        {fixture.homeTeam.name}{" "}
                        {fixture.result.home !== null && fixture.result.away !== null
                        ? `${fixture.result.home}-${fixture.result.away}`
                        : "vs"}{" "}
                        {fixture.awayTeam.name}
                    </p>
                    ))}
                </div>
            ))}
        </div>
    );
}