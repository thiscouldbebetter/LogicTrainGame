
class TrainCar
{
	constructor(defnCode, pos)
	{
		this.defnCode = defnCode;
		this.pos = pos;

		if (this.pos == null)
		{
			this.pos = new Coords();
		}
	}

	act(level, train)
	{
		this.defn().act(level, train, this);
	}

	defn()
	{
		return Globals.Instance.world.trainCarDefnByCode(this.defnCode);
	}

	finish(level, train)
	{
		var defn = this.defn();
		if (defn.finish !=  null)
		{
			defn.finish(level, train, this);
		}
	}

	next(level, train)
	{
		var next = this.defn().next;
		if (next == null)
		{
			train.carIndexActive++;
		}
		else
		{
			next(level, train, this);
		}
	}

	start(level, train)
	{
		var defn = this.defn();
		if (defn.start !=  null)
		{
			defn.start(level, train, this);
		}
	}

	// collidable

	collider()
	{
		return this._collider;
	}

	// cloneable

	clone()
	{
		return new TrainCar(this.defnCode, this.pos.clone());
	}

	// drawable

	drawToDisplay(display, level, train)
	{
		display.drawCircle
		(
			this.pos, // center
			train.defn().carRadius,
			this.defn().color,
			display.colorFore
		);

		display.drawText
		(
			this.defn().symbol.toUpperCase(),
			this.pos.clone().subtract
			(
				new Coords(.7, 1.33).multiplyScalar
				(
					train.defn().carRadius
				)
			),
			"Black"
		);
	}
}
