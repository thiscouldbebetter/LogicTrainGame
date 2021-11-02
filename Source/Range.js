
class Range
{
	constructor(min, max)
	{
		this.min = min;
		this.max = max;

		this.size = this.max - this.min;
	}

	static Instances()
	{
		if (Range._instances == null)
		{
			Range._instances = new Range_Instances();
		}
		return Range._instances;
	}

	contains(valueToCheck)
	{
		var returnValue = 
		(
			valueToCheck >= this.min 
			&& valueToCheck <= this.max
		);
		return returnValue;	
	}

	trimValue(valueToTrim)
	{
		if (valueToTrim < this.min)
		{
			valueToTrim = this.min;
		}

		while (valueToTrim > this.max)
		{
			valueToTrim = this.max;
		}

		return valueToTrim;
	}

	wrapValue(valueToWrap)
	{
		while (valueToWrap < this.min)
		{
			valueToWrap += this.size;
		}

		while (valueToWrap > this.max)
		{
			valueToWrap -= this.size;
		}

		return valueToWrap;
	}
}

class Range_Instances
{
	constructor()
	{
		this.ZeroToOne = new Range(0, 1);
	}
}
