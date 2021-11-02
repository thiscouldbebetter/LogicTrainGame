
class ShapeCircle
{
	constructor(center, radius)
	{
		this.center = center;
		this.radius = radius;
	}

	// cloneable

	clone()
	{
		return new ShapeCircle(this.center.clone(), this.radius);
	}

	// drawable

	drawToDisplay(display, level, colorFill, colorBorder)
	{
		display.drawCircle
		(
			this.center, this.radius, colorFill, colorBorder
		);
	}
}
