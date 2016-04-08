var express = require('express');
var router = express.Router();

/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('index.ejs', { 
  		title: "Express",
		data: {
			amount: false,
			gravity: false,
			wind: false,
			yVelocity: false,
			xVelocity: false,
			opacity: false,
			size: false,
			loopTime: false,
			red: false,
			blue: false,
			green: false,
			particleType: false
		},
		reset: true  
	});
});
router.post('/particle', function(req, res, next) {
		
	var amount = req.body.amount,
		gravity = req.body.gravity,
		wind = req.body.wind,
		yVelocity = req.body.yVelocity,
		xVelocity = req.body.xVelocity,
		opacity = req.body.opacity,
		size = req.body.size,
		loopTime = req.body.loopTime,
		red = req.body.red,
		blue = req.body.blue,
		green = req.body.green,
		particleType = req.body.particleType;

	res.render('index.ejs', { 
		title: "test",
		data: {
			amount: amount,
			gravity: gravity,
			wind: wind,
			yVelocity: yVelocity,
			xVelocity: xVelocity,
			opacity: opacity,
			size: size,
			loopTime: loopTime,
			red: red,
			blue: blue,
			green: green,
			particleType: particleType
		},
		reset: false 
	});
});

module.exports = router;
