
class URLHelper
{
	static queryStringVariableGet(variableNameToGet)
	{
		var returnValue = null;

		var queryString = window.location.search.substring(1);
		var variablesAsStrings = queryString.split("&");
		for (var i = 0; i < variablesAsStrings.length; i++) 
		{
			var variableAsString = variablesAsStrings[i];
			var variableNameAndValue = variableAsString.split("=");
			var variableName = variableNameAndValue[0];
			if (variableName == variableNameToGet)
			{
				returnValue = variableNameAndValue[1];
				break;
			}
			}

			return returnValue;
	}
}
