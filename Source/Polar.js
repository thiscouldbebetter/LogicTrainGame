
class Polar
{
	constructor(angleInCycles, distance)
	{
		this.angleInCycles = angleInCycles;
		this.distance = distance;
	}

	static RadiansPerCycle = Math.PI * 2;

	fromCoords(coords)
	{
		this.distance = coords.magnitude();

		this.angleInCyles = 
			Math.atan2(coords.y, coords.x) 
			/ Polar.RadiansPerCycle;

		return this;
	}
}
