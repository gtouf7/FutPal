import { NextResponse } from "next/server";
import fetch from 'node-fetch';

export async function POST(req) {
    const { Fname, Lname, position, OVR, jerseyNO, teamId } = await req.json();

    try {
        // Connect to database
        const response = await fetch(`${process.env.REACT_APP_PRODURL}/api/admin/addPlayer`, { //url to be changed with new backend deployed url
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Fname, Lname, position, OVR, jerseyNO, teamId })
        });
        if (!response.ok) {
            const err = await response.json();
            return NextResponse.json({message: err.message || 'failed'}); // debugging
        }
        return NextResponse.json({ message: "Player created successfully!"}, {status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Server error."}, { status: 500 });
    }
}