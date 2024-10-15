'use client';
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "../context/userContext";

export default function Admin() {
    const { user, loading } = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
        if (!loading && user && !user.admin) {
            router.push('/dashboard');
        }
    }, [user, loading, router]);

    if (loading) return <p>Loading...</p>;

    return user && user.admin ? (
        <div>
            <h1>Admin Panel</h1>
            <button onClick={() => router.push('/admin/addTeam')}>Add Team</button>
            <button onClick={() => router.push('/admin/addPlayer')}>Add Player</button>
        </div>
    ) : (
        <p>Redirecting...</p>
    );
}
