export default async function teamList(req, res) {
    try {
        const response = await fetch(`${process.env.PRODURL}/api/teamList`);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error getting teams:', error);
        res.status(500).json({ message: 'Error getting teams.' });
    }
}
