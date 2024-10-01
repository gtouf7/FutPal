// ASSIGN A TEAM TO A NEW USER
'use client';
import { useState } from "react";
import { useRouter } from "next/router";

export default function teamAssign() {
    // Check if user is logged in
    function userAuth() {
    
        useEffect(() => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login'); // If there is no token this page will be inaccessible and will redirect the user to the login page
            }
        }, [router]);
    }
    return(
        <>
        <h2>Choose your team</h2>
        </>
    );
}