
class World
{
	constructor
	(
		trainDefns,
		trainCarDefns,
		obstacleDefns,
		levelDefns,
		levels,
		levelIndexInitial
	)
	{
		this.trainDefns = trainDefns;
		this.trainCarDefns = trainCarDefns;
		this.obstacleDefns = obstacleDefns;
		this.levelDefns = levelDefns;
		this.levels = levels;

		this.trainDefnsByName =
			new Map(trainDefns.map(x => [x.name, x]));
		this.trainCarDefnsByCode =
			new Map(trainCarDefns.map(x => [x.code, x]));
		this.obstacleDefnsByName =
			new Map(obstacleDefns.map(x => [x.name, x]));
		this.levelDefnsByName =
			new Map(levelDefns.map(x => [x.name, x]));

		this.levelIndexCurrent = levelIndexInitial - 1;
	}

	initialize()
	{
		this.levelAdvance();
	}

	levelAdvance()
	{
		if (this.levelIndexCurrent == null)
		{
			this.levelIndexCurrent = 0;
		}
		else
		{
			this.levelIndexCurrent++;
			if (this.levelIndexCurrent >= this.levels.length)
			{
				this.levelIndexCurrent = 0;
			}
		}

		this.levelCurrent =
			this.levels[this.levelIndexCurrent].clone();
		this.levelCurrent.initialize();
	}

	levelDefnByName(name)
	{
		return this.levelDefnsByName.get(name);
	}

	obstacleDefnByName(name)
	{
		return this.obstacleDefnsByName.get(name);
	}

	trainCarDefnByCode(code)
	{
		return this.trainCarDefnsByCode.get(code);
	}

	trainDefnByName(name)
	{
		return this.trainDefnsByName.get(name);
	}

	updateForTimerTick()
	{
		this.levelCurrent.updateForTimerTick();
	}
}
