import { NextResponse } from "next/server";
import fetch from 'node-fetch';

export default async function teamList(req, res) {
    try {
        console.log(process.env.REACT_APP_PRODURL);
        const response = await fetch(`${process.env.REACT_APP_PRODURL}/api/teamList`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(response)
        });
        const data = await response.json();
        console.log("data is:", data);
        res.status(200).json(data);
    } catch (error) {
        console.error('Error getting teams:', error);
        res.status(500).json({ message: 'Error getting teams.' });
    }
}
