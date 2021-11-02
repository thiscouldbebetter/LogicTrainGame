
class DemoData
{
	world()
	{
		var trainDefns = 
		[
			new TrainDefn
			(
				"Default",
				5, // carRadius
				50, // timerTicksActivePerCar
				1, // speed
				.005 // turnSpeed
			),
		];

		var trainCarDefns = TrainCarDefn.Instances()._All;

		var obstacleDefns = 
		[
			new ObstacleDefn("Rock", "Gray"),
			new ObstacleDefn("Water", "Blue"),
		];

		var levelDefns =
		[
			new LevelDefn("Default", "LightGreen"),
		];

		var levelIndexInitial = parseInt(URLHelper.queryStringVariableGet("level"));
		if (isNaN(levelIndexInitial) == true)
		{
			levelIndexInitial = 0;
		}

		var world = new World
		(
			trainDefns,
			trainCarDefns,
			obstacleDefns,
			levelDefns,
			[], // levels
			levelIndexInitial
		);

		Globals.Instance.world = world; // hack

		var levelSize = new Coords(300, 300);

		var levelJustGo = new Level
		(
			"Just Go",
			"Default", // levelDefnName
			levelSize, 
			new ShapeCircle(new Coords(230, 150), 10), // goal
			// obstacles
			[
				// none
			],
			new Train
			(
				"Default", // defnName
				new Coords(80, 150), // pos
				0, // heading
				// cars
				[
					new TrainCar("h"),
					new TrainCar("f"),
					new TrainCar("f"),
					new TrainCar("f"),
				]
			)
		);

		var levelIWannaGoFast = new Level
		(
			"I Wanna Go Fast",
			"Default", // levelDefnName
			levelSize, 
			new ShapeCircle(new Coords(230, 150), 10), // goal
			// obstacles
			[
				// none
			],
			new Train
			(
				"Default", // defnName
				new Coords(80, 150), // pos
				0, // heading
				// cars
				[
					new TrainCar("h"),
					new TrainCar("t"),
					new TrainCar("f"),
					new TrainCar("f"),
				]
			)
		);


		var levelLeGrandTour = new Level
		(
			"Le Grand Tour",
			"Default", // levelDefnName
			levelSize, 
			new ShapeCircle(new Coords(200, 200), 10), // goalPos
			// obstacles
			[
				new Obstacle("Rock", new ShapeCircle(new Coords(203, 88), 25)),
				new Obstacle("Rock", new ShapeCircle(new Coords(243, 128), 25)),

				new Obstacle("Rock", new ShapeCircle(new Coords(120, 70), 16)),
				new Obstacle("Rock", new ShapeCircle(new Coords(150, 100), 25)),
				new Obstacle("Rock", new ShapeCircle(new Coords(190, 140), 25)),

				new Obstacle("Rock", new ShapeCircle(new Coords(70, 120), 16)),
				new Obstacle("Rock", new ShapeCircle(new Coords(100, 150), 25)),
				new Obstacle("Rock", new ShapeCircle(new Coords(140, 190), 25)),

				new Obstacle("Rock", new ShapeCircle(new Coords(88, 203), 25)),
				new Obstacle("Rock", new ShapeCircle(new Coords(128, 243), 25)),
			],
			new Train
			(
				"Default", // defnName
				new Coords(50, 50), // startPos
				.125, // heading
				// cars
				[
					new TrainCar("h"),
					new TrainCar("r"),
					new TrainCar("f"),
					new TrainCar("l"),
					new TrainCar("f"),
					new TrainCar("x3"),
					new TrainCar("l"),
					new TrainCar("f"),
					new TrainCar("l"),
				]
			).carsAccordion()
		);

		var levelLoopDeLoop = new Level
		(
			"Loop-De-Loop",
			"Default", // levelDefnName
			levelSize, 
			new ShapeCircle(new Coords(205, 205), 10), // goal
			// obstacles
			[
				new Obstacle("Rock", new ShapeCircle(new Coords(120, 80), 10)),
				new Obstacle("Rock", new ShapeCircle(new Coords(220, 150), 30)),
			],
			new Train
			(
				"Default", // defnName
				new Coords(100, 100), // startPos
				.125, // heading
				// cars
				[
					new TrainCar("h"),
					new TrainCar("l"),
					new TrainCar("l"),
					new TrainCar("l"),
					new TrainCar("l"),
					new TrainCar("f"),
					new TrainCar("f"),
					new TrainCar("f"),
				]
			)
		);

		var levelMathIsFun = new Level
		(
			"Math Is Fun",
			"Default", // levelDefnName
			levelSize, 
			new ShapeCircle(new Coords(150, 150), 10), // goal
			// obstacles
			[
			],
			new Train
			(
				"Default", // defnName
				new Coords(150, 150), // pos
				0, // heading
				// cars
				[
					new TrainCar("h"),
					new TrainCar("l"),
					new TrainCar("x2"),
					new TrainCar("x3"),
				]
			).carsCircle()
		);

		var levelPicturesque = new Level
		(
			"Picturesque",
			"Default", // levelDefnName
			levelSize, 
			new ShapeCircle(new Coords(245, 195), 10), // goal
			// obstacles
			[
				new Obstacle("Rock", new ShapeCircle(new Coords(100, 100), 20)),
				new Obstacle("Rock", new ShapeCircle(new Coords(170, 120), 25)),
				new Obstacle("Rock", new ShapeCircle(new Coords(220, 120), 25)),
				new Obstacle("Rock", new ShapeCircle(new Coords(180, 200), 25)),
				new Obstacle("Water", new ShapeCircle(new Coords(50, 250), 100)),
			],
			new Train
			(
				"Default", // defnName
				new Coords(100, 50), // startPos
				0, // heading
				// cars
				[
					new TrainCar("h"),
					new TrainCar("r"),
					new TrainCar("f"),
					new TrainCar("l"),
					new TrainCar("f"),
					new TrainCar("r"),
				]
			)
		);

		var levelReflections = new Level
		(
			"Reflections",
			"Default", // levelDefnName
			levelSize, 
			new ShapeCircle(new Coords(55, 105), 10), // goal
			// obstacles
			[
				new Obstacle("Rock", new ShapeCircle(new Coords(200, 200), 20)),
				new Obstacle("Rock", new ShapeCircle(new Coords(130, 180), 25)),
				new Obstacle("Rock", new ShapeCircle(new Coords(80, 180), 25)),
				new Obstacle("Rock", new ShapeCircle(new Coords(120, 100), 25)),
				new Obstacle("Water", new ShapeCircle(new Coords(250, 50), 100)),
			],
			new Train
			(
				"Default", // defnName
				new Coords(200, 250), // startPos
				.5, // heading
				// cars
				[
					new TrainCar("h"),
					new TrainCar("i"),
					new TrainCar("l"),
					new TrainCar("f"),
					new TrainCar("i"),
					new TrainCar("r"),
					new TrainCar("f"),
					new TrainCar("i"),
					new TrainCar("l"),
				]
			)
		);

		var levelReturnAndChurn = new Level
		(
			"Return and Churn",
			"Default", // levelDefnName
			levelSize, 
			new ShapeCircle(new Coords(180, 150), 10), // goal
			// obstacles
			[
				// none
			],
			new Train
			(
				"Default", // defnName
				new Coords(150, 130), // pos
				0, // heading
				// cars
				[
					new TrainCar("h"),
					new TrainCar("i"),
					new TrainCar("r"),
					new TrainCar("i"),
					new TrainCar("f"),
				]
			)
		);

		var levelTheSageHoldsToStillness = new Level
		(
			"The Sage Holds To Stillness",
			"Default", // levelDefnName
			levelSize, 
			new ShapeCircle(new Coords(150, 150), 10), // goal
			// obstacles
			[
				new Obstacle("Rock", new ShapeCircle(new Coords(100, 100), 25)),
				new Obstacle("Rock", new ShapeCircle(new Coords(150, 90), 25)),
				new Obstacle("Rock", new ShapeCircle(new Coords(200, 100), 25)),
				new Obstacle("Rock", new ShapeCircle(new Coords(210, 150), 25)),
				new Obstacle("Rock", new ShapeCircle(new Coords(200, 200), 25)),
				new Obstacle("Rock", new ShapeCircle(new Coords(150, 210), 25)),
				new Obstacle("Rock", new ShapeCircle(new Coords(100, 200), 25)),
				new Obstacle("Rock", new ShapeCircle(new Coords(90, 150), 25)),
			],
			new Train
			(
				"Default", // defnName
				new Coords(150, 150), // pos
				0, // heading
				// cars
				[
					new TrainCar("h"),
					new TrainCar("x"),
					new TrainCar("f"),
					//new TrainCar("x"),
					//new TrainCar("f"),
				]
			).carsCircle()
		);

		var levelSerpentTime = new Level
		(
			"Serpent Time",
			"Default", // levelDefnName
			levelSize, 
			new ShapeCircle(new Coords(225, 240), 10), // goal
			// obstacles
			[
				new Obstacle("Rock", new ShapeCircle(new Coords(60, 90), 8)),
				new Obstacle("Rock", new ShapeCircle(new Coords(120, 130), 8)),
				new Obstacle("Rock", new ShapeCircle(new Coords(160, 180), 8)),
				new Obstacle("Rock", new ShapeCircle(new Coords(205, 205), 8)),

			],
			new Train
			(
				"Default", // defnName
				new Coords(90, 60), // startPos
				.125, // heading
				// cars
				[
					new TrainCar("h"),
					new TrainCar("r"),
					new TrainCar("l"),
					new TrainCar("l"),
					new TrainCar("r"),
					new TrainCar("r"),
					new TrainCar("l"),
					new TrainCar("l"),
				]
			).carsAccordion()
		);

		var levelSoftlySoftlyCatcheeMonkey = new Level
		(
			"Softly, Softly, Catchee Monkey",
			"Default", // levelDefnName
			levelSize, 
			new ShapeCircle(new Coords(150, 150), 10), // goal
			// obstacles
			[
				new Obstacle("Rock", new ShapeCircle(new Coords(60, 90), 8)),
				new Obstacle("Rock", new ShapeCircle(new Coords(160, 180), 8)),
				new Obstacle("Rock", new ShapeCircle(new Coords(205, 205), 8)),

			],
			new Train
			(
				"Default", // defnName
				new Coords(130, 80), // startPos
				.125, // heading
				// cars
				[
					new TrainCar("h"),
					new TrainCar("s"),
					new TrainCar("r"),
					new TrainCar("s"),
					new TrainCar("f"),
				]
			).carsAccordion()
		);

		var levelStayOnTarget = new Level
		(
			"Stay On Target",
			"Default", // levelDefnName
			levelSize, 
			new ShapeCircle(new Coords(235, 150), 10), // goal
			// obstacles
			[
				new Obstacle("Rock", new ShapeCircle(new Coords(100, 110), 25)),
				new Obstacle("Rock", new ShapeCircle(new Coords(150, 110), 25)),
				new Obstacle("Rock", new ShapeCircle(new Coords(200, 118), 25)),
				new Obstacle("Rock", new ShapeCircle(new Coords(250, 115), 25)),
				new Obstacle("Rock", new ShapeCircle(new Coords(120, 190), 25)),
				new Obstacle("Rock", new ShapeCircle(new Coords(170, 190), 25)),
				new Obstacle("Rock", new ShapeCircle(new Coords(220, 182), 25)),
				new Obstacle("Rock", new ShapeCircle(new Coords(270, 185), 25)),
			],
			new Train
			(
				"Default", // defnName
				new Coords(35, 150), // pos
				0, // heading
				// cars
				[
					new TrainCar("h"),
					new TrainCar("x"),
					new TrainCar("r"),
					new TrainCar("x"),
					new TrainCar("l"),
					new TrainCar("f"),
					new TrainCar("f"),
					new TrainCar("f"),
					new TrainCar("f"),
				]
			).carsCircle()
		);

		var levelTunnelVision = new Level
		(
			"Tunnel Vision",
			"Default", // levelDefnName
			levelSize, 
			new ShapeCircle(new Coords(265, 150), 10), // goal
			// obstacles
			[
				new Obstacle("Rock", new ShapeCircle(new Coords(150, 110), 25)),
				new Obstacle("Rock", new ShapeCircle(new Coords(200, 118), 25)),
				new Obstacle("Rock", new ShapeCircle(new Coords(250, 115), 25)),
				new Obstacle("Rock", new ShapeCircle(new Coords(170, 190), 25)),
				new Obstacle("Rock", new ShapeCircle(new Coords(220, 182), 25)),
				new Obstacle("Rock", new ShapeCircle(new Coords(270, 185), 25)),
			],
			new Train
			(
				"Default", // defnName
				new Coords(35, 150), // pos
				0, // heading
				// cars
				[
					new TrainCar("h"),
					new TrainCar("r"),
					new TrainCar("l"),
					new TrainCar("l"),
					new TrainCar("r"),
					new TrainCar("f"),
					new TrainCar("f"),
				]
			).carsCircle()
		);

		var levelTurnAndBurn = new Level
		(
			"Turn and Burn",
			"Default", // levelDefnName
			levelSize, 
			new ShapeCircle(new Coords(142, 212), 10), // goal
			// obstacles
			[
				// none
			],
			new Train
			(
				"Default", // defnName
				new Coords(110, 130), // pos
				0, // heading
				// cars
				[
					new TrainCar("h"),
					new TrainCar("r"),
					new TrainCar("f"),
				]
			)
		);

		var levelVeryRepetitious = new Level
		(
			"Very Repetitious",
			"Default", // levelDefnName
			levelSize, 
			new ShapeCircle(new Coords(12, 12), 10), // goal
			// obstacles
			[
				new Obstacle("Rock", new ShapeCircle(new Coords(180, 145), 5)),	
				new Obstacle("Rock", new ShapeCircle(new Coords(150, 65), 10)),
				new Obstacle("Rock", new ShapeCircle(new Coords(120, 65), 15)),
				new Obstacle("Rock", new ShapeCircle(new Coords(240, 205), 5)),	
				new Obstacle("Rock", new ShapeCircle(new Coords(260, 130), 5)),	
				new Obstacle("Rock", new ShapeCircle(new Coords(260, 90), 15)),	
				new Obstacle("Rock", new ShapeCircle(new Coords(80, 200), 25)),	

			],
			new Train
			(
				"Default", // defnName
				new Coords(260, 260), // startPos
				0.625, // heading
				// cars
				[
					new TrainCar("h"),
					new TrainCar("f"),
					new TrainCar("x2"),
					new TrainCar("f"),
					new TrainCar("x3"),
					new TrainCar("f"),
					new TrainCar("f"),
				]
			).carsAccordion()
		);

		var levelYouWannaGoToMonaco = new Level
		(
			"You Wanna Go to Monaco?",
			"Default", // levelDefnName
			levelSize, 
			new ShapeCircle(new Coords(280, 30), 10), // goal
			// obstacles
			[
				new Obstacle("Water", new ShapeCircle(new Coords(0, 0), 220)),
				new Obstacle("Rock", new ShapeCircle(new Coords(150, 235), 5)),
				new Obstacle("Rock", new ShapeCircle(new Coords(180, 235), 5)),
				new Obstacle("Rock", new ShapeCircle(new Coords(220, 205), 5)),	
				new Obstacle("Rock", new ShapeCircle(new Coords(250, 205), 5)),	
				new Obstacle("Rock", new ShapeCircle(new Coords(260, 130), 5)),	
				new Obstacle("Rock", new ShapeCircle(new Coords(260, 90), 5)),	
			],
			new Train
			(
				"Default", // defnName
				new Coords(150, 250), // startPos
				0, // heading
				// cars
				[
					new TrainCar("h"),
					new TrainCar("t"),
					new TrainCar("f"),
					new TrainCar("t"),
					new TrainCar("l"),
					new TrainCar("t"),
					new TrainCar("f"),
					new TrainCar("t"),
					new TrainCar("r"),
					new TrainCar("t"),
					new TrainCar("f"),
					new TrainCar("l"),
					new TrainCar("t"),
					new TrainCar("f"),
					new TrainCar("s"),
					new TrainCar("f"),

				]
			).carsAccordion()
		);

		world.levels =
		[
			levelJustGo,
			levelTurnAndBurn,
			levelPicturesque,
			levelTunnelVision,
			levelSerpentTime,
			levelTheSageHoldsToStillness,
			levelStayOnTarget,
			levelReturnAndChurn,
			levelLoopDeLoop,
			levelReflections,
			levelVeryRepetitious,
			levelMathIsFun,
			levelLeGrandTour,
			levelIWannaGoFast,
			levelSoftlySoftlyCatcheeMonkey,
			levelYouWannaGoToMonaco,
		];

		return world;
	}
}
