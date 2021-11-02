
class Coords
{
	constructor(x, y)
	{
		this.x = x;
		this.y = y;
	}

	// instances

	static Instances()
	{
		if (Coords._instances == null)
		{
			Coords._instances = new Coords_Instances();
		}
		return Coords._instances;
	}

	// methods

	add(other)
	{
		this.x += other.x;
		this.y += other.y;
		return this;
	}

	clone()
	{
		return new Coords(this.x, this.y);
	}

	divideScalar(scalar)
	{
		this.x /= scalar;
		this.y /= scalar;
		return this;
	}

	fromPolar(polar)
	{
		this.x = Math.cos
		(
			polar.angleInCycles * Polar.RadiansPerCycle
		);
		this.y = Math.sin
		(
			polar.angleInCycles * Polar.RadiansPerCycle
		);
		this.multiplyScalar(polar.distance);
		return this;
	}

	overwriteWith(other)
	{
		this.x = other.x;
		this.y = other.y;
		return this;
	}

	magnitude()
	{
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	multiplyScalar(scalar)
	{
		this.x *= scalar;
		this.y *= scalar;
		return this;
	}

	subtract(other)
	{
		this.x -= other.x;
		this.y -= other.y;
		return this;
	}

	swapWith(other)
	{
		var temp = this.clone();
		this.overwriteWith(other);
		other.overwriteWith(temp);
		return this;
	}

	trimToMagnitudeMinMax(magnitudeMin, magnitudeMax)
	{
		var magnitude = this.magnitude();

		if (magnitude == 0)
		{
			this.x = magnitudeMin;
		}

		if (magnitude < magnitudeMin)
		{
			this.divideScalar
			(
				magnitude
			).multiplyScalar
			(
				magnitudeMin
			);
		}

		if (magnitude > magnitudeMax)
		{
			this.divideScalar
			(
				magnitude
			).multiplyScalar
			(
				magnitudeMax
			);
		}

		return this;
	}
}

class Coords_Instances
{
	constructor()
	{
		this.Zeroes = new Coords(0, 0);
	}
}
