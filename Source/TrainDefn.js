
class TrainDefn
{
	constructor(name, carRadius, timerTicksActivePerCar, speed, turnSpeed)
	{
		this.name = name;
		this.carRadius = carRadius;
		this.timerTicksActivePerCar = timerTicksActivePerCar;
		this.speed = speed;
		this.turnSpeed = turnSpeed;

		this.carDiameter = this.carRadius * 2;
	}
}
