
class Collision
{
	constructor(pos)
	{
		this.pos = pos;
	}

	// static methods

	static ofCircles(circle0, circle1)
	{
		var collisionFound = null;

		var displacement = new Coords().overwriteWith
		(
			circle1.center
		).subtract
		(
			circle0.center
		);

		var distanceBetweenCenters = displacement.magnitude();

		var sumOfRadii = circle0.radius + circle1.radius;

		if (distanceBetweenCenters < sumOfRadii)
		{
			collisionFound = new Collision
			(
				circle0.center.clone().add
				(
					displacement.multiplyScalar
					(
						circle0.radius / sumOfRadii
					)
				)
			);
		}

		return collisionFound
	}

	static ofTrainAndObstacle(train, obstacle)
	{
		var collisionFound = null;

		var cars = train.cars;

		for (var i = 0; i < cars.length; i++)
		{
			var car = cars[i];

			collisionFound = Collision.ofTrainCarAndObstacle
			(
				train, car, obstacle
			);

			if (collisionFound != null)
			{
				break;
			}
		}

		return collisionFound;
	}

	static ofTrainAndObstacles(train, obstacles)
	{
		var collisionFound = null;

		for (var i = 0; i < obstacles.length; i++)
		{
			var obstacle = obstacles[i];

			collisionFound = Collision.ofTrainAndObstacle
			(
				train, obstacle
			);

			if (collisionFound != null)
			{
				break;
			}
		}

		return collisionFound;
	}

	static ofTrainCarAndObstacle(train, car, obstacle)
	{
		var carCollider = car.collider();
		var obstacleCollider = obstacle.collider();

		var collisionFound;

		if (obstacleCollider.constructor.name == "ShapeCircle")
		{
			collisionFound = Collision.ofCircles
			(
				carCollider,
				obstacleCollider
			);
		}
		else
		{
			collisionFound = null; // todo
		}

		return collisionFound;
	}

	// instance methods

	// drawable

	drawToDisplay(display, level)
	{
		display.drawCircle(this.pos, 10, "Red", "White");
	}
}
