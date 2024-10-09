const express = require('express');
const DBconn = require('./config/dbUser');
const dotenv = require("dotenv");
const bcrypt = require('bcrypt');
// token
const jwt = require('jsonwebtoken');
const tokenAuth = require('./auth/jwtmiddleware');
// cors
const cors = require('cors');
// Models
const User = require('./models/User');
const Team = require('./models/Team');
const Player = require('./models/Player');
const UserLeague = require('./models/UserLeague');
//const getUser = require('./controllers/getUser');

dotenv.config();

// Initialize express app
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // PRODUCTION URL
    methods: 'GET,POST',
    allowedHeaders: ['Content-type', 'Authorization'],
}));

const port = process.env.PORT || 7700;


// USER LOGIN 
app.post('/api/login', async (req, res) => {
    await DBconn(); // connect to DB
    const { email, password } = req.body; // Get email and password values from frontend login form

    try {
        let user = await User.findOne({ email });
        // Check email
        if (!user) {
            console.log("email not found");
            return res.status(400).json({ message: "Invalid credentials!" });
        }
        // log the stored hash pwd for debugging
        /*console.log("Stored password", user.password);
        console.log("provided password", password);
        console.log("provided email", email);*/

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        // pwd match result
        //console.log("pwd match result", isMatch);
        //console.log("pwd match result", isMatch);
        if (!isMatch) {
            console.log("Password incorrect");
            return res.status(400).json({ message: "Invalid credentials!" });
        }

        // Generate a JsonWebToken and return the response
        const JWToken = jwt.sign({ userId: user._id }, process.env.JWTSECRET, { expiresIn: '12h' });
        res.json({ JWToken, user: {username: user.username, email: user.email, team: user.team }});
        //console.log("User signed in successfully!")
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});
// NEW USER REGISTRATION
app.post('/api/register', async (req, res) => {
    // new user data required
    const { username, email, password, country, profileImage, team } = req.body;
    //console.log("got the data");
    //console.log(req.body);
    try {
        await DBconn();
        // Check if a user is already registered with this email
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'This email already exists!' });
        }
        
        // Hash password
        const HashedPwd = await bcrypt.hash(password, 10);
        // Create the new user object with the inserted data
        user = new User({
            username,
            email,
            password: HashedPwd,
            country,
            profileImage,
            team,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        //console.log(user);
        // Save changes
        await user.save();

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                username: user.username,
                email: user.email,
                country: user.country,
                profileImage: user.profileImage,
                team: user.team,
            }
        });
        //console.log(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
});

// UPDATE PASSWORD FUNCTION - USED TO DEBUG DATABASE PWD DATA
async function updateUserPassword(email, newPassword) {
    try {
        // Fetch the user by email
        let user = await User.findOne({ email });
        if (!user) {
            console.log("User not found");
            return;
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        // Update the password in the database
        user.password = hashedPassword;
        await user.save();

        console.log('Password updated successfully');
    } catch (error) {
        console.error('Error updating password:', error);
    }
}

/**
 *  TEAMS SECTION 
 */
// GET TEAM LIST from DB
app.get('/api/teamList', async (req, res) => {
    await DBconn(); // Connect to DB
    try {
        const teams = await Team.find(); // Get list with available teams
        res.json(teams);
    } catch (error) {
        console.error("Error fething teams", error); //debugging
        res.status(500).json({ message: "Server error" });
    }
});


// ASSIGN A TEAM TO THE NEW USER
app.post('/api/assignTeam', tokenAuth, async (req, res) => {
    
    //console.log('req:', req.user);
    //console.log('body:', req.body);
    try {
        await DBconn();
        const userId = req.user.userId; // User's id from JWT
        const { teamId } = req.body; // User's selected team

        const user = await User.findById(userId); // Get the user
        const team = await Team.findById(teamId); //fetch selected team

        if (!team) {
            return res.status(400).json({ message: "Team not found." });
        }
        
        //Assign the team to the user
        user.team = teamId;
        await user.save();
        //console.log('user chose:', user.team);
        // Initialize league
        let league = await UserLeague.findOne({ userId });
        if (!league) {
            league = await initUserLeague(userId);
        }
        //console.log('league:', league); 
        res.json({ message: "Team successfully assigned", user });
    } catch (error) {
        console.error("Error assigning team:", error);
        res.status(500).json({ message: "Server error." });
    }
});

// NEW LEAGUE INITIALIZATION FUNCTION
const initUserLeague = async (userId) => {
    try {
        const teams = await Team.find();

        const userTeams = teams.map(team => ({
            teamId: team._id,
            stats: {
                gp: 0,
                pts: 0,
                w: 0,
                d: 0,
                l: 0,
                gf: 0,
                ga: 0,
                gd: 0,
            },
        }));
        const newLeague = new UserLeague({ userId, teams: userTeams });
        await newLeague.save();
        //return newLeague;
    } catch (error) {
        console.error("Error initializing league:", error);
        throw new Error("League initialization failed.");
    }
}

// CUSTOMIZED UX WHEN LOGGED IN
app.get('/api/getUser', tokenAuth, async (req, res) => {
    await DBconn();
    
    //console.log('req in server.js', req);
    try {
        const user = await User.findById(req.user.userId).populate({
            path: 'team',
            populate: {
                path: 'players',
            }
        });
        const team = await Team.findById(user.team._id).populate('players');
        //console.log('Populated team with players:', team);
        //console.log('user:', user.team.players);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.'});
    }
});


// server portal
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});