import { NextResponse } from "next/server";
import fetch from 'node-fetch';

export async function POST(req) {
    const { name, city, country, stadium, logo } = await req.json();

    try {
        // Connect to database
        const response = await fetch(`${process.env.REACT_APP_PRODURL}/api/admin/addTeam`, { //url to be changed with new backend deployed url
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, city, country, stadium, logo })
        });
        if (!response.ok) {
            const err = await response.json();
            return NextResponse.json({message: err.message || 'failed'}); // debugging
        }
        return NextResponse.json({ message: "Team created successfully!"}, {status: 201 });
        
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Server error."}, { status: 500 });
    }
}