
class Status
{
	constructor(name)
	{
		this.name = name;
	}

	static Instances()
	{
		if (Status._instances == null)
		{
			Status._instances = new Status_Instances();
		}
		return Status._instances;
	}
}

class Status_Instances
{
	constructor()
	{
		this.Failed = new Status("Failed");
		this.Running = new Status("Running");
		this.Successful = new Status("Successful");
	}
}
