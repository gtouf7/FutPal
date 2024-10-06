const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }], // Include array of players
    ptn: Number,
    pts: Number, 
    gp: Number,
    w: Number,
    t: Number,
    l: Number,
    gf: Number,
    ga: Number,
    gd: Number,
});

const teamModel = mongoose.model('Team', teamSchema);
module.exports = teamModel;