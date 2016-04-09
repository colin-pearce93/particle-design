




window.onload = function(){
	particleField(amount, gravity, wind, yV, xV, opacity, radius, time, red, blue, green, type);
}




function particleField(quant, force1, force2, vY, vX, opac, weight, time, r, g, b, type){

	console.log(arguments);

    var particleAmount = quant,
		grav           = force1,	// need to find a range for these values that would make them appropriate
		wind           = force2,
		yVelocity      = vY, // 0 - 1
		xVelocity      = vX, // 0 - 1
		opacity        = opac,
		size           = weight, //1 - 50
		loopTime       = time,
		red            = r, // 0 - 255
		blue           = g, // 0 - 255
		green          = b, // 0 - 255
		dots           = type;
	
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
		
		this.radius  = 1 * (size * Math.random());
		this.x       = Math.random() * canvas.width / 2 + canvas.width / 8;
		this.y       = Math.random() * canvas.height;
		this.vy      = yVelocity;
		this.vx      = xVelocity;
		this.gravity = .00000005 * grav;
		
		this.alphaRadians = Math.PI;
		this.alpha        = 0;

		this.life    = 0;
		this.maxLife = 290;
		
		particleMem[particleIndex] = this;
		particleIndex++;
		this.id = particleIndex;
		
		//this sets the dividing constant for the alpha channel in rgba
		//causes variation in opacity depending on the particle's height
		this.alphaScale = opacity / this.radius;
		
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

			this.alpha 	       = Math.sin(this.alphaRadians) / this.alphaScale;
			this.alphaRadians += (Math.PI / this.maxLife);
			this.x  *= (this.vx);
			this.y  *= (this.vy);
			this.vx += this.gravity;
			this.vy -= this.gravity;
			
			if (this.x < canvas.width / 2 + canvas.width / 4) {
				if (this.x < canvas.width / 2) {
					this.gravity += -.00000001;
						
				} else if (this.x < canvas.width / 4) {
					this.gravity += -.00000007;
				} else {
					this.gravity -= -.00000007;
				}
			} 
						
			c.beginPath();
			c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
			c.fill();
			c.fillStyle = this.rgb  + ", "+ this.alpha +")";
			
			this.life++;

			if (this.life > this.maxLife) {
				delete particleMem[this.id];
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
		
		emit();
		
		for (var i in particleMem) {
			particleMem[i].drawCircle();
		}
	}, 1);

}
