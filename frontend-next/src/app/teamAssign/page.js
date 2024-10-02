// ASSIGN A TEAM TO A NEW USER
'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function teamAssign() {
    const router = useRouter();
    const [ teams, setTeams ] = useState([]);
    const [ teamId, setTeamId ] = useState('');
    const [ message, setMessage ] = useState('');

    // Check if user is logged in
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login'); // If there is no token this page will be inaccessible and will redirect the user to the login page
        }
    }, [router]);

    useEffect(() => {
        const teamList = async () => {
            try {
                const response = await fetch('/api/teamList');
                console.log(response);
                const data = await response.json();
                setTeams(data);
            } catch (error) {
                console.error('Error getting teams:', error);
                setMessage('Error getting teams.');
            }
        };
        teamList();
    }, []);

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
        <div>
            <h2>Choose your team</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="team">Select team:</label>
                <select id="team" value={teamId} onChange={(e) => setTeamId(e.target.value)}>
                    <option value="X" default disabled>-- Select a Team --</option>
                    {teams.map((team) => (
                        <option key={team._id} value={team._id}>{team.name}</option>
                    ))}
                </select>
                <button type="submit">Pick Team</button>
            </form>
            { message &&  <p>{message}</p>}
        </div>
    );
}