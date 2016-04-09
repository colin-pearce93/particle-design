var express = require('express');
var router = express.Router();

/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('index.ejs', { 
  		title: "Express",
		data: {
			gravity:      2,
			wind:         1,
			yVelocity:    7,
			xVelocity:    5,
			opacity:    960,
			size:         3,
			loopTime:   300,
			red:        255,
			blue:       200,
			green:      200,
			particleType: 1,
			tunnel:       0,
			vortex:       1,
			density:      15
		},
		reset: true  
	});
});


///NEED TO req.bodies CONVERT TO NUMBERS


router.post('/particle', function(req, res, next) {
		
	var gravity      = Number(req.body.gravity),
		wind         = Number(req.body.wind),
		yVelocity    = Number(req.body.yVelocity),
		xVelocity    = Number(req.body.xVelocity),
		opacity      = Number(req.body.opacity),
		size         = Number(req.body.radius),
		loopTime     = Number(req.body.loopTime),
		red          = Number(req.body.red),
		blue         = Number(req.body.blue),
		green        = Number(req.body.green),
		particleType = Number(req.body.particleType),
		tunnel       = Number(req.body.tunnel),
		vortex       = Number(req.body.vortex),
		density      = Number(req.body.density);


		if (!vortex) {
			vortex = 1;
		} 

	res.render('index.ejs', { 
		title: "test",
		data: {
			gravity:      gravity,
			wind:         wind,
			yVelocity:    yVelocity,
			xVelocity:    xVelocity,
			opacity:      opacity,
			size:         size,
			loopTime:     loopTime,
			red:          red,
			blue:         blue,
			green:        green,
			particleType: particleType,
			tunnel:       tunnel,
			vortex:       vortex,
			density:      density
		},
		reset: false 
	});
});

router.get('/particle', function(req, res, next) {
	res.redirect('/');
});

module.exports = router;
