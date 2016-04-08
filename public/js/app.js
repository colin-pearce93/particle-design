	


console.log(particleAmount);
console.log(grav);
console.log(wind);
console.log(yVelocity);
console.log(xVelocity);
console.log(opacity);
console.log(size);
console.log(loopTime);
console.log(red);
console.log(blue);
console.log(green);
console.log(dots);

window.onload = function(){
	var canvas 		   = document.createElement("canvas"),
		c	   		   = canvas.getContext("2d"),
		particleMem    = {},
		particleIndex  = 0;

	document.body.appendChild(canvas);
	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;
	c.fillStyle = "black";
	c.fillRect(0, 0, canvas.width, canvas.height);

	function Particle(){
		
		this.radius  = 1 * (size * Math.random());
		this.x       = Math.random() * canvas.width;
		this.y       = Math.random() * canvas.height;
		this.vy      = 1;
		this.vx      = 1;
		this.gravity = -.02 * grav;
		this.wind    = -.02 * wind;

		this.alphaRadians = Math.PI;
		this.alpha        = 0;

		this.life    = 0;
		this.maxLife = 230;
		
		particleMem[particleIndex] = this;
		particleIndex++;
		this.id = particleIndex;
		

		//this sets the dividing constant for the alpha channel in rgba
		//causes variation in opacity depending on the particle's height
		this.alphaScale = 1 / opacity * this.radius;
		

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
			this.x  += (xVelocity * (this.vx));
			this.y  -= (yVelocity * (this.vy));
			this.vy += this.gravity;
			this.vx += this.wind;
			
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
