'use client';
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
     // User authorization function to see if the user is logged in
    function userAuth() {
        const router = useRouter();
    
        useEffect(() => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login'); // If there is no token this page will be inaccessible and will redirect the user to the login page
            }
        }, [router]);
    }
    userAuth();
    return(
        <h2>Welcome!</h2>
    );
}