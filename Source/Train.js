
class Train
{
	constructor(defnName, pos, heading, cars)
	{
		this.defnName = defnName;
		this.pos = pos;
		this.heading = heading;
		this.cars = cars;

		this.carIndexActive = 1;
		this.timerTicksOnCarActive = 0;

		// hack
		var car0 = this.cars[0];
		if (car0.pos.x == null)
		{
			car0.pos.overwriteWith(this.pos);
			this.carsAlign();
		}
	}

	carActive()
	{
		var returnValue =
		(
			this.carIndexActive == null
			? null
			: this.cars[this.carIndexActive]
		);
		return returnValue;
	}

	carActiveNext()
	{
		var returnValue;

		if (this.carIndexActive == null)
		{
			returnValue = null;
		}
		else if (this.carIndexActive >= this.cars.length - 1)
		{
			returnValue = null;	
		}
		else
		{
			returnValue = this.cars[this.carIndexActive + 1];
		}

		return returnValue;
	}

	carBefore(car)
	{
		var returnValue = this.cars[this.cars.indexOf(car) - 1];
		return returnValue;
	}

	carsAlign()
	{
		var car0Pos = this.cars[0].pos.clone();

		var displacementPerCar = new Coords().fromPolar
		(
			new Polar(this.heading, -1)
		).multiplyScalar
		(
			this.defn().carDiameter
		);

		for (var i = 1; i < this.cars.length; i++)
		{
			var car = this.cars[i];
			car.pos.overwriteWith
			(
				displacementPerCar
			).multiplyScalar
			(
				i
			).add
			(
				car0Pos
			);
		}

		return this;
	}

	carsAccordion()
	{
		var carPrevPos = this.cars[0].pos.clone();

		var displacementAsPolar =
			new Polar(this.heading, 0 - this.defn().carDiameter);

		var displacement = new Coords();

		for (var i = 1; i < this.cars.length; i++)
		{
			var car = this.cars[i];

			car.pos.overwriteWith
			(
				displacement.fromPolar
				(
					displacementAsPolar
				)
			).add
			(
				carPrevPos
			)

			carPrevPos.overwriteWith(car.pos);

			displacementAsPolar.angleInCycles = 
				this.heading + .125 * (i % 2 == 0 ? -1 : 1);
		}

		return this;
	}

	carsCircle()
	{
		var carPrevPos = this.cars[0].pos.clone();

		var displacementAsPolar =
			new Polar(this.heading, 0 - this.defn().carDiameter);
		var verticesInRing = this.cars.length * 1.5;
		var angleChangePerCar = 1 / verticesInRing;

		var displacement = new Coords();

		for (var i = 1; i < this.cars.length; i++)
		{
			var car = this.cars[i];

			car.pos.overwriteWith
			(
				displacement.fromPolar
				(
					displacementAsPolar
				)
			).add
			(
				carPrevPos
			)

			carPrevPos.overwriteWith(car.pos);

			displacementAsPolar.angleInCycles += angleChangePerCar;
		}

		return this;
	}

	carsRandomize()
	{
		var carsRandomized = [];

		for (var i = 1; i < this.cars.length; i++)
		{
			var carToRandomize = this.cars[i];

			var j = Math.floor
			(
				Math.random() * carsRandomized.length 
			);

			ArrayHelper.insertElementIntoArrayAtIndex
			(
				carToRandomize, carsRandomized, j
			);
		}

		ArrayHelper.insertElementIntoArrayAtIndex
		(
			this.cars[0], carsRandomized, 0
		);

		this.carsRepositionForNewOrder(this.cars, carsRandomized);

		this.cars = carsRandomized;

		return this;
	}

	carsRepositionForNewOrder(carsInOldOrder, carsInNewOrder)
	{
		var carPositionsFromOldOrder = [];

		for (var i = 0; i < carsInOldOrder.length; i++)
		{
			var carFromOldOrder = carsInOldOrder[i];
			carPositionsFromOldOrder.push(carFromOldOrder.pos.clone());
		}

		for (var i = 0; i < carPositionsFromOldOrder.length; i++)
		{
			var carPos = carPositionsFromOldOrder[i];
			var carFromNewOrder = carsInNewOrder[i];

			carFromNewOrder.pos.overwriteWith(carPos);
		}
	}

