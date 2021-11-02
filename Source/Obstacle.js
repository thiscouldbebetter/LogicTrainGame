
class Obstacle
{
	constructor(defnName, collider)
	{
		this.defnName = defnName;
		this._collider = collider;
	}

	defn()
	{
		return Globals.Instance.world.obstacleDefnByName(this.defnName);
	}

	// cloneable

	clone()
	{
		return new Obstacle(this.defnName, this._collider.clone());
	}

	// collidable

	collider()
	{
		return this._collider;
	}

	// drawable

	drawToDisplay(display, level)
	{
		var defn = this.defn();
		this._collider.drawToDisplay
		(
			display, level, defn.color, "Black"
		);
	}
}
