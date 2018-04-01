// reference mongoose
const mongoose = require('mongoose');

// create the game schema
const gameSchema = new mongoose.Schema({
	sportType: String,
	teamOne: String,
	teamTwo: String,
	eventDate: String,
	scoreOne: Number,
	scoreTwo: Number,
	location: String,
	outCome: Boolean
});

// export the game Schema
module.exports = mongoose.model('Game', gameSchema);
