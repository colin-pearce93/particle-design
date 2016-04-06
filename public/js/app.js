window.onload = function() {
	var canvas = document.getElementById("paper"),
	    c = canvas.getContext("2d");

	c.fillStyle = "black";
	c.fillRect = (0, 0, canvas.width, canvas.height);
};
