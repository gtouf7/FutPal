//import fetch from 'node-fetch';

export async function POST(req) {
    const { email, password } = await req.json();

    try {
        const response = await fetch(`http://localhost:7700/api/login`, { //url to be changed with new backend deployed url
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            return new Response(JSON.stringify(data), { status:200 });
        } else {
            return new Response(JSON.stringify(data), { status: response.status });
        }
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Server error', error: error.message }));
    }
}