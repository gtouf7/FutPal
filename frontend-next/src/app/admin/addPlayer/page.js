'use client';
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "../../context/userContext";

export default function AddPlayer() {
    const { user, loading } = useContext(UserContext);
    const router = useRouter();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [position, setPosition] = useState("");
    const [overall, setOverall] = useState("");
    const [jerseyNO, setJerseyNO] = useState("");
    const [teamId, setTeamId] = useState("");
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        if (!loading && user && !user.admin) {
            router.push('/dashboard');
        }
    }, [user, loading, router]);

    // Fetch all teams from the existing endpoint
    useEffect(() => {
        const fetchTeams = async () => {
            const response = await fetch('/api/teamList', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            const data = await response.json();
            setTeams(data);
        };
        fetchTeams();
    }, []);

    const handleAddPlayer = async () => {
        const response = await fetch('/api/admin/addPlayer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
            body: JSON.stringify({
                Fname: firstName,
                Lname: lastName,
                position,
                OVR: overall,
                jerseyNO,
                teamId
            }),
        });
        console.log(response);
        if (response.ok) {
            alert('Player added successfully');
            router.push('/admin');
        } else {
            alert('Error adding player');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (!user || !user.admin) return <p>Redirecting...</p>;

    return (
        <div>
            <h2>Add Player</h2>
            <input placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <input placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <input placeholder="Position" value={position} onChange={(e) => setPosition(e.target.value)} />
            <input placeholder="Overall Rating" type="number" value={overall} onChange={(e) => setOverall(e.target.value)} />
            <input placeholder="Jersey Number" type="number" value={jerseyNO} onChange={(e) => setJerseyNO(e.target.value)} />
            
            <select value={teamId} onChange={(e) => setTeamId(e.target.value)}>
                <option value="">Select Team</option>
                {teams.map((team) => (
                    <option key={team._id} value={team._id}>{team.name}</option>
                ))}
            </select>

            <button onClick={handleAddPlayer}>Submit Player</button>
            <button onClick={() => router.push('/admin')}>Back to Admin</button>
        </div>
    );
}