	carsSort()
	{
		var carsSorted = [];

		for (var i = 1; i < this.cars.length; i++)
		{
			var carToSort = this.cars[i];

			var j;
			for (j = 0; j < carsSorted.length; j++)
			{
				var carAlreadySorted = carsSorted[j];
				if (carToSort.defnCode <= carAlreadySorted.defnCode)
				{
					break;
				}
			}

			ArrayHelper.insertElementIntoArrayAtIndex
			(
				carToSort, carsSorted, j
			);
		}

		ArrayHelper.insertElementIntoArrayAtIndex
		(
			this.cars[0], carsSorted, 0
		);

		this.carsRepositionForNewOrder(this.cars, carsSorted);

		this.cars = carsSorted;

		return this;
	}

	carsSwap(carToMove, carToSwapWith)
	{
		var indexOfCarToMoveOriginal = this.cars.indexOf(carToMove);

		ArrayHelper.removeElementFromArray
		(
			carToMove, this.cars
		);

		ArrayHelper.insertElementIntoArrayAtIndex
		(
			carToMove,
			this.cars,
			this.cars.indexOf(carToSwapWith)
		);

		ArrayHelper.removeElementFromArray
		(
			carToSwapWith,
			this.cars
		);

		ArrayHelper.insertElementIntoArrayAtIndex
		(
			carToSwapWith,
			this.cars,
			indexOfCarToMoveOriginal
		);

		carToMove.pos.swapWith(carToSwapWith.pos);
	}

	defn()
	{
		return Globals.Instance.world.trainDefnByName(this.defnName);
	}

	initialize()
	{
		for (var i = 0; i < this.cars.length; i++)
		{
			var car = this.cars[i];
			car._collider = new ShapeCircle
			(
				car.pos, this.defn().carRadius
			);
		}
	}

	updateForTimerTick(level)
	{
		var carActive = this.carActive();

		if (carActive == null)
		{
			return;
		}

		carActive.act(level, this);

		var defn = this.defn();

		var displacement = new Coords();
		var carPrev = this.cars[0];

		for (var i = 1; i < this.cars.length; i++)
		{
			var car = this.cars[i];

			displacement.overwriteWith
			(
				car.pos
			).subtract
			(
				carPrev.pos
			).trimToMagnitudeMinMax
			(
				defn.carDiameter,
				defn.carDiameter
			);

			car.pos.overwriteWith
			(
				carPrev.pos
			).add
			(
				displacement
			);

			carPrev = car;
		}

		this.timerTicksOnCarActive++;

		if (this.timerTicksOnCarActive >= defn.timerTicksActivePerCar)
		{
			carActive.finish(level, this, carActive);

			this.timerTicksOnCarActive = 0;

			carActive.next(level, this);

			if (this.carIndexActive >= this.cars.length)
			{
				this.carIndexActive = null;
			}
			else
			{
				carActive = this.carActive();
				carActive.start(level, this, carActive);
			}
		}
	}

	// cloneable

	clone()
	{
		return new Train
		(
			this.defnName, 
			this.pos.clone(),
			this.heading, 
			ArrayHelper.cloneArray(this.cars)
		);
	}

	// drawable

	drawToDisplay(display, level)
	{
		for (var i = 0; i < this.cars.length; i++)
		{
			var car = this.cars[i];

			car.drawToDisplay(display, level, this);
		}

		var carActive = this.carActive();

		if (carActive != null)
		{
			var carSizeHalf = new Coords(1, 1).multiplyScalar
			(
				this.defn().carRadius
			);

			var carSize = new Coords(1, 1).multiplyScalar
			(
				this.defn().carDiameter
			);

			display.drawRectangle
			(
				carActive.pos.clone().subtract
				(
					carSizeHalf
				),
				carSize,
				null, // colorFill
				"Black"
			);
		}
	}
}
