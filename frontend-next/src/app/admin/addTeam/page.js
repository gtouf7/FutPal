// /pages/admin/add-team/page.js
'use client';
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "../../context/userContext";

export default function AddTeam() {
    const { user, loading } = useContext(UserContext);
    const router = useRouter();

    const [teamName, setTeamName] = useState("");
    const [teamCity, setTeamCity] = useState("");
    const [teamCountry, setTeamCountry] = useState("");
    const [stadium, setStadium] = useState("");
    const [logoImg, setLogoImg] = useState("");
    const [logoAlt, setLogoAlt] = useState("");

    useEffect(() => {
        if (!loading && user && !user.admin) {
            router.push('/dashboard');
        }
    }, [user, loading, router]);

    const handleAddTeam = async () => {
        const response = await fetch('/api/admin/addTeam', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: teamName,
                city: teamCity,
                country: teamCountry,
                logo: {
                    img: logoImg,
                    alt: logoAlt
                }
            }),
        });
        console.log(response);
        if (response.ok) {
            alert('Team added successfully');
            router.push('/admin');
        } else {
            alert('Error adding team');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (!user || !user.admin) return <p>Redirecting...</p>;

    return (
        <div>
            <h2>Add Team</h2>
            <input placeholder="Name" value={teamName} onChange={(e) => setTeamName(e.target.value)} />
            <input placeholder="City" value={teamCity} onChange={(e) => setTeamCity(e.target.value)} />
            <input placeholder="Country" value={teamCountry} onChange={(e) => setTeamCountry(e.target.value)} />
            <input placeholder="Logo Image URL" value={logoImg} onChange={(e) => setLogoImg(e.target.value)} />
            <input placeholder="Stadium name" value={stadium} onChange={(e) => setStadium(e.target.value)} />
            <input placeholder="Logo Alt Text" value={logoAlt} onChange={(e) => setLogoAlt(e.target.value)} />
            <button onClick={handleAddTeam}>Submit Team</button>
            <button onClick={() => router.push('/admin')}>Back to Admin</button>
        </div>
    );
}
