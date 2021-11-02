
class TrainCarDefn
{
	constructor
	(
		name, code, color, symbol,
		start, act, finish, next
	)
	{
		this.name = name;
		this.code = code;
		this.color = color;
		this.symbol = symbol;
		this.start = start;
		this.act = act;
		this.finish = finish;
		this.next = next;
	}

	static Instances()
	{
		if (TrainCarDefn._instances == null)
		{
			TrainCarDefn._instances =
				new TrainCarDefn_Instances();
		}
		return TrainCarDefn._instances;
	}
}

class TrainCarDefn_Instances
{
	constructor()
	{
		this.Head = new TrainCarDefn
		(
			"Head", 
			"h", // code
			"Gray", 
			"h", // symbol
			null, // start
			// act
			(level, train, carActive) =>
			{
				train.timerTicksOnCarActive = train.defn().timerTicksActivePerCar;
			},
			null, // finish
			null // next
		);

		this.InvertNext = new TrainCarDefn
		(
			"InvertNext", 
			"i", // code
			"Orange", 
			"!", // symbol
			// start
			(level, train, carActive) =>
			{
				this.carDefnCodeToInverseLookup = 
				{
					"b" : "f",
					"f" : "b",
					"i" : "_",
					"l" : "r",
					"r" : "l"
				};
			},
			// act
			(level, train, carActive) =>
			{
				var carNext = train.carActiveNext();
				if (carNext == null)
				{
					return;
				}

				var carNextDefnCode = carNext.defnCode;
				var defnCodeInverse = 
					this.carDefnCodeToInverseLookup[carNextDefnCode];
				if (defnCodeInverse == null)
				{
					defnCodeInverse = carNextDefnCode;
				}

				var world = Globals.Instance.world;
				var defnInverse = 
					world.trainCarDefnByCode(defnCodeInverse);

				defnInverse.act(level, train, carActive);
			},
			// finish
			(level, train, carActive) =>
			{
				train.carIndexActive++;	
			},
			null // next
		);

		this.MoveBackward = new TrainCarDefn
		(
			"MoveBackward", 
			"b", // code
			"Violet", 
			"v", // symbol
			null, // start
			// act
			(level, train, carActive, multiplier) =>
			{
				if (multiplier == null)
				{
					multiplier = 1;
				}

				var headingAsPolar = new Polar
				(
					train.heading, 
					train.defn().speed * multiplier
				);
				var displacement = new Coords().fromPolar
				(
					headingAsPolar
				);
				var car0 = train.cars[0];
				car0.pos.subtract
				(
					displacement
				);

				displacement.overwriteWith
				(
					car0.pos
				).subtract
				(
					train.cars[1].pos
				);
				headingAsPolar.fromCoords(displacement)
				train.heading = headingAsPolar.angleInCycles;
			},
			null, // finish
			null // next
		);

		this.MoveForward = new TrainCarDefn
		(
			"MoveForward", 
			"f", // code
			"LightGreen", 
			"^", // symbol
			null, // start
			// act
			(level, train, carActive, multiplier) =>
			{
				if (multiplier == null)
				{
					multiplier = 1;
				}

				var headingAsPolar = new Polar
				(
					train.heading, 
					train.defn().speed * multiplier
				);
				var displacement = new Coords().fromPolar
				(
					headingAsPolar
				);
				var car0 = train.cars[0];
				car0.pos.add
				(
					displacement
				);
			},
			null, // finish
			null // next
		);

		this.PassthroughToNext = new TrainCarDefn
		(
			"PassthroughToNext", 
			"_", // code
			"Orange", 
			"_", // symbol
			null, // start
			// act
			(level, train, carActive) =>
			{
				var carNext = train.carActiveNext();
				if (carNext != null)
				{
					carNext.act(level, train, carNext);
				}
			},
			null, // finish
			null // next
		);

		this.Repeat = new TrainCarDefn
		(
			"Repeat", 
			"x2", // code
			"Orange", 
			"2", // symbol
			null, // start
			// act
			(level, train, carActive) =>
			{
				if (carActive.timesRepeated == null)
				{
					carActive.timesRepeated = 0;
				}
				var carPrev = train.carBefore(carActive);
				carPrev.act(level, train, carPrev);
			},
			// finish
			(level, train, carActive) =>
			{
				carActive.timesRepeated++;
				if (carActive.timesRepeated < 1)
				{
					train.carIndexActive--;
				}
				else
				{
					carActive.timesRepeated = null;
				}

				var carPrev = train.carBefore(carActive);
				carPrev.finish(level, train, carPrev);
			},
			null // next
		);

		this.RepeatTwice = new TrainCarDefn
		(
			"RepeatTwice", 
			"x3", // code
			"Orange", 
			"3", // symbol
			null, // start
			// act
			(level, train, carActive) =>
			{
				if (carActive.timesRepeated == null)
				{
					carActive.timesRepeated = 0;
				}
				var carPrev = train.carBefore(carActive);
				carPrev.act(level, train, carPrev);
			},
			// finish
			(level, train, carActive) =>
			{
				carActive.timesRepeated++;
				if (carActive.timesRepeated < 2)
				{
					train.carIndexActive--;
				}
				else
				{
					carActive.timesRepeated = null;
				}

				var carPrev = train.carBefore(carActive);
				carPrev.finish(level, train, carPrev);
			},
			null // next
		);

		this.SkipNext = new TrainCarDefn
		(
			"SkipNext", 
			"x", // code
			"White", 
			"x", // symbol
			null, // start
			// act
			(level, train, carActive) =>
			{
				// do nothing
			},
			// finish
			(level, train, carActive) =>
			{
				train.carIndexActive++;
			},
			null // next
		);

		this.SuppressNext = new TrainCarDefn
		(
			"SuppressNext", 
			"s", // code
			"Red", 
			"-", // symbol
			null, // start
			// act
			(level, train, carActive) =>
			{
				var carNext = train.carActiveNext();
				if (carNext != null)
				{
					carNext.defn().act(level, train, carNext, .5);
				}
			},
			// finish
			(level, train, carActive) =>
			{
				train.carIndexActive++;	
			},
			null // next
		);

		this.TurboNext = new TrainCarDefn
		(
			"TurboNext", 
			"t", // code
			"Red", 
			"+", // symbol
			null, // start
			// act
			(level, train, carActive) =>
			{
				var carNext = train.carActiveNext();
				if (carNext != null)
				{
					carNext.defn().act(level, train, carNext, 2);
				}
			},
			// finish
			(level, train, carActive) =>
			{
				train.carIndexActive++;	
			},
			null // next
		);

		this.TurnLeft = new TrainCarDefn
		(
			"TurnLeft", 
			"l", // code
			"Yellow", 
			"<", // symbol
			null, // start
			// act
			(level, train, carActive, multiplier) =>
			{
				if (multiplier == null)
				{
					multiplier = 1;
				}

				var trainDefn = train.defn();
				var rangeZeroToOne =
					Range.Instances().ZeroToOne;
				train.heading = rangeZeroToOne.wrapValue
				(
					train.heading
					- trainDefn.turnSpeed * multiplier
				);
				var headingAsPolar =
					new Polar(train.heading, trainDefn.speed);
				var displacement = new Coords().fromPolar
				(
					headingAsPolar
				);
				var car0 = train.cars[0];
				car0.pos.add
				(
					displacement
				);
			},
			null, // finish
			null // next
		);

		this.TurnRight = new TrainCarDefn
		(
			"TurnRight", 
			"r", // code
			"Cyan",
			">", // symbol
			null, // start
			// act
			(level, train, carActive, multiplier) =>
			{
				if (multiplier == null)
				{
					multiplier = 1;
				}

				var trainDefn = train.defn();
				var rangeZeroToOne =
					Range.Instances().ZeroToOne;
				train.heading = rangeZeroToOne.wrapValue
				(
					train.heading + trainDefn.turnSpeed * multiplier
				);
				var headingAsPolar = new Polar(train.heading, 1);
				var displacement = new Coords().fromPolar
				(
					headingAsPolar
				);
				var car0 = train.cars[0];
				car0.pos.add
				(
					displacement
				);
			},
			null, // finish
			null // next
		);

		this._All = 
		[
			this.Head,
			this.InvertNext,
			this.MoveBackward,
			this.MoveForward,
			this.Repeat,
			this.RepeatTwice,
			this.SkipNext,
			this.SuppressNext,
			this.TurboNext,
			this.TurnLeft,
			this.TurnRight,
		];
	}
}
