//	CStation
//	CStation classe représentant une gare

function CStation(id, label)
{
	this.id = id;
	this.label = label;
	this.isDefault = false;
}

/**********************************************************CHAMPS**************************************************************/
CStation.prototype.id = 0;
CStation.prototype.label = 0;
CStation.prototype.isDefault = false;

/*********************************************************METHODES*************************************************************/
CStation.prototype.getId = function()
{
	return this.id;
};

CStation.prototype.getLabel = function()
{
	return this.label;
};

CStation.prototype.setIsDefault = function(value)
{
	this.isDefault = value;
};

CStation.prototype.getIsDefault = function()
{
	return this.isDefault
};