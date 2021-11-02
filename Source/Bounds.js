
class Bounds
{
	constructor(min, max)
	{
		this.min = min;
		this.max = max;
		this.size = this.max.clone().subtract(this.min);
	}

	contains(posToCheck)
	{
		var returnValue =
		(
			posToCheck.x >= this.min.x
			&& posToCheck.x <= this.max.x
			&& posToCheck.y >= this.min.y
			&& posToCheck.y <= this.max.y
		);

		return returnValue;
	}
}
