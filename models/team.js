// reference mongoose
const mongoose = require('mongoose');

// create the team schema
const teamSchema = new mongoose.Schema({
	sportType: String,
	teamName: String,
	standings: Number,
	location: String
});

// export the team Schema
module.exports = mongoose.model('Team', teamSchema);
