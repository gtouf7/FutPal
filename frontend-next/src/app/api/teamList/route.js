import { NextResponse } from "next/server";
import fetch from 'node-fetch';

export async function GET(req, res) {
    try {
        const response = await fetch(`${process.env.REACT_APP_PRODURL}/api/teamList`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json' },
        });
        const data = await response.json();

        // Debugging to see team list json
        //console.log("data is:", data);
        
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error getting teams:', error);
        return NextResponse.json({ message: 'Error getting teams.' });
    }
}
