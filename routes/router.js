var express = require('express');
var router = express.Router();
var User = require('../models/user');
var files = require('./files');

// GET route for reading data
router.get('/', function (req, res, next) {
    console.log("requested home page...");
    User.findById(req.session.userId)
	.exec(
	    function (error, user) {
		if (!error && user != null) {
		    return res.redirect("/profile")

		} else {
		    console.log("Error : ", error);
		    return res.send(files.indexpage);
		}
	    }
	);
});


//POST route for updating data
router.post('/', function (req, res, next) {

    // The if clause is for signup (register process)
    // and the else for logging in.
    if (req.body.email &&
	req.body.password &&
	req.body.passwordConf) {

	if (req.body.password !== req.body.passwordConf) {
	    var err = new Error('Passwords do not match.');
	    err.status = 400;
	    res.send("passwords dont match");
	    return next(err);
	}
	
	var userData = {
	    email: req.body.email,
	    password: req.body.password,
	}

	User.create(userData, function (error, user) {
	    if (error) {
		return next(error);
	    } else {
		req.session.userId = user._id;
		return res.redirect('/profile');
	    }
	});

    } else if (req.body.logemail && req.body.logpassword) {
	User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
	    if (error || !user) {
		var err = new Error('Wrong email or password.');
		err.status = 401;
		return next(err);
	    } else {
		req.session.userId = user._id;
		return res.redirect('/profile');
	    }
	});
    } else {
	var err = new Error('All fields required.');
	err.status = 400;
	return next(err);
    }
})

// GET route after registering
router.get('/profile', function (req, res, next) {
    User.findById(req.session.userId)
	.exec(function (error, user) {
	    if (error) {
		return next(error);
	    } else {
		if (user === null) {
		    var err = new Error('Not authorized! Go back!');
		    err.status = 400;
		    return next(err);
		} else {
		    var details = '';
		    if (user.email != "" && user.email != null) {
			details = details + "<b>Email</b> : " + user.email + "<br>";
		    }
		    console.log(user.name, user.name == null);
		    if (user.name != "" && user.name != null) {
			details = details + "<b>Name</b> : "
			if (user.title != "" && user.title != null) {
			    details += user.title + " "
			}
			details += user.name + "<br>";
		    }
		    if (user.bio != "" && user.bio != null) {
			details = details + "<b>Bio</b> : " + user.bio + "<br>";
		    }
		    if (user.timezone != "" && user.timezone != null) {
			details = details + "<b>Timezone</b> : " + user.timezone + "<br>";
		    }
		    return res.send(details + '<br><a type="button" href="/edit">Edit</a><br><a type="button" href="/logout">Logout</a>')
		}
	    }
	});
});

router.get('/edit', function (req, res, next) {
    console.log("requested edit page...");
    User.findById(req.session.userId)
	.exec(function (error, user) {
	    if (error) {
		return next(error);
	    } else {
		if (user === null) {
		    var err = new Error('Not authorized! Go back!');
		    err.status = 400;
		    return next(err);
		} else {
		    return res.send(files.editpage);
		}
	    }
	});
});

router.post('/edit', function (req, res, next) {
    console.log("posted edits");
    User.findById(req.session.userId)
	.exec(function (error, user) {
	    if (!error && user != null) {
		var query = {_id : req.session.userId}
		var userData = {};
		console.log(req.body);
		if (req.body.edit_email != "") {
		    if (!ValidateEmail(req.body.edit_email)) {
			return res.send(403, { error: "not a valid email address. : " + req.body.edit_email });
		    }
		    userData.email = req.body.edit_email;
		}
		if (req.body.edit_name != "") {
		    userData.name = req.body.edit_name;
		}
		if (req.body.edit_title != "") {
		    if (req.body.edit_title != "Mr." && req.body.edit_title != "Dr." && req.body.edit_title != "Miss." && req.body.edit_title != "Mrs.") {
			return res.send(403, { error: "not a valid title." });
		    }
		    userData.title = req.body.edit_title;
		}
		if (req.body.edit_bio != "") {
		    userData.bio = req.body.edit_bio;
		}
		if (req.body.edit_timezone != "") {
		    if (!parseFloat(req.body.edit_timezone)) {
			return res.send(403, { error: "not a valid timezone." });
		    }
		    userData.timezone = parseFloat(req.body.edit_timezone);
		}
		// Yet to validate phone numbers and update
		// if (req.body.edit_phone != "") {
		// }
		// if (req.body.edit_sms != "") {
		// }
		console.log(userData);
		User.findOneAndUpdate(query, userData, {upsert : true}, function (err, doc) {
		    if (err) return res.send(500, { error: err });
		    return res.send("succesfully saved");
		});
	    } else {
		var err = new Error('Not authorized! Go back!');
		err.status = 400;
		return next(err);
	    }
	});
});

function ValidateEmail(mail) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(mail).toLowerCase());
}

// GET for logout logout
router.get('/logout', function (req, res, next) {
    if (req.session) {
	// delete session object
	req.session.destroy(function (err) {
	    if (err) {
		return next(err);
	    } else {
		return res.redirect('/');
	    }
	});
    }
});

module.exports = router;
