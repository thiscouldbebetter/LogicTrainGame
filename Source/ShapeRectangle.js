
class ShapeRectangle
{
	constructor(pos, size)
	{
		this.pos = pos;
		this.size = size;
	}

	// cloneable

	clone()
	{
		return new ShapeRectangle(this.pos.clone(), this.size.clone());
	}

	// drawable

	drawToDisplay(display, level, obstacle)
	{
		display.drawRectangle
		(
			this.pos, this.size, "DarkGray", "Black"
		);
	}
}
