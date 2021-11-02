
class Globals
{
	static Instance = new Globals();

	// methods

	initialize(timerTicksPerSecond, display, world)
	{
		this.display = display;
		this.world = world;

		this.display.initialize();
		this.world.initialize();

		var millisecondsPerTimerTick =
			1000 / timerTicksPerSecond;
		this.timer = setInterval
		(
			this.handleEventTimerTick.bind(this),
			millisecondsPerTimerTick
		);

		this.inputHelper = new InputHelper();
		this.inputHelper.initialize();
	}

	// events

	handleEventTimerTick()
	{
		this.world.updateForTimerTick();
		this.inputHelper.updateForTimerTick();
	}
}
