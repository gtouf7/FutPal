'use client';
import { useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import styles from './dashboard.module.css';
import Header from '../components/Header';
import { UserContext } from "../context/userContext";

export default function Dashboard() {
    const router = useRouter();
    const { user, loading, refresh, setUser } = useContext(UserContext);
    const [token, setToken] = useState(null);
    const [currentFixture, setCurrentFixture] = useState(null);
    const [gamePlayed, setGamePlayed] = useState(false);
    const [ownTeamMatch, setOwnTeamMatch] = useState(false);

    
    
    // Check if user is logged in and redirect if not
    useEffect(() => {
        if (!loading && !user) {
            router.push('/');
        }
        if (typeof window !== "undefined" && !token) {
            setToken(localStorage.getItem('token'));
        }
    }, [loading, user, router, token]);

    // Determine the next fixture and match status
    useEffect(() => {
        if (user) {
            const nextFixture = user.league.fixtures.find(fixture =>
                fixture.matches.some(match => match.result.home === null && match.result.away === null)
            );

            setCurrentFixture(nextFixture);

            if (nextFixture) {
                const userMatch = nextFixture.matches.find(match =>
                    match.homeTeam._id === user.team._id || match.awayTeam._id === user.team._id
                );

                setGamePlayed(true);
                setOwnTeamMatch(true);
            }
        }
    }, [user]);

    const handlePlayGame = async () => {
        if (!currentFixture || !token) return;

        const currentMatch = currentFixture.matches.find(match =>
            match.homeTeam._id === user.team._id || match.awayTeam._id === user.team._id
        );

        if (currentMatch && !gamePlayed) {
            const response = await fetch('/api/matchSimulator', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ fixtureId: currentFixture._id, matchId: currentMatch._id, token })
            });

            const resultData = await response.json();
            const updatedFixture = resultData.fixture;

            if (updatedFixture && updatedFixture._id) {
                const updatedFixtures = user.league.fixtures.map(fixture =>
                    fixture._id === updatedFixture._id ? updatedFixture : fixture
                );

                setUser(prev => ({
                    ...prev,
                    league: {
                        ...prev.league,
                        fixtures: updatedFixtures,
                    },
                }));

                setGamePlayed(true);
                await refresh();
            }
        } else if (gamePlayed) {
            await simulateRemainingGames(currentFixture);
        }
    };
    
    const simulateRemainingGames = async (fixture) => {
        for (const match of fixture.matches) {
            if (match.result.home === null && match.result.away === null) {
                await fetch('/api/matchSimulator', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({ fixtureId: fixture._id, matchId: match._id, token })
                });
                await refresh();
                break;
            }
        }
    };
    console.log(user);
    return user ? (
        <div className={styles.main}>
            <Header />
            <h2>Welcome, {user && user.username}!</h2>
            <div className={styles.match}>
                <h3>Next game</h3>
                <button onClick={handlePlayGame}>{ownTeamMatch ? 'Play Game' : 'Continue'}</button>
            </div>
        </div>
    ) : (
        <p>Loading your data...</p>
    );
}
