import { NextResponse } from "next/server";
import fetch from 'node-fetch';

export async function POST(req) {
    const { username, email, password, confirmPassword, country } = await req.json();

    // Password match check
    if (password !== confirmPassword) {
        return NextResponse.json({ message: "Passwords don't match" }, { status: 400 });
    }

    try {
        // Connect to database
        const response = await fetch(`${process.env.REACT_APP_PRODURL}/api/register`, { //url to be changed with new backend deployed url
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password, country })
        });
        if (!response.ok) {
            const err = await response.json();
            return NextResponse.json({message: err.message || 'failed'}); // debugging
        }
        return NextResponse.json({ message: "Account created successfully!"}, {status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Server error."}, { status: 500 });
    }
}