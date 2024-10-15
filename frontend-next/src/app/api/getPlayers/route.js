import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const response = await fetch(`${process.env.REACT_APP_PRODURL}/api/getPlayers`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json' },
        });
        const data = await response.json();
        
        if (!response.ok) {
            return NextResponse.json({ message: data.message }, { status: response.status });
        }
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Server error'}, { status: 500 });
    }
}