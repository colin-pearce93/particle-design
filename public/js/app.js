window.onload = function(){
	particleField();
}


console.log('cahnged file');

// function particleField(quant, force1, force2, vY, vX, opac, weight, time, r, g, b, type)

function particleField(){

	console.log(arguments);

    var particleAmount = 1,
		grav           = 800,     // 1 - 1000
		wind           = 20,      // 1 - 1000
		yVelocity      = 100,     // 1 - 1000
		xVelocity      = 400,     // 1 - 1000
		opacity        = 100,     // 1 - 100
		size           = 2,       // 1 - 90
		loopTime       = 1200,    // 1- 1200
		red            = -100,    // 0 - 355
		blue           = -100,    // 0 - 355
		green          = 160,     // 0 - 355
		dots           = 0,		  // 0 - 1
		tunnel         = 1,		  // 0 - 1
		vortex         = 1;     // 1- 5

		red   -= 100;
		blue  -= 100;
		green -= 100;

		opacity = 100 - opacity;
	
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
			if (cWidth === 1) {
				this.x = Math.random() * (canvas.width);
			} else {
				this.x = Math.random() * canvas.width / cWidth + (canvas.width / 2 - canvas.width / (cWidth * 2));
			}
		} else {
			this.x = Math.random() * (canvas.width);
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

		this.initialAlphaScale = this.radius + opacity * .1;
		if (this.radius < size * .1) {
			this.radius += .02;
		}
		
		//this sets the dividing constant for the alpha channel in rgba
		//causes variation in opacity depending on the particle's height
		
		if (this.id % loopTime === 0) {
			c.fillStyle = "black";
			c.fillRect(0, 0, canvas.width, canvas.height);
		}
		// if (type1) {

		// } else if (type2) {

		// } else if (type3) {

		// }
		
		this.red   = 255 - Math.floor(Math.random() * 2 * blue) - Math.floor(Math.random() * 2 * green);
		this.green = 255 - Math.floor(Math.random() * 2 * blue) - Math.floor(Math.random() * 2 * red);
		this.blue  = 255 - Math.floor(Math.random() * 2 * green) - Math.floor(Math.random() * 2 * red);
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
						this.vx -= .04;
					} else {
						this.vx += .04;
					}
				} 
			}
			
			
			//add a wind like effect somewhere here;
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
