//	CCountry
//	CCountry classe représentant un pays

function CCountry(id, label)
{
	this.id = id;
	this.label = label;
}

/**********************************************************CHAMPS**************************************************************/
CCountry.prototype.id = 0;
CCountry.prototype.label = 0;

/*********************************************************METHODES*************************************************************/
CCountry.prototype.getId = function()
{
	return this.id;
};

CCountry.prototype.getLabel = function()
{
	return this.label;
};