
class Level
{
	constructor(name, defnName, size, goal, obstacles, train)
	{
		this.name = name;
		this.defnName = defnName;
		this.size = size;
		this.goal = goal;
		this.obstacles = obstacles;
		this.train = train;

		this.bounds =
			new Bounds(Coords.Instances().Zeroes, this.size);
		this.collisions = [];
	}

	defn()
	{
		return Globals.Instance.world.levelDefnByName(this.defnName);
	}

	initialize()
	{
		this.train.initialize();

		// hack
		if (URLHelper.queryStringVariableGet("cheat") == null)
		{
			this.train.carsRandomize(); 
		}

		this.status = Status.Instances().NotStarted;
	}

	updateForTimerTick()
	{
		var display = Globals.Instance.display;
		var inputHelper = Globals.Instance.inputHelper;
		var statuses = Status.Instances();

		this.drawToDisplay(display);

		if (this.status == statuses.NotStarted)
		{
			this.updateForTimerTick_NotStarted();
		}
		else if (this.status == statuses.Successful)
		{
			display.drawText
			(
				"Success!  Press the Enter key to start the next level.", 
				new Coords(0, display.fontHeightInPixels)
			);

			if (inputHelper.keyPressed == "Enter")
			{
				 Globals.Instance.world.levelAdvance();
			}
		}
		else if (this.status == statuses.Failed)
		{
			display.drawText
			(
				"You failed!  Press the Enter key to restart this level.", 
				new Coords(0, display.fontHeightInPixels)
			);

			if (inputHelper.keyPressed == "Enter")
			{
				var world = Globals.Instance.world;
				world.levelIndexCurrent--; // hack
				world.levelAdvance();
			}
		}
		else // if (this.status == Status.Instances().Running)
		{
			this.updateForTimerTick_Running();
		}
	}

	updateForTimerTick_NotStarted()
	{
		var display = Globals.Instance.display;

		display.drawText
		(
			"Press arrow keys to move cars, or Enter to start.", 
			new Coords(0, display.fontHeightInPixels)
		);

		var inputHelper = Globals.Instance.inputHelper;
		var keyPressed = inputHelper.keyPressed;

		if (keyPressed == null)
		{
			// do nothing
		}
		else if (keyPressed.startsWith("Arrow"))
		{
			var carIndexRange =
				new Range(1, this.train.cars.length - 1);

			if (keyPressed.endsWith("Down"))
			{
				var carIndexActiveNext =
					this.train.carIndexActive + 1;

				if (carIndexRange.contains(carIndexActiveNext))
				{
					var carToMove = this.train.carActive();
					var carToSwapWith =
						this.train.cars[carIndexActiveNext];

					this.train.carsSwap(carToMove, carToSwapWith);

					this.train.carIndexActive = carIndexActiveNext;
				}
			}
			else if (keyPressed.endsWith("Left"))
			{
				this.train.carIndexActive = carIndexRange.trimValue
				(
					this.train.carIndexActive + 1
				);
			}
			else if (keyPressed.endsWith("Right"))
			{
				this.train.carIndexActive = carIndexRange.trimValue
				(
					this.train.carIndexActive - 1
				);

			}
			else if (keyPressed.endsWith("Up"))
			{
				var carIndexActiveNext =
					this.train.carIndexActive - 1;

				if (carIndexRange.contains(carIndexActiveNext))
				{
					var carToMove = this.train.carActive();
					var carToSwapWith = this.train.cars[carIndexActiveNext];

					this.train.carsSwap(carToMove, carToSwapWith);

					this.train.carIndexActive = carIndexActiveNext;
				}
			}
		}
		else if (keyPressed == "Enter")
		{
			this.train.carIndexActive = 0;
			this.status = Status.Instances().Running;
		}
	}

	updateForTimerTick_Running()
	{
		this.train.updateForTimerTick();

		var car0 = this.train.cars[0];
		if (this.bounds.contains(car0.pos) == false)
		{
			var collisionWithBounds = new Collision(car0.pos);
			this.collisions.push(collisionWithBounds);
			this.status = Status.Instances().Failed;
		}
		else
		{
			var collisionObstacles = Collision.ofTrainAndObstacles
			(
				this.train, this.obstacles
			);

			if (collisionObstacles != null)
			{
				this.collisions.push(collisionObstacles);
				this.status = Status.Instances().Failed;
			}
			else if (this.train.carActive() == null)
			{
				var trainCar0Collider = car0.collider();
				var goalCollider = this.goal;

				var collisionWithGoal = Collision.ofCircles
				(
					trainCar0Collider,
					goalCollider
				);

				if (collisionWithGoal == null)
				{
					this.status = Status.Instances().Failed;
				}
				else
				{
					this.status = Status.Instances().Successful;
				}
			}
		}
	}

	// cloneable

	clone()
	{
		return new Level
		(
			this.name,
			this.defnName, 
			this.size.clone(),
			this.goal.clone(),
			ArrayHelper.cloneArray(this.obstacles),
			this.train.clone()
		);
	}

	// drawable

	drawToDisplay(display)
	{
		display.drawRectangle
		(
			Coords.Instances().Zeroes, 
			display.sizeInPixels,
			this.defn().color,
			display.colorFore
		);

		display.drawCircle
		(
			this.goal.center, this.goal.radius, null, "Green"
		);

		this.train.drawToDisplay(display, this);

		for (var i = 0; i < this.obstacles.length; i++)
		{
			var obstacle = this.obstacles[i];
			obstacle.drawToDisplay(display, this);
		}

		for (var i = 0; i < this.collisions.length; i++)
		{
			var collision = this.collisions[i];
			collision.drawToDisplay(display, this);
		}

		display.drawText(this.name, Coords.Instances().Zeroes);
	}
}
