// references
var express = require('express');
var router = express.Router();
const Team = require('../models/team');
const functions = require('../config/functions');
/* GET home page. */
router.get('/', function(req, res, next) {
	// get game documents from db
	Team.find((err, teams) => {
			if (err) {
					console.log(err);
			}
			else {
					res.render('teams/index', {
							title: 'Team Tracker',
							teams: teams,
							user: req.user
					});
			}
	});
});
/*==========================================
Add
============================================*/
//GET: add a new team page
router.get('/add', functions.isLoggedIn,(req,res,next) => {
	res.render('teams/add', {
		title: 'Add a new team',
		user: req.user
	});
});
//POST: add a new team to the database
router.post('/add', functions.isLoggedIn,(req,res,next) => {
	// create new team in the database
    Team.create({
			sportType: req.body.sportType,
			teamName: req.body.teamName,
			standings: req.body.standings,
			location: req.body.location
    }, (err, make) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/teamtracker');
        }
    });
});
/*==========================================*/
/*==========================================
Edit
============================================*/
// GET: edit team page
router.get('/edit/:_id', functions.isLoggedIn,(req, res, next) => {
    // get _id param from url
    let _id = req.params._id;

    // use the team model to find the selected document
    Team.findById(_id, (err, team) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('teams/edit', {
                title: 'Edit the game info',
                team: team,
                user: req.user
            });
        }
    });
});
// POST: and update that information in DB
router.post('/edit/:_id', functions.isLoggedIn,(req, res, next) => {
    // get the _id from the url
    let _id = req.params._id;

    // use the Mongoose update method to set all the new values
    Team.update({ _id: _id },
        { $set: {
					sportType: req.body.sportType,
					teamName: req.body.teamName,
					standings: req.body.standings,
					location: req.body.location
            }}, null, (err) => {
            if (err) {
                console.log(err);
            }
            else {
                res.redirect('/teamTracker');
            }
        });
			});
/*==========================================*/
/*==========================================
Delete
============================================*/
router.get('/delete/:_id', (req, res, next) => {
    // get the _id parameter from the url and store in a local variable
    let _id = req.params._id;

    // use the team model to delete the document with this id
    Team.remove({ _id: _id }, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/teamtracker');
        }
    });
});
/*==========================================*/


module.exports = router;
