
var amount = document.getElementById("dataStuff").getAttribute("data-amount"),
		gravity = document.getElementById("dataStuff").getAttribute("data-gravity"),
		wind = document.getElementById("dataStuff").getAttribute("data-wind"),
		yV = document.getElementById("dataStuff").getAttribute("data-yVelocity"),
		xV = document.getElementById("dataStuff").getAttribute("data-xVelocity"),
		opacity = document.getElementById("dataStuff").getAttribute("data-opacity"),
		radius = document.getElementById("dataStuff").getAttribute("data-size"),
		time = document.getElementById("dataStuff").getAttribute("data-loopTime"),
		red = document.getElementById("dataStuff").getAttribute("data-red"),
		blue = document.getElementById("dataStuff").getAttribute("data-blue"),
		green = document.getElementById("dataStuff").getAttribute("data-green"),
		type = document.getElementById("dataStuff").getAttribute("data-particleType"),
		tunnel = document.getElementById("dataStuff").getAttribute("data-tunnel"),
		vortex = document.getElementById("dataStuff").getAttribute("data-vortex");


		amount  = Number(amount);
		gravity = Number(gravity);
		wind 	= Number(wind);
		yV      = Number(yV);
		xV      = Number(xV);
		opacity = Number(opacity);
		radius  = Number(radius);
		time    = Number(time);
		red     = Number(red);
		blue    = Number(blue);
		green   = Number(green);
		type    = Number(type);
		tunnel  = Number(tunnel);
		vortex  = Number(vortex);

window.onload = function(){
	particleField(amount, gravity, wind, yV, xV, opacity, radius, time, red, blue, green, type, tunnel, vortex);
}

function particleField(quant, force1, force2, vY, vX, opac, weight, time, r, b, g, type, tunnel, vortex){

	console.log(arguments);

    var particleAmount = quant,
		grav           = force1,     // 1 - 1000
		wind           = force2,      // 1 - 1000
		yVelocity      = vY,     // 1 - 1000
		xVelocity      = vX,     // 1 - 1000
		opacity        = opac,     // 1 - 100
		size           = weight,       // 1 - 90
		loopTime       = time,    // 1- 1200
		red            = r,    // 0 - 355
		blue           = b,    // 0 - 355
		green          = g,     // 0 - 355
		dots           = type,		  // 0 - 1
		tunnel         = tunnel,		  // 0 - 1
		vortex         = vortex;     // 1- 5	

		opacity = 1001 - opacity;
		if (dots) {
			particleAmount = 2;
		}
	
	var canvas 		   = document.createElement("canvas"),
		c	   		   = canvas.getContext("2d"),
		particleMem    = {},
		particleIndex  = 0;

	canvas.id 	   = "canvas-time";

	document.body.appendChild(canvas);
	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;
	c.fillStyle = "black";
	c.fillRect(0, 0, canvas.width, canvas.height);

	function Particle(){
		
		this.radius  = (size * Math.random());
		if (tunnel) {
			if (vortex === 1) {
				this.x = Math.random() * (canvas.width - 170) + 170;
			} else {
				this.x = Math.random() * (canvas.width / vortex - 170) + (canvas.width / 2 - canvas.width / (vortex * 2)) + 170;
			}
		} else {
			this.x = Math.random() * (canvas.width - 170) + 170;
		}
		
		this.y       = Math.random() * canvas.height;
		this.vy      = (-yVelocity / 200) * (Math.random() + .5);
		this.vx      = (xVelocity / 200) * (Math.random() + .5);
		this.wind    = -.0001 * wind;
		this.gravity = .0001 * grav;
		this.ay      = this.gravity;
		this.ax      = this.gravity;
		
		this.alphaRadians = 0;
		this.alpha        = 0;

		this.life    = 0;
		this.maxLife = Math.floor(800 * Math.random());
		
		particleMem[particleIndex] = this;
		particleIndex++;
		this.id = particleIndex;

		this.initialAlphaScale = opacity * .005;
		if (this.radius < size * .1) {
			this.radius += .02;
		}
		
		//this sets the dividing constant for the alpha channel in rgba
		//causes variation in opacity depending on the particle's height
		
		if (this.id % loopTime === 0) {
			c.fillStyle = "black";
			c.fillRect(0, 0, canvas.width, canvas.height);
		}

		this.red   = Math.floor(red * Math.random()) * (Math.floor(red * Math.random()) / 2);
		this.green = Math.floor(green * Math.random()) * (Math.floor(green * Math.random()) / 2);
		this.blue  = Math.floor(blue * Math.random()) * (Math.floor(blue * Math.random()) / 2);
		this.rgb   = "rgba("+ this.red + ", "+ this.green +", " + this.blue;

		this.drawCircle = function(){

			this.alpha 	       = Math.sin(this.alphaRadians) / this.initialAlphaScale;
			this.alphaRadians += (Math.PI / this.maxLife);
			this.x 			  += (this.vx * .9);
			this.y 			  += (this.vy * .9);
			//mimicks the effect of gravity on the velocity.
			this.vy 		  += this.gravity;
			this.vx 		  += this.wind;
						
			c.beginPath();
			c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
			c.fill();
			c.fillStyle = this.rgb  + ", "+ this.alpha +")";
			
			this.life++;

			if (this.life > this.maxLife) {
				delete particleMem[this.id];
				delete particleMem[this.id - 1];
				delete particleMem[this.id - 2];
				delete particleMem[this.id - 3];
				delete particleMem[this.id - 4];
			}
			if (tunnel) {
				if (this.x < canvas.width + canvas.width / 2 + 50) {
					if (this.x > canvas.width / 2) {
						this.vx -= .05;
					} else {
						this.vx += .05;
					}
				} 
			}
		}

	}

	function emit(){
		for(i = 0; i < particleAmount; i++) {
			new Particle;
		}
	}
	
	setInterval(function(){
		
		if (dots) {
			c.fillStyle = "black";
			c.fillRect(0, 0, canvas.width, canvas.height);
		}
		
		new Particle;
		
		for (var i in particleMem) {
			particleMem[i].drawCircle();
		}
	}, 2);
}
