//	CGlobalReporting
//	CGlobalReporting gère l'onglet de reporting global

function CGlobalReporting()
{
	this.selectedScope = CCtrlEcoCalculateur.SCOPE_NRJ;
}

/**********************************************************CHAMPS**************************************************************/
CGlobalReporting.prototype.environmentalData = null;
CGlobalReporting.prototype.relations = null;
CGlobalReporting.prototype.nbRelations = 0;
CGlobalReporting.prototype.graphGlobal = null;
CGlobalReporting.prototype.graphKPI = null;
CGlobalReporting.prototype.graphGlobalData = null;
CGlobalReporting.prototype.graphKPIData = null;
CGlobalReporting.prototype.selectedScope = null;

/*********************************************************METHODES*************************************************************/
//	Méthode appelée lors du chargement de l'onglet pour mettre à jour les IHM
CGlobalReporting.prototype.updateIHM = function()
{
	this.updateReportingData();
	
	if (this.isCalculated)
	{
		document.getElementById('ecocalculateur_global_result_text').style.visibility = 'visible';
		document.getElementById('ecocalculateur_global_charts_container').style.visibility = 'visible';
		document.getElementById('ecocalculateur_global_right_container').style.visibility = 'visible';
		document.getElementById('ecocalculateur_global_relation_abstract_container').style.visibility = 'visible';
		
		//	MAJ global chart
		this.graphGlobal = new Highcharts.Chart({
			chart: {
				renderTo: 'ecocalculateur_global_chart_global_container',
				type: 'column',
				spacingLeft: 0,
				spacingRight: 0
			},
			title: {
				text: null
			},
			legend: {
				enabled:false
			},
			credits: {
				enabled:false
			},
			plotOptions: {
				column: {
					stacking: 'normal',
					dataLabels: {
						enabled: false
					}
				},
				series: {
					pointPadding: 0,
					groupPadding:0
				}
			},
			yAxis: {
				min: 0,
				title: {
					text: null
				},
				labels:{
				},
				gridLineWidth: 0,
				stackLabels: {
					enabled: true,
					style: {
						fontWeight: 'bold',
						'font-size': '22px',
						'line-height': '22px'
					},
					y: 1,
					formatter: function() {
						if (this.stack == 'road')
							return '<span style="color:#878687">'+this.total+'</span>';
						return '<span style="color:#A4DE5F">'+this.total+'</span>';
					}
				}
			},
			xAxis: {
				lineWidth: 0,
				minorGridLineWidth: 0,
				lineColor: 'transparent',
				labels: {
					enabled: false
				},
				minorTickLength: 0,
				tickLength: 0
			},
			series: this.graphGlobalData,
			tooltip: {
				backgroundColor:"rgba(255, 255, 255, 0.7)",
				formatter: function() {
					var retour = '';
					
					retour += '<span style="color:'+this.series.color+';font-weight:bold;">';
					switch (this.series.name)
					{
						case 'road':
							retour += document.getElementById('ecocalculateur_text_chart_road_popup_title').value;
							break;
						case 'naviland_main':
							retour += document.getElementById('ecocalculateur_text_chart_naviland_main_popup_title').value;
							break;
						case 'naviland_prepost':
							retour += document.getElementById('ecocalculateur_text_chart_naviland_prepost_popup_title').value;
							break;
					}
					retour += '</span><br/>';
					
					retour += this.y + ' ';
					
					switch (CCtrlEcoCalculateur.getInstance().getGlobalReporting().getSelectedScope())
					{
						case CCtrlEcoCalculateur.SCOPE_NRJ:
							retour += 'GJ';
							break;
						case CCtrlEcoCalculateur.SCOPE_CO2:
							retour += 't CO<span style="font-size:0.7em;">2</span>';
							break;
					}
					
					return retour;
				}
			}
		});
		
		//	MAJ graphe KPI
		this.graphKPI = new Highcharts.Chart({
			chart: {
				renderTo: 'ecocalculateur_global_chart_kpi_container',
				type: 'column',
				spacingLeft: 0,
				spacingRight: 0
			},
			title: {
				text: null
			},
			legend: {
				enabled:false
			},
			credits: {
				enabled:false
			},
			plotOptions: {
				column: {
					stacking: 'normal',
					dataLabels: {
						enabled: false
					}
				},
				series: {
					pointPadding: 0,
					groupPadding:0
				}
			},
			yAxis: {
				min: 0,
				title: {
					text: null
				},
				labels:{
				},
				gridLineWidth: 0,
				stackLabels: {
					enabled: true,
					style: {
						fontWeight: 'bold',
						'font-size': '22px',
						'line-height': '22px'
					},
					y: 1,
					formatter: function() {
						if (this.stack == 'road')
							return '<span style="color:#878687">'+this.total+'</span>';
						return '<span style="color:#A4DE5F">'+this.total+'</span>';
					}
				}
			},
			xAxis: {
				lineWidth: 0,
				minorGridLineWidth: 0,
				lineColor: 'transparent',
				labels: {
					enabled: false
				},
				minorTickLength: 0,
				tickLength: 0
			},
			series: this.graphKPIData,
			tooltip: {
				backgroundColor:"rgba(255, 255, 255, 0.7)",
				formatter: function() {
					var retour = '';
					
					retour += '<span style="color:'+this.series.color+';font-weight:bold;">';
					switch (this.series.name)
					{
						case 'road':
							retour += document.getElementById('ecocalculateur_text_chart_road_popup_title').value;
							break;
						case 'naviland_main':
							retour += document.getElementById('ecocalculateur_text_chart_naviland_main_popup_title').value;
							break;
						case 'naviland_prepost':
							retour += document.getElementById('ecocalculateur_text_chart_naviland_prepost_popup_title').value;
							break;
					}
					retour += '</span><br/>';
					
					retour += this.y + ' ';
					
					switch (CCtrlEcoCalculateur.getInstance().getGlobalReporting().getSelectedScope())
					{
						case CCtrlEcoCalculateur.SCOPE_NRJ:
							retour += 'GJ';
							break;
						case CCtrlEcoCalculateur.SCOPE_CO2:
							retour += 't CO<span style="font-size:0.7em;">2</span>';
							break;
					}
					
					return retour;
				}
			}
		});
		
		//	MAJ gain
		var gainContainer = document.getElementById('ecocalculateur_global_result_text_gap_container');
		while(gainContainer.firstChild)
		{	
			gainContainer.removeChild(gainContainer.firstChild);
		}
		var gain = '';
		switch (this.selectedScope)
		{
			case CCtrlEcoCalculateur.SCOPE_NRJ:
				gain = this.environmentalData.gapNRJ.toString();
				break;
			case CCtrlEcoCalculateur.SCOPE_CO2:
				gain = this.environmentalData.gapCO2.toString();
				break;
		}
		var gainLength = gain.length;
		for (var i = 0 ; i < gainLength ; i++)
		{
			var div = document.createElement('DIV');
			div.className = 'ecocalculateur_relation_result_text_value_container';
			div.appendChild(document.createTextNode(gain.charAt(i)));
			gainContainer.appendChild(div);
		}
		
		//	MAJ units
		var chartKPIUnitContainer = document.getElementById('ecocalculateur_global_chart_kpi_unit');
		while (chartKPIUnitContainer.firstChild)
			chartKPIUnitContainer.removeChild(chartKPIUnitContainer.firstChild);
		switch (this.selectedScope)
		{
			case CCtrlEcoCalculateur.SCOPE_NRJ:
				chartKPIUnitContainer.appendChild(document.createTextNode('GJ'));
				break;
			case CCtrlEcoCalculateur.SCOPE_CO2:
				chartKPIUnitContainer.appendChild(document.createTextNode('t CO'));
				var co2Unit2Indice = document.createElement('SPAN');
				co2Unit2Indice.style.fontSize = '0.7em';
				co2Unit2Indice.appendChild(document.createTextNode('2'));
				chartKPIUnitContainer.appendChild(co2Unit2Indice);
				break;
		}
		
		var chartGlobalUnitContainer = document.getElementById('ecocalculateur_global_chart_global_unit');
		while (chartGlobalUnitContainer.firstChild)
			chartGlobalUnitContainer.removeChild(chartGlobalUnitContainer.firstChild);
		switch (this.selectedScope)
		{
			case CCtrlEcoCalculateur.SCOPE_NRJ:
				chartGlobalUnitContainer.appendChild(document.createTextNode('GJ'));
				break;
			case CCtrlEcoCalculateur.SCOPE_CO2:
				chartGlobalUnitContainer.appendChild(document.createTextNode('t CO'));
				var co2Unit2Indice = document.createElement('SPAN');
				co2Unit2Indice.style.fontSize = '0.7em';
				co2Unit2Indice.appendChild(document.createTextNode('2'));
				chartGlobalUnitContainer.appendChild(co2Unit2Indice);
				break;
		}
		
		var resultTextUnitContainer = document.getElementById('ecocalculateur_global_result_text_unit');
		while (resultTextUnitContainer.firstChild)
			resultTextUnitContainer.removeChild(resultTextUnitContainer.firstChild);
		switch (this.selectedScope)
		{
			case CCtrlEcoCalculateur.SCOPE_NRJ:
				resultTextUnitContainer.appendChild(document.createTextNode('GJ'));
				break;
			case CCtrlEcoCalculateur.SCOPE_CO2:
				resultTextUnitContainer.appendChild(document.createTextNode('t CO'));
				var co2Unit2Indice = document.createElement('SPAN');
				co2Unit2Indice.style.fontSize = '0.7em';
				co2Unit2Indice.appendChild(document.createTextNode('2'));
				resultTextUnitContainer.appendChild(co2Unit2Indice);
				break;
		}
		
		//	MAJ abstracts
		var relationAbstractContainer = document.getElementById('ecocalculateur_global_relation_abstract_container');
		while (relationAbstractContainer.firstChild)
			relationAbstractContainer.removeChild(relationAbstractContainer.firstChild);
		
		for (var i = 0 ; i < this.nbRelations ; i++)
		{
			var originStationText = '';
			var destinationStationText = '';
			
			for (var j = 0 ; j < this.relations[i].originStations.length ; j++)
				if (this.relations[i].originStations[j].getId() == this.relations[i].idSelectedOriginPlateforme)
					originStationText = this.relations[i].originStations[j].getLabel();
			for (var j = 0 ; j < this.relations[i].destinationStations.length ; j++)
				if (this.relations[i].destinationStations[j].getId() == this.relations[i].idSelectedDestinationPlateforme)
					destinationStationText = this.relations[i].destinationStations[j].getLabel();
				
				
			var trAbstract = document.createElement('TR');
			var tableAbstract = document.createElement('TABLE');
			var tbodyAbstract = document.createElement('TBODY');
			tableAbstract.appendChild(tbodyAbstract);
			tbodyAbstract.appendChild(trAbstract);
			
			if (this.relations[i].selectedOriginZip != '')
			{
				var tdOriginZip = document.createElement('TD');
				tdOriginZip.appendChild(document.createTextNode(this.relations[i].selectedOriginZip));
				trAbstract.appendChild(tdOriginZip);
				var tdOriginZipImage = document.createElement('TD');
				var imgOriginZipImage = document.createElement('IMG');
				imgOriginZipImage.src = baseUrl+'/medias/images/ecocalculateur/ecocalculateur_abstract_truck.png';
				tdOriginZipImage.appendChild(imgOriginZipImage);
				trAbstract.appendChild(tdOriginZipImage);
			}
			var tdOriginPlateforme = document.createElement('TD');
			tdOriginPlateforme.appendChild(document.createTextNode(originStationText));
			trAbstract.appendChild(tdOriginPlateforme);
			var tdPlateforme = document.createElement('TD');
			var imgPlateforme = document.createElement('IMG');
			imgPlateforme.src = baseUrl+'/medias/images/ecocalculateur/ecocalculateur_abstract_train.png';
			tdPlateforme.appendChild(imgPlateforme);
			trAbstract.appendChild(tdPlateforme);
			var tdDestinationPlateforme = document.createElement('TD');
			tdDestinationPlateforme.appendChild(document.createTextNode(destinationStationText));
			trAbstract.appendChild(tdDestinationPlateforme);
			if (this.relations[i].selectedDestinationZip != '')
			{
				var tdDestinationZipImage = document.createElement('TD');
				var imgDestinationZipImage = document.createElement('IMG');
				imgDestinationZipImage.src = baseUrl+'/medias/images/ecocalculateur/ecocalculateur_abstract_truck.png';
				tdDestinationZipImage.appendChild(imgDestinationZipImage);
				trAbstract.appendChild(tdDestinationZipImage);
				var tdDestinationZip = document.createElement('TD');
				tdDestinationZip.appendChild(document.createTextNode(this.relations[i].selectedDestinationZip));
				trAbstract.appendChild(tdDestinationZip);
			}
			relationAbstractContainer.appendChild(tableAbstract);
		}
	}
	else
	{
		if (this.graphKPI != null)
		{
			this.graphKPI.destroy();
			this.graphKPI = null;
		}
		if (this.graphGlobal != null)
		{
			this.graphGlobal.destroy();
			this.graphGlobal = null;
		}
		
		document.getElementById('ecocalculateur_global_result_text').style.visibility = 'hidden';
		document.getElementById('ecocalculateur_global_charts_container').style.visibility = 'hidden';
		document.getElementById('ecocalculateur_global_right_container').style.visibility = 'hidden';
		document.getElementById('ecocalculateur_global_relation_abstract_container').style.visibility = 'hidden';
	}
};

//	Méthode appelée lors du changement d'onglet afin
CGlobalReporting.prototype.destroy = function()
{
	if (this.graphKPI != null)
	{
		this.graphKPI.destroy();
		this.graphKPI = null;
	}
	if (this.graphGlobal != null)
	{
		this.graphGlobal.destroy();
		this.graphGlobal = null;
	}
};

//	Méthode récupérant les informations environnementales des différentes relations
CGlobalReporting.prototype.updateReportingData = function()
{
	this.environmentalData = new CEnvironmentalData();
	this.nbRelations = 0;
	this.relations = new Array();
	
	var relations = CCtrlEcoCalculateur.getInstance().getRelations();
	var nbRelations = relations.length;
	
	for (var i = 0 ; i < nbRelations ; i++)
	{
		if (relations[i].isCalculated)
		{
			this.relations.push(relations[i]);
			this.environmentalData.roadGlobalTotalNRJ += relations[i].environmentalData.roadGlobalTotalNRJ;
			this.environmentalData.roadGlobalTotalCO2 += relations[i].environmentalData.roadGlobalTotalCO2;
			this.environmentalData.navilandGlobalTotalNRJ += relations[i].environmentalData.navilandGlobalTotalNRJ;
			this.environmentalData.navilandGlobalTotalCO2 += relations[i].environmentalData.navilandGlobalTotalCO2;
			this.environmentalData.navilandGlobalPrePostNRJ += relations[i].environmentalData.navilandGlobalPrePostNRJ;
			this.environmentalData.navilandGlobalPrePostCO2 += relations[i].environmentalData.navilandGlobalPrePostCO2;
			this.environmentalData.navilandGlobalMainNRJ += relations[i].environmentalData.navilandGlobalMainNRJ;
			this.environmentalData.navilandGlobalMainCO2 += relations[i].environmentalData.navilandGlobalMainCO2;

			this.environmentalData.roadKPIUTITotalNRJ += relations[i].environmentalData.roadKPIUTITotalNRJ;
			this.environmentalData.roadKPIUTITotalCO2 += relations[i].environmentalData.roadKPIUTITotalCO2;
			this.environmentalData.navilandKPIUTITotalNRJ += relations[i].environmentalData.navilandKPIUTITotalNRJ;
			this.environmentalData.navilandKPIUTITotalCO2 += relations[i].environmentalData.navilandKPIUTITotalCO2;
			this.environmentalData.navilandKPIUTIPrePostNRJ += relations[i].environmentalData.navilandKPIUTIPrePostNRJ;
			this.environmentalData.navilandKPIUTIPrePostCO2 += relations[i].environmentalData.navilandKPIUTIPrePostCO2;
			this.environmentalData.navilandKPIUTIMainNRJ += relations[i].environmentalData.navilandKPIUTIMainNRJ;
			this.environmentalData.navilandKPIUTIMainCO2 += relations[i].environmentalData.navilandKPIUTIMainCO2;
			this.environmentalData.gapNRJ += relations[i].environmentalData.gapNRJ;
			this.environmentalData.gapCO2 += relations[i].environmentalData.gapCO2;
			
			this.nbRelations++;
		}
	}
	
	if (this.nbRelations > 0)
	{
		this.isCalculated = true;
		this.environmentalData.roadKPIUTITotalNRJ /= this.nbRelations;
		this.environmentalData.roadKPIUTITotalCO2 /= this.nbRelations;
		this.environmentalData.navilandKPIUTITotalNRJ /= this.nbRelations;
		this.environmentalData.navilandKPIUTITotalCO2 /= this.nbRelations;
		this.environmentalData.navilandKPIUTIPrePostNRJ /= this.nbRelations;
		this.environmentalData.navilandKPIUTIPrePostCO2 /= this.nbRelations;
		this.environmentalData.navilandKPIUTIMainNRJ /= this.nbRelations;
		this.environmentalData.navilandKPIUTIMainCO2 /= this.nbRelations;
		
		this.environmentalData.roadKPIUTITotalNRJ = Math.round(this.environmentalData.roadKPIUTITotalNRJ*10)/10;
		this.environmentalData.roadKPIUTITotalCO2 = Math.round(this.environmentalData.roadKPIUTITotalCO2*100)/100;
		this.environmentalData.navilandKPIUTITotalNRJ = Math.round(this.environmentalData.navilandKPIUTITotalNRJ*10)/10;
		this.environmentalData.navilandKPIUTITotalCO2 = Math.round(this.environmentalData.navilandKPIUTITotalCO2*100)/100;
		this.environmentalData.navilandKPIUTIPrePostNRJ = Math.round(this.environmentalData.navilandKPIUTIPrePostNRJ*10)/10;
		this.environmentalData.navilandKPIUTIPrePostCO2 = Math.round(this.environmentalData.navilandKPIUTIPrePostCO2*100)/100;
		this.environmentalData.navilandKPIUTIMainNRJ = Math.round(this.environmentalData.navilandKPIUTIMainNRJ*10)/10;
		this.environmentalData.navilandKPIUTIMainCO2 = Math.round(this.environmentalData.navilandKPIUTIMainCO2*100)/100;
	}
	else
	{
		this.isCalculated = false;
	}
	
	if (this.isCalculated)
	{
		var roadGlobalData = 0;
		var navilandGlobalTrainData = 0;
		var navilandGlobalRoadData = 0;
		
		var roadKPIData = 0;
		var navilandKPITrainData = 0;
		var navilandKPIRoadData = 0;
		
		switch (this.selectedScope)
		{
			case CCtrlEcoCalculateur.SCOPE_CO2:
				roadGlobalData = this.environmentalData.roadGlobalTotalCO2;
				navilandGlobalTrainData = this.environmentalData.navilandGlobalMainCO2;
				navilandGlobalRoadData = this.environmentalData.navilandGlobalPrePostCO2;
				
				roadKPIData = this.environmentalData.roadKPIUTITotalCO2;
				navilandKPITrainData = this.environmentalData.navilandKPIUTIMainCO2;
				navilandKPIRoadData = this.environmentalData.navilandKPIUTIPrePostCO2;
				break;
			case CCtrlEcoCalculateur.SCOPE_NRJ:
				roadGlobalData = this.environmentalData.roadGlobalTotalNRJ;
				navilandGlobalTrainData = this.environmentalData.navilandGlobalMainNRJ;
				navilandGlobalRoadData = this.environmentalData.navilandGlobalPrePostNRJ;
				
				roadKPIData = this.environmentalData.roadKPIUTITotalNRJ;
				navilandKPITrainData = this.environmentalData.navilandKPIUTIMainNRJ;
				navilandKPIRoadData = this.environmentalData.navilandKPIUTIPrePostNRJ;
				break;
		}
		
		this.graphGlobalData = new Array();
		this.graphGlobalData.push({
			data: [roadGlobalData],
			name: 'road',
			stack: 'road',
			color: '#6E6D6E',
			borderWidth: 0,
			shadow: false
		});
		this.graphGlobalData.push({
			data: [navilandGlobalTrainData],
			name: 'naviland_main',
			stack: 'naviland',
			color: '#8BC546',
			borderWidth: 0,
			shadow: false
		});
		this.graphGlobalData.push({
			data: [navilandGlobalRoadData],
			name: 'naviland_prepost',
			stack: 'naviland',
			color: '#922D92',
			borderWidth: 0,
			shadow: false
		});
		
		this.graphKPIData = new Array();
		this.graphKPIData.push({
			data: [roadKPIData],
			name: 'road',
			stack: 'road',
			color: '#6E6D6E',
			borderWidth: 0,
			shadow: false
		});
		this.graphKPIData.push({
			data: [navilandKPITrainData],
			name: 'naviland_main',
			stack: 'naviland',
			color: '#8BC546',
			borderWidth: 0,
			shadow: false
		});
		this.graphKPIData.push({
			data: [navilandKPIRoadData],
			name: 'naviland_prepost',
			stack: 'naviland',
			color: '#922D92',
			borderWidth: 0,
			shadow: false
		});
	}
};

//	Méthode retournant l'indicateur selectionné
CGlobalReporting.prototype.getSelectedScope = function()
{
	return this.selectedScope;
};

//	Méthode appelée lors du click sur l'indicateur NRJ
CGlobalReporting.prototype.onScopeNRJClick = function()
{
	if (this.selectedScope != CCtrlEcoCalculateur.SCOPE_NRJ)
	{
		this.selectedScope = CCtrlEcoCalculateur.SCOPE_NRJ;
		document.getElementById('ecocalculateur_global_indicateur_energie').className = 'selected';
		document.getElementById('ecocalculateur_global_indicateur_co2').className = 'unselected';
		this.updateIHM();
	}
};

//	Méthode appelée lors du click sur l'indicateur CO2
CGlobalReporting.prototype.onScopeCO2Click = function()
{
	if (this.selectedScope != CCtrlEcoCalculateur.SCOPE_CO2)
	{
		this.selectedScope = CCtrlEcoCalculateur.SCOPE_CO2;
		document.getElementById('ecocalculateur_global_indicateur_energie').className = 'unselected';
		document.getElementById('ecocalculateur_global_indicateur_co2').className = 'selected';
		this.updateIHM();
	}
};