class ArrayHelper
{
	static cloneArray(arrayToClone)
	{
		var arrayCloned = [];

		for (var i = 0; i < arrayToClone.length; i++)
		{
			var elementToClone = arrayToClone[i];
			var elementCloned = elementToClone.clone();
			arrayCloned.push(elementCloned);
		}

		return arrayCloned;
	}

	static insertElementIntoArrayAtIndex
	(
		elementToInsert, arrayToInsertInto, indexToInsertAt
	)
	{
		arrayToInsertInto.splice
		(
			indexToInsertAt, 0, elementToInsert
		);

		return arrayToInsertInto;
	}

	static removeElementFromArray
	(
		elementToRemove, arrayToRemoveFrom
	)
	{
		var indexOfElementToRemove =
			arrayToRemoveFrom.indexOf(elementToRemove);

		arrayToRemoveFrom.splice(indexOfElementToRemove, 1);

		return arrayToRemoveFrom;
	}
}
