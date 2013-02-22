function HERITE(enfant, Cparent)
{
	enfant.parent = new Cparent();
	if (typeof(enfant.parent.initialisation) != 'undefined')
	{
		enfant.parent.initialisation.call(enfant.parent);
	}
	for (var element in enfant.parent)
	{
		if (typeof(enfant[element]) == 'undefined')
		{
			enfant[element] = enfant.parent[element];
		}
	}
}