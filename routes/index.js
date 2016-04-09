var express = require('express');
var router = express.Router();

/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('index.ejs', { 
  		title: "Express",
		data: {
			amount: 2,
			gravity: 1,
			wind: 4,
			yVelocity: 1.0003,
			xVelocity: -1.0001,
			opacity: 2,
			size: 4,
			loopTime: 900,
			red: 100,
			blue: 140,
			green: 230,
			particleType: false,
			tunnel: false
		},
		reset: true  
	});
});


///NEED TO req.bodies CONVERT TO NUMBERS


router.post('/particle', function(req, res, next) {
		
	var amount = 1,
		gravity = Number(req.body.gravity),
		wind = Number(req.body.wind),
		yVelocity = Number(req.body.yVelocity),
		xVelocity = Number(req.body.xVelocity),
		opacity = Number(req.body.opacity),
		size = Number(req.body.radius),
		loopTime = Number(req.body.loopTime),
		red = Number(req.body.red),
		blue = Number(req.body.blue),
		green = Number(req.body.green),
		particleType = Number(req.body.particleType),
		tunnel = Number(req.body.tunnel),
		vortex = Number(req.body.vortex);

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
			particleType: particleType,
			tunnel: tunnel,
			vortex
		},
		reset: false 
	});
});

router.get('/particle', function(req, res, next) {
	res.redirect('/');
});

module.exports = router;
