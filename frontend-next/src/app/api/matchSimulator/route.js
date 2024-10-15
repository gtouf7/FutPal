import { NextResponse } from "next/server";

export async function POST(req) {
    //console.log(process.env.REACT_APP_PRODURL);
    const { fixtureId, matchId, token } = await req.json();

    try {
        const response = await fetch(`${process.env.REACT_APP_PRODURL}/api/matchSimulator`, { //url to be changed with new backend deployed url
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            },
            body: JSON.stringify({ fixtureId, matchId })
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