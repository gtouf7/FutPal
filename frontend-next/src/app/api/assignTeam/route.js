import { NextResponse } from "next/server";

export async function POST(req) {
    const { teamId, token } = await req.json();
    try {
        const response = await fetch(`${process.env.REACT_APP_PRODURL}/api/assignTeam`, { //url to be changed with new backend deployed url
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            },
            body: JSON.stringify({ teamId })
        });
        const data = await response.json();

        if (response.ok) {
            return new NextResponse(JSON.stringify(data), { status:200 });
        } else {
            return new NextResponse(JSON.stringify(data), { status: response.status });
        }
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: 'Server error', error: error.message }));
    }
}