import { NextResponse } from "next/server";

export async function POST(req) {
    //console.log(process.env.REACT_APP_PRODURL);
    const { email, password } = await req.json();

    try {
        const response = await fetch(`${process.env.REACT_APP_PRODURL}/api/login`, { //url to be changed with new backend deployed url
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        // debugging: code works
        //console.log('data:', data);
        //console.log(process.env.REACT_APP_PRODURL);
        if (response.ok) {
            return new NextResponse(JSON.stringify(data), { status:200 });
        } else {
            return new NextResponse(JSON.stringify(data), { status: response.status });
        }
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: 'Server error', error: error.message }));
    }
}