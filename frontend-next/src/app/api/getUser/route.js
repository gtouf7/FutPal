import { NextResponse } from "next/server";

export async function GET(req) {
    const token = req.headers.get('authorization');

    if (!token) {
        return NextResponse.json({ message: 'Token not found' }, { status: 401 });
    }

    try {
        const response = await fetch(`${process.env.REACT_APP_PRODURL}/api/getUser`, {
            method: 'GET',
            headers: {
                'Authorization': token,
            }
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