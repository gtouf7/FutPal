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

dotenv.config();

// Initialize express app
const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 7700;

// GET USER BY EMAIL FOR DEBUGGING PURPOSES
app.get('/api/user', async (req, res) => {
    await DBconn(); // connect to DB
    // dummy email for testing with an existing user
    const email = "test@email.com";
    let user = await User.findOne({ email });
    let teamId = user.team;
    let team = await Team.findById(teamId);
    console.log(team);
    if (user) {
        res.json({
            user: {
                username: user.username,
                email: user.email,
                selectedTeam: team.name,
            }
        });
    } else {
        res.status(400).json({ message: "Email doesn't exist" });
    }
    // debug database with updating passwords
    //updateUserPassword('test@email.com', 'test123!');
});

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
        console.log("pwd match result", isMatch);
        if (!isMatch) {
            //console.log("Password incorrect");
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
    console.log("got the data");
    console.log(req.body);
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
        console.log(user);
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
    try {
        await DBconn();
        const userId = req.user.userId; // User's id from JWT
        //console.log("zero:", req.user);
        const { teamId } = req.body; // User's selected team
        //console.log("first:", req.body);

        const user = await User.findById(userId); // Get the user
        //console.log("second:", user);
        //console.log('teamid:', teamId);
        

        // Logic to check if the user has a team -- IF REQUIRED

        //fetch selected team
        const team = await Team.findById(teamId);
        //console.log("team:", team);
        if (!team) {
            return res.status(400).json({ message: "Team not found." });
        }

        //Assign the team to the user
        user.team = teamId;
        await user.save();

        res.json({ message: "Team successfully assigned", user });
    } catch (error) {
        console.error("Error assigning team:", error);
        res.status(500).json({ message: "Server error." });
    }
});



// server portal
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});