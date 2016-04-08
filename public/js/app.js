window.onload = function(){
	var canvas 		   = document.createElement("canvas"),
		c	   		   = canvas.getContext("2d"),
		particleMem    = {},
		particleIndex  = 0;

	var particleAmount = 1,
		colorShift     = 5,
		grav           = 1,	//need to find a range for these values that would make them appropriate
		tilt           = 1,
		yVelocity      = 1,
		xVelocity      = 1,
		opacity        = 1,
		size           = 1,
		loopTime       = 900,
		red            = 0,
		blue           = 0,
		green          = 0,
		type1          = false,
		type2          = false,
		type3          = false;


	document.body.appendChild(canvas);
	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;
	c.fillStyle = "black";
	c.fillRect(0, 0, canvas.width, canvas.height);

	function Particle(){
		
		this.radius  = 2 * size;
		this.x       = Math.random() * canvas.width;
		this.y       = Math.random() * canvas.height;
		this.vy      = .2 * yVelocity;
		this.vx      = .2 * xVelocity;
		this.gravity = -.02 * grav;
		this.wind    = -.02 * tilt;

		this.alphaRadians = 1;
		this.alpha        = 0;

		this.life    = 0;
		this.maxLife = 90;
		
		particleMem[particleIndex] = this;
		this.id 				   = particleIndex++;
		

		//this sets the dividing constant for the alpha channel in rgba
		//causes variation in opacity depending on the particle's height
		this.alphaScale = this.radius / opacity;
		if (this.radius < 1) {
			this.alphaScale = this.radius + 1;
		}

		if (this.id % loopTime === 0) {
			c.fillStyle = "black";
			c.fillRect(0, 0, canvas.width, canvas.height);
		}
		// if (type1) {

		// } else if (type2) {

		// } else if (type3) {

		// }
		
		this.red   = 255 - blue - green;
		this.green = 255 - blue - red;
		this.blue  = 255 - green - red;
		this.rgb   = "rgba("+ 255 + ", "+ this.green +", " + this.blue;

		this.drawCircle = function(){

			this.alpha 	       = Math.sin(this.alphaRadians) / this.alphaScale;
			this.alphaRadians += (Math.PI / this.maxLife);
			this.x            += this.vx;
			this.y 			  += this.vy;
			this.vy 		  += this.gravity;
			this.vx 		  += this.tilt;

			c.beginPath();
			c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
			c.fill();
			c.fillStyle = this.rgb  + ", "+ this.alpha +")";
			console.log('working2');
			this.life++;

			if (this.life > this.maxLife) {
				delete particleMem[this.id];
			}
			
			
			this.red   += colorShift;
			this.green += colorShift;
			this.blue  += colorShift;


			//add a wind like effect somewhere here;

		}

	}

	function emit(){
		for(i = 0; i < particleAmount; i++) {
			new Particle;
		}
	}

	setInterval(function(){
		emit();
		for (var i in particleMem) {
			particleMem[i].drawCircle();
		}
	}, 4);
}
