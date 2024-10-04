const User = require('../models/User');

const getUser = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await User.findById(userId).populate('team');

        if (!user) {
            res.status(400).json({ message: "User not found" });
        }
        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Server error.'});
    }
    
}

module.exports = getUser;