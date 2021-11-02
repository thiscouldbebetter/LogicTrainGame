
class Display
{
	constructor(sizeInPixels, colorFore, colorBack, fontHeightInPixels)
	{
		this.sizeInPixels = sizeInPixels;
		this.colorFore = colorFore;
		this.colorBack = colorBack;
		this.fontHeightInPixels = fontHeightInPixels;
	}

	clear()
	{
		this.drawRectangle
		(
			Coords.Instances().Zeroes, 
			this.sizeInPixels, 
			this.colorBack, // colorFill
			this.colorFore // colorBorder
		);
	}

	drawCircle(center, radius, colorFill, colorBorder)
	{
		this.graphics.beginPath();
		this.graphics.arc
		(
			center.x, center.y,
			radius,
			0, Math.PI * 2
		);

		if (colorFill != null)
		{
			this.graphics.fillStyle = colorFill;
			this.graphics.fill();
		}

		if (colorBorder != null)
		{
			this.graphics.strokeStyle = colorBorder;
			this.graphics.stroke();
		}
	}

	drawRectangle(pos, size, colorFill, colorBorder)
	{
		if (colorFill != null)
		{
			this.graphics.fillStyle = colorFill;
			this.graphics.fillRect
			(
				pos.x, pos.y,
				size.x, size.y
			);
		}

		if (colorBorder != null)
		{
			this.graphics.strokeStyle = colorBorder;
			this.graphics.strokeRect
			(
				pos.x, pos.y,
				size.x, size.y
			);
		}
	}

	drawText(text, pos, color)
	{
		if (color == null)
		{
			color = this.colorFore;
		}

		this.graphics.fillStyle = color;
		this.graphics.fillText
		(
			text, pos.x, pos.y + this.fontHeightInPixels
		);
	}

	initialize()
	{
		var canvas = document.createElement("canvas");
		canvas.width = this.sizeInPixels.x;
		canvas.height = this.sizeInPixels.y;

		document.getElementById("divMain").appendChild(canvas);

		this.graphics = canvas.getContext("2d");
		this.graphics.font = this.fontHeightInPixels + " sans-serif";
	}
}
