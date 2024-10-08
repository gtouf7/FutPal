const mongoose = require('mongoose');

const userLeagueSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    teams: [{
        teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team'},
        stats: {
            gp: Number,
            pts: Number,
            w: Number,
            d: Number,
            l: Number,
            gf: Number,
            ga: Number,
            gd: Number,
        },
    }]
});

const UserLeague = mongoose.model('UserLeague', userLeagueSchema);