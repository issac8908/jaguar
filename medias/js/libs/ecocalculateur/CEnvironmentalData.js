//	CEnvironmentalData
//	CEnvironmentalData encapsule les données environnementales d'une relation

function CEnvironmentalData()
{
}

/**********************************************************CHAMPS**************************************************************/
CEnvironmentalData.prototype.roadGlobalTotalNRJ = 0;
CEnvironmentalData.prototype.roadGlobalTotalCO2 = 0;
CEnvironmentalData.prototype.navilandGlobalTotalNRJ = 0;
CEnvironmentalData.prototype.navilandGlobalTotalCO2 = 0;
CEnvironmentalData.prototype.navilandGlobalPrePostNRJ = 0;
CEnvironmentalData.prototype.navilandGlobalPrePostCO2 = 0;
CEnvironmentalData.prototype.navilandGlobalMainNRJ = 0;
CEnvironmentalData.prototype.navilandGlobalMainCO2 = 0;

CEnvironmentalData.prototype.roadKPIUTITotalNRJ = 0;
CEnvironmentalData.prototype.roadKPIUTITotalCO2 = 0;
CEnvironmentalData.prototype.navilandKPIUTITotalNRJ = 0;
CEnvironmentalData.prototype.navilandKPIUTITotalCO2 = 0;
CEnvironmentalData.prototype.navilandKPIUTIPrePostNRJ = 0;
CEnvironmentalData.prototype.navilandKPIUTIPrePostCO2 = 0;
CEnvironmentalData.prototype.navilandKPIUTIMainNRJ = 0;
CEnvironmentalData.prototype.navilandKPIUTIMainCO2 = 0;
CEnvironmentalData.prototype.gapNRJ = 0;
CEnvironmentalData.prototype.gapCO2 = 0;

/*********************************************************METHODES*************************************************************/
CEnvironmentalData.prototype.setRoadGlobalData = function(nrj, co2)
{
	this.roadGlobalTotalNRJ = nrj;
	this.roadGlobalTotalCO2 = co2;
};

CEnvironmentalData.prototype.setNavilandGlobalData = function(nrj, co2, nrjPrePost, co2PrePost, nrjMain, co2Main)
{
	this.navilandGlobalTotalNRJ = nrj;
	this.navilandGlobalTotalCO2 = co2;
	this.navilandGlobalPrePostNRJ = nrjPrePost;
	this.navilandGlobalPrePostCO2 = co2PrePost;
	this.navilandGlobalMainNRJ = nrjMain;
	this.navilandGlobalMainCO2 = co2Main;
};

CEnvironmentalData.prototype.setRoadKPIUTIData = function(nrj, co2)
{
	this.roadKPIUTITotalNRJ = nrj;
	this.roadKPIUTITotalCO2 = co2;
};

CEnvironmentalData.prototype.setNavilandKPIUTIData = function(nrj, co2, nrjPrePost, co2PrePost, nrjMain, co2Main)
{
	this.navilandKPIUTITotalNRJ = nrj;
	this.navilandKPIUTITotalCO2 = co2;
	this.navilandKPIUTIPrePostNRJ = nrjPrePost;
	this.navilandKPIUTIPrePostCO2 = co2PrePost;
	this.navilandKPIUTIMainNRJ = nrjMain;
	this.navilandKPIUTIMainCO2 = co2Main;
};

CEnvironmentalData.prototype.setGapData = function(nrj, co2)
{
	this.gapNRJ = nrj;
	this.gapCO2 = co2;
};

CEnvironmentalData.prototype.getXMLExportData = function()
{
	var xml = '';
	
	xml += '<EnvironmentalInformation>';
		xml += '<Energy road="'+this.roadGlobalTotalNRJ+'" naviland_rail="'+this.navilandGlobalMainNRJ+'" naviland_road="'+this.navilandGlobalPrePostNRJ+'"/>';
		xml += '<EnergyKPI road="'+this.roadKPIUTITotalNRJ+'" naviland_rail="'+this.navilandKPIUTIMainNRJ+'" naviland_road="'+this.navilandKPIUTIPrePostNRJ+'"/>';
		xml += '<CO2 road="'+this.roadGlobalTotalCO2+'" naviland_rail="'+this.navilandGlobalMainCO2+'" naviland_road="'+this.navilandGlobalPrePostCO2+'"/>';
		xml += '<CO2KPI road="'+this.roadKPIUTITotalCO2+'" naviland_rail="'+this.navilandKPIUTIMainCO2+'" naviland_road="'+this.navilandKPIUTIPrePostCO2+'"/>';
	xml += '</EnvironmentalInformation>';
	
	return xml;
};