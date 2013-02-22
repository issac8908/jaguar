//	CRelation
//	CRelation gérant une relation de l'EcoCalculateur

function CRelation()
{
	this.selectedScope = CCtrlEcoCalculateur.SCOPE_NRJ;
}

/**********************************************************CHAMPS**************************************************************/
CRelation.prototype.id = 0;
CRelation.prototype.preCarriageCountries = null;
CRelation.prototype.postCarriageCountries = null;
CRelation.prototype.originStations = null;
CRelation.prototype.destinationStations = null;
CRelation.prototype.idSelectedOriginCountry = 0;
CRelation.prototype.labelSelectedOriginCountry = '';
CRelation.prototype.idSelectedDestinationCountry = 0;
CRelation.prototype.labelSelectedDestinationCountry = '';
CRelation.prototype.selectedOriginZip = '';
CRelation.prototype.selectedDestinationZip = '';
CRelation.prototype.idSelectedOriginPlateforme = 0;
CRelation.prototype.idSelectedDestinationPlateforme = 0;
CRelation.prototype.labelSelectedOriginPlateforme = '';
CRelation.prototype.labelSelectedDestinationPlateforme = '';
CRelation.prototype.nb20p = 0;
CRelation.prototype.nb30p = 0;
CRelation.prototype.nb40p = 0;
CRelation.prototype.isEmptyTrip = false;
CRelation.prototype.isWayBackTrip = false;
CRelation.prototype.isCalculated = false;
CRelation.prototype.environmentalData = null;
CRelation.prototype.selectedScope = 0;
CRelation.prototype.graphGlobal = null;
CRelation.prototype.graphGlobalData = null;
CRelation.prototype.graphKPI = null;
CRelation.prototype.graphKPIData = null;

/*********************************************************METHODES*************************************************************/
//	Méthode permettant d'initialiser la relation
CRelation.prototype.initialisation = function()
{
	this.initPrePostCarriageCountry();
	this.updateOriginPlateforme();
	this.updateDestinationPlateforme();
};

//	Méthode permettant d'initialiser la plateforme origine
CRelation.prototype.setIdSelectedOriginPlateforme = function(idPlateforme)
{
	this.idSelectedOriginPlateforme = idPlateforme;
};

//	Méthode permettant d'initialiser la plateforme destination
CRelation.prototype.setIdSelectedDestinationPlateforme = function(idPlateforme)
{
	this.idSelectedDestinationPlateforme = idPlateforme;
};

//	Initialisation de la liste des pays de pre/post acheminement
CRelation.prototype.initPrePostCarriageCountry = function()
{
	//	Récupération des pays pour le pre/post acheminement
	(new CWSManager()).getPrePostCarriageCountry(this, 'onGetPrePostCountryResult');
};

//	Setter CRelation::id
CRelation.prototype.setId = function(id)
{
	this.id = id;
};

//	Getter CRelation::id
CRelation.prototype.getId = function()
{
	return this.id;
};

//	Méthode permettant de mettre à jour l'IHM de l'EcoCalculateur avec les informations de la relation
CRelation.prototype.updateIHM = function()
{
	var savedOriginZip = this.selectedOriginZip;
	var savedDestinationZip = this.selectedDestinationZip;
	//	MAJ pays origine
	var countryLbl = '';
	var select = document.getElementById('ecocalculateur_input_origin_country_component');
	var nbOption = select.childNodes.length;
	for (var i = 0 ; i < nbOption ; i++)
	{
		if (select.childNodes[i].attributes['value'].value == this.idSelectedOriginCountry)
		{
			countryLbl = select.childNodes[i].firstChild.data;
		}
	}
	$('#ecocalculateur_input_origin_country_component').selectbox('change', this.idSelectedOriginCountry.toString(), countryLbl);
	
	//	MAJ pays destination
	countryLbl = '';
	select = document.getElementById('ecocalculateur_input_destination_country_component');
	nbOption = select.childNodes.length;
	for (var i = 0 ; i < nbOption ; i++)
	{
		if (select.childNodes[i].attributes['value'].value == this.idSelectedDestinationCountry)
		{
			countryLbl = select.childNodes[i].firstChild.data;
		}
	}
	$('#ecocalculateur_input_destination_country_component').selectbox('change', this.idSelectedDestinationCountry.toString(), countryLbl);
	
	//	MAJ zip origine
	document.getElementById('ecocalculateur_input_origin_zip_component').value = savedOriginZip;
	this.onOriginZipChange(savedOriginZip);
	
	//	MAJ zip destination
	document.getElementById('ecocalculateur_input_destination_zip_component').value = savedDestinationZip;
	this.onDestinationZipChange(savedDestinationZip);
	
	//	MAJ nb 20/30/40p
	document.getElementById('ecocalculateur_input_goods_20p_component').value = this.nb20p;
	document.getElementById('ecocalculateur_input_goods_30p_component').value = this.nb30p;
	document.getElementById('ecocalculateur_input_goods_40p_component').value = this.nb40p;
	
	//	MAJ isEmpty/isWayBack
	document.getElementById('ecocalculateur_input_trip_empty_component').checked = this.isEmptyTrip;
	document.getElementById('ecocalculateur_input_trip_wayback_component').checked = this.isWayBackTrip;
	this.onWayBackTripChange(this.isWayBackTrip);
	
	//	MAJ composants de reporting
	this.updateIHMReporting();
};

//	Méthode permettant de mettre à jour le composant de reporting
CRelation.prototype.updateIHMReporting = function()
{
	
	if (this.isCalculated)
	{
		this.prepareReportingData();
		
		document.getElementById('ecocalculateur_relation_result_chart').style.visibility = 'visible';
		document.getElementById('ecocalculateur_relation_result_text_top').style.visibility = 'visible';
		var relationAbstracts = getElementsByClassName('ecocalculateur_relation_abstract');
		var nbRelationAbstracts = relationAbstracts.length;
		for (var i = 0 ; i < nbRelationAbstracts ; i++)
		{
			relationAbstracts[i].style.visibility = 'visible';
		}
		
		//	MAJ Scope
		switch (this.selectedScope)
		{
			case CCtrlEcoCalculateur.SCOPE_NRJ:
				document.getElementById('ecocalculateur_indicateur_energie').className = 'selected';
				document.getElementById('ecocalculateur_indicateur_co2').className = 'unselected';
				break;
			case CCtrlEcoCalculateur.SCOPE_CO2:
				document.getElementById('ecocalculateur_indicateur_energie').className = 'unselected';
				document.getElementById('ecocalculateur_indicateur_co2').className = 'selected';
				break;
		}
		
		//	MAJ gain
		var gainContainer = document.getElementById('ecocalculateur_relation_result_text_gap_container');
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
		
		//	MAJ graphe global
		document.getElementById('ecocalculateur_relation_result_chart_chart_container_global').style.visibility = 'visible';
		this.graphGlobal = new Highcharts.Chart({
			chart: {
				renderTo: 'ecocalculateur_relation_result_chart_chart_container_global',
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
						'font-size': '20px',
						'line-height': '20px'
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
					
					switch (CCtrlEcoCalculateur.getInstance().getSelectedRelation().getSelectedScope())
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
		document.getElementById('ecocalculateur_relation_result_chart_chart_container_uti').style.visibility = 'visible';
		this.graphKPI = new Highcharts.Chart({
			chart: {
				renderTo: 'ecocalculateur_relation_result_chart_chart_container_uti',
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
						'font-size': '20px',
						'line-height': '20px'
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
					
					switch (CCtrlEcoCalculateur.getInstance().getSelectedRelation().getSelectedScope())
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
		
		//	MAJ onglet
		var originStationText = '';
		var destinationStationText = '';
		
		for (var i = 0 ; i < this.originStations.length ; i++)
			if (this.originStations[i].getId() == this.idSelectedOriginPlateforme)
				originStationText = this.originStations[i].getLabel();
		for (var i = 0 ; i < this.destinationStations.length ; i++)
			if (this.destinationStations[i].getId() == this.idSelectedDestinationPlateforme)
				destinationStationText = this.destinationStations[i].getLabel();
		
		var tabTextContainer = null;
		var tabContainer = document.getElementById('ecocalculateur_tab_container_ul');
		var nbTabs = document.getElementById('ecocalculateur_tab_container_ul').childNodes.length;
		var iTab = 0;
		for (var i = 0 ; i < nbTabs ; i++)
		{
			if (tabContainer.childNodes[i].nodeName == 'LI')
			{
				if (iTab == this.id)
				{
					tabTextContainer = tabContainer.childNodes[i].firstChild;
				}
				iTab++;
			}
		}
		while (tabTextContainer.firstChild)
			tabTextContainer.removeChild(tabTextContainer.firstChild);
		tabTextContainer.appendChild(document.createTextNode(originStationText));
		tabTextContainer.appendChild(document.createElement('BR'));
		tabTextContainer.appendChild(document.createTextNode(destinationStationText));
		$('#ecocalculateur_tab_container').tabs('refresh');
		
		//	MAJ abstract
		var relationAbstractContainer = document.getElementById('ecocalculateur_relation_abstract_container');
		while (relationAbstractContainer.firstChild)
			relationAbstractContainer.removeChild(relationAbstractContainer.firstChild);
			
		if (this.selectedOriginZip != '')
		{
			var tdOriginZip = document.createElement('TD');
			tdOriginZip.appendChild(document.createTextNode(this.selectedOriginZip));
			relationAbstractContainer.appendChild(tdOriginZip);
			var tdOriginZipImage = document.createElement('TD');
			var imgOriginZipImage = document.createElement('IMG');
			imgOriginZipImage.src = baseUrl+'/medias/images/ecocalculateur/ecocalculateur_abstract_truck.png';
			tdOriginZipImage.appendChild(imgOriginZipImage);
			relationAbstractContainer.appendChild(tdOriginZipImage);
		}
		var tdOriginPlateforme = document.createElement('TD');
		tdOriginPlateforme.appendChild(document.createTextNode(originStationText));
		relationAbstractContainer.appendChild(tdOriginPlateforme);
		var tdPlateforme = document.createElement('TD');
		var imgPlateforme = document.createElement('IMG');
		imgPlateforme.src = baseUrl+'/medias/images/ecocalculateur/ecocalculateur_abstract_train.png';
		tdPlateforme.appendChild(imgPlateforme);
		relationAbstractContainer.appendChild(tdPlateforme);
		var tdDestinationPlateforme = document.createElement('TD');
		tdDestinationPlateforme.appendChild(document.createTextNode(destinationStationText));
		relationAbstractContainer.appendChild(tdDestinationPlateforme);
		if (this.selectedDestinationZip != '')
		{
			var tdDestinationZipImage = document.createElement('TD');
			var imgDestinationZipImage = document.createElement('IMG');
			imgDestinationZipImage.src = baseUrl+'/medias/images/ecocalculateur/ecocalculateur_abstract_truck.png';
			tdDestinationZipImage.appendChild(imgDestinationZipImage);
			relationAbstractContainer.appendChild(tdDestinationZipImage);
			var tdDestinationZip = document.createElement('TD');
			tdDestinationZip.appendChild(document.createTextNode(this.selectedDestinationZip));
			relationAbstractContainer.appendChild(tdDestinationZip);
		}
		
		//	MAJ units
		var chartKPIUnitContainer = document.getElementById('ecocalculateur_relation_result_chart_title1_unit');
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
		
		var chartGlobalUnitContainer = document.getElementById('ecocalculateur_relation_result_chart_title2_unit');
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
		
		var resultTextUnitContainer = document.getElementById('ecocalculateur_relation_result_text_unit');
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
		
		
	}
	else
	{
		document.getElementById('ecocalculateur_relation_result_chart').style.visibility = 'hidden';
		document.getElementById('ecocalculateur_relation_result_text_top').style.visibility = 'hidden';
		var relationAbstracts = getElementsByClassName('ecocalculateur_relation_abstract');
		var nbRelationAbstracts = relationAbstracts.length;
		for (var i = 0 ; i < nbRelationAbstracts ; i++)
		{
			relationAbstracts[i].style.visibility = 'hidden';
		}
		document.getElementById('ecocalculateur_relation_result_chart_chart_container_uti').style.visibility = 'hidden';
		document.getElementById('ecocalculateur_relation_result_chart_chart_container_global').style.visibility = 'hidden';
		
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
		
		var tabTextContainer = null;
		var tabContainer = document.getElementById('ecocalculateur_tab_container_ul');
		var nbTabs = document.getElementById('ecocalculateur_tab_container_ul').childNodes.length;
		var iTab = 0;
		for (var i = 0 ; i < nbTabs ; i++)
		{
			if (tabContainer.childNodes[i].nodeName == 'LI')
			{
				if (iTab == this.id)
				{
					tabTextContainer = tabContainer.childNodes[i].firstChild;
				}
				iTab++;
			}
		}
		
		while (tabTextContainer.firstChild)
			tabTextContainer.removeChild(tabTextContainer.firstChild);
	}
};

//	Méthode retournant l'indicateur selectionné
CRelation.prototype.getSelectedScope = function()
{
	return this.selectedScope;
};

//	Méthode permettant de fabriquer les données de reporting
CRelation.prototype.prepareReportingData = function()
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
};

//	Callback getPrePostCarriageCountry
CRelation.prototype.onGetPrePostCountryResult = function(originCountry, destinationCountry)
{
	this.preCarriageCountries = originCountry.slice();
	this.postCarriageCountries = destinationCountry.slice();
	this.updatePrePostCarriageCountry();
};

//	Méthode mettant à jours les listes de choix de pays pour le pre/post acheminement
CRelation.prototype.updatePrePostCarriageCountry = function()
{
	//	Pre-acheminement
	//	On supprime les anciennes valeurs
	var select = document.getElementById('ecocalculateur_input_origin_country_component');
	while (select.firstChild)
	{
		select.removeChild(select.firstChild);
	}
	//	On ajoute les nouvelles valeurs
	var nbCountry = this.preCarriageCountries.length;
	for (var i = 0 ; i < nbCountry ; i++)
	{
		var option = document.createElement('OPTION');
		option.value = this.preCarriageCountries[i].getId();
		option.appendChild(document.createTextNode(this.preCarriageCountries[i].getLabel()));
		select.appendChild(option);
	}
	$('#ecocalculateur_input_origin_country_component').selectbox('detach');
	$('#ecocalculateur_input_origin_country_component').selectbox({
		onChange: function(val, inst){this.JSObject.onOriginCountryChange.call(this.JSObject, val);}
	});
	
	//	Post-acheminement
	//	On supprime les anciennes valeurs
	var select = document.getElementById('ecocalculateur_input_destination_country_component');
	while (select.firstChild)
	{
		select.removeChild(select.firstChild);
	}
	//	On ajoute les nouvelles valeurs
	var nbCountry = this.postCarriageCountries.length;
	for (var i = 0 ; i < nbCountry ; i++)
	{
		var option = document.createElement('OPTION');
		option.value = this.postCarriageCountries[i].getId();
		option.appendChild(document.createTextNode(this.postCarriageCountries[i].getLabel()));
		select.appendChild(option);
	}
	$('#ecocalculateur_input_destination_country_component').selectbox('detach');
	$('#ecocalculateur_input_destination_country_component').selectbox({
		onChange: function(val, inst){this.JSObject.onDestinationCountryChange.call(this.JSObject, val);}
	});
	this.onOriginCountryChange(0);
	this.onDestinationCountryChange(0);
};

//	Callback sur getMainCarriageOriginStation
CRelation.prototype.onGetMainCarriageOriginStationResult = function(stations)
{
	this.originStations = stations.slice();
	this.updateOriginStations();
};

//	Méthode permettant de mettre à jours la liste des gares origines de l'acheminement principal
CRelation.prototype.updateOriginStations = function()
{
	//	On supprime les anciennes valeurs
	var select = document.getElementById('ecocalculateur_input_origin_plateforme_component');
	while (select.firstChild)
	{
		select.removeChild(select.firstChild);
	}
	//	On ajoute les nouvelles valeurs
	var nbStations = this.originStations.length;
	for (var i = 0 ; i < nbStations ; i++)
	{
		var option = document.createElement('OPTION');
		option.value = this.originStations[i].getId();
		option.appendChild(document.createTextNode(this.originStations[i].getLabel()));
		select.appendChild(option);
	}
	$('#ecocalculateur_input_origin_plateforme_component').selectbox('detach');
	$('#ecocalculateur_input_origin_plateforme_component').selectbox({
		onChange: function(val, inst){this.JSObject.onOriginPlateformeChange.call(this.JSObject, val);}
	});
	//	Si l'ancienne plateforme est présente, on la sélectionne
	var isOldPlateformeSelected = false;
	if (this.idSelectedOriginPlateforme != 0)
	{
		for (var i = 0 ; i < nbStations ; i++)
		{
			if (this.originStations[i].getId() == this.idSelectedOriginPlateforme)
			{
				isOldPlateformeSelected = true;
				this.labelSelectedOriginPlateforme = this.originStations[i].getLabel();
				$('#ecocalculateur_input_origin_plateforme_component').selectbox('change', this.originStations[i].getId().toString(), this.originStations[i].getLabel());
			}
		}
	}
	if (!isOldPlateformeSelected)
	{
		//	Si une plateforme par defaut est présente, elle est sélectionnée
		var isDefaultPlateforme = false;
		for (var i = 0 ; i < nbStations ; i++)
		{
			if (this.originStations[i].getIsDefault())
			{
				isDefaultPlateforme = true;
				this.labelSelectedOriginPlateforme = this.originStations[i].getLabel();
				$('#ecocalculateur_input_origin_plateforme_component').selectbox('change', this.originStations[i].getId().toString(), this.originStations[i].getLabel());
			}
		}
		if (!isDefaultPlateforme)
		{
			var defaultValue = '0';
			var defaultText = '';
			var select = document.getElementById('ecocalculateur_input_origin_plateforme_component');
			var nbOption = select.childNodes.length;
			for (var i = 0 ; i < nbOption ; i++)
			{
				if (select.childNodes[i].attributes['value'].value == defaultValue)
				{
					defaultText = select.childNodes[i].firstChild.data;
				}
			}
		
			$('#ecocalculateur_input_origin_plateforme_component').selectbox('change', defaultValue, defaultText);
			this.idSelectedOriginPlateforme = 0;
		}
	}
};

//	Callback sur getMainCarriageDestinationStation
CRelation.prototype.onGetMainCarriageDestinationStationResult = function(stations)
{
	this.destinationStations = stations.slice();
	this.updateDestinationStations();
};

//	Méthode permettant de mettre à jours la liste des gares destination de l'acheminement principal
CRelation.prototype.updateDestinationStations = function()
{
	//	On supprime les anciennes valeurs
	var select = document.getElementById('ecocalculateur_input_destination_plateforme_component');
	while (select.firstChild)
	{
		select.removeChild(select.firstChild);
	}
	//	On ajoute les nouvelles valeurs
	var nbStations = this.destinationStations.length;
	for (var i = 0 ; i < nbStations ; i++)
	{
		var option = document.createElement('OPTION');
		option.value = this.destinationStations[i].getId();
		option.appendChild(document.createTextNode(this.destinationStations[i].getLabel()));
		select.appendChild(option);
	}
	$('#ecocalculateur_input_destination_plateforme_component').selectbox('detach');
	$('#ecocalculateur_input_destination_plateforme_component').selectbox({
		onChange: function(val, inst){this.JSObject.onDestinationPlateformeChange.call(this.JSObject, val);}
	});
	//	Si l'ancienne plateforme est présente, on la sélectionne
	var isOldPlateformeSelected = false;
	if (this.idSelectedDestinationPlateforme != 0)
	{
		for (var i = 0 ; i < nbStations ; i++)
		{
			if (this.destinationStations[i].getId() == this.idSelectedDestinationPlateforme)
			{
				isOldPlateformeSelected = true;
				this.labelSelectedDestinationPlateforme = this.destinationStations[i].getLabel();
				$('#ecocalculateur_input_destination_plateforme_component').selectbox('change', this.destinationStations[i].getId().toString(), this.destinationStations[i].getLabel());
				
			}
		}
	}
	if (!isOldPlateformeSelected)
	{
		//	Si une plateforme par defaut est présente, elle est sélectionnée
		var isDefaultPlateforme = false;
		for (var i = 0 ; i < nbStations ; i++)
		{
			if (this.destinationStations[i].getIsDefault())
			{
				isDefaultPlateforme = true;
				this.labelSelectedDestinationPlateforme = this.destinationStations[i].getLabel();
				$('#ecocalculateur_input_destination_plateforme_component').selectbox('change', this.destinationStations[i].getId().toString(), this.destinationStations[i].getLabel());
			}
		}
		if (!isDefaultPlateforme)
		{
			var defaultValue = '0';
			var defaultText = '';
			var select = document.getElementById('ecocalculateur_input_destination_plateforme_component');
			var nbOption = select.childNodes.length;
			for (var i = 0 ; i < nbOption ; i++)
			{
				if (select.childNodes[i].attributes['value'].value == defaultValue)
				{
					defaultText = select.childNodes[i].firstChild.data;
				}
			}
		
			$('#ecocalculateur_input_destination_plateforme_component').selectbox('change', defaultValue, defaultText);
			this.idSelectedDestinationPlateforme = 0;
		}
	}
};

//	Méthode appelée lors du changement du pays origine
CRelation.prototype.onOriginCountryChange = function(idCountry)
{
	this.idSelectedOriginCountry = idCountry;
	var select = document.getElementById('ecocalculateur_input_origin_country_component');
	var nbOption = select.childNodes.length;
	for (var i = 0 ; i < nbOption ; i++)
	{
		if (select.childNodes[i].attributes['value'].value == this.idSelectedOriginCountry)
		{
			this.labelSelectedOriginCountry = select.childNodes[i].firstChild.data;
		}
	}
	this.clearOriginZip();
};

//	Méthode appelée lors du changement du pays destination
CRelation.prototype.onDestinationCountryChange = function(idCountry)
{
	this.idSelectedDestinationCountry = idCountry;
	var select = document.getElementById('ecocalculateur_input_destination_country_component');
	var nbOption = select.childNodes.length;
	for (var i = 0 ; i < nbOption ; i++)
	{
		if (select.childNodes[i].attributes['value'].value == this.idSelectedDestinationCountry)
		{
			this.labelSelectedDestinationCountry = select.childNodes[i].firstChild.data;
		}
	}
	this.clearDestinationZip();
};

//	Méthode appelée lors du changement du pays origine
CRelation.prototype.onOriginZipChange = function(zip)
{
	this.selectedOriginZip = zip;
	this.updateOriginPlateforme();
};

//	Méthode appelée lors du changement du pays destination
CRelation.prototype.onDestinationZipChange = function(zip)
{
	this.selectedDestinationZip = zip;
	this.updateDestinationPlateforme();
};

//	Méthode appelée lors du changement de plateforme origine
CRelation.prototype.onOriginPlateformeChange = function(idPlateforme)
{
	if (this.idSelectedOriginPlateforme != idPlateforme)
	{
		this.idSelectedOriginPlateforme = idPlateforme;
		var select = document.getElementById('ecocalculateur_input_origin_plateforme_component');
		var nbOption = select.childNodes.length;
		for (var i = 0 ; i < nbOption ; i++)
		{
			if (select.childNodes[i].attributes['value'].value == this.idSelectedOriginPlateforme)
			{
				this.labelSelectedOriginPlateforme = select.childNodes[i].firstChild.data;
			}
		}
		this.updateDestinationPlateforme();
	}
};

//	Méthode appelée lors du changement de plateforme destination
CRelation.prototype.onDestinationPlateformeChange = function(idPlateforme)
{
	if (this.idSelectedDestinationPlateforme != idPlateforme)
	{
		this.idSelectedDestinationPlateforme = idPlateforme;
		var select = document.getElementById('ecocalculateur_input_destination_plateforme_component');
		var nbOption = select.childNodes.length;
		for (var i = 0 ; i < nbOption ; i++)
		{
			if (select.childNodes[i].attributes['value'].value == this.idSelectedDestinationPlateforme)
			{
				this.labelSelectedDestinationPlateforme = select.childNodes[i].firstChild.data;
			}
		}
		this.updateOriginPlateforme();
	}
};

//	Méthode permettant de raz le code zip origine
CRelation.prototype.clearOriginZip = function()
{
	document.getElementById('ecocalculateur_input_origin_zip_component').value = '';
	this.onOriginZipChange('');
};

//	Méthode permettant de raz le code zip destination
CRelation.prototype.clearDestinationZip = function()
{
	document.getElementById('ecocalculateur_input_destination_zip_component').value = '';
	this.onDestinationZipChange('');
};

//	Méthode permettant de valider les entrées de la relation
CRelation.prototype.validate = function()
{
	var retour = true;
	
	//	Vérification du code zip origine
	if (this.idSelectedOriginCountry != 0)
	{
		if (this.selectedOriginZip == '')
		{
			document.getElementById('ecocalculateur_input_origin_zip_component').className = 'error';
			retour = false;
		}
	}
	else
	{
		document.getElementById('ecocalculateur_input_origin_zip_component').value = '';
		this.selectedOriginZip = '';
	}
	
	//	Vérification du code zip destination
	if (this.idSelectedDestinationCountry != 0)
	{
		if (this.selectedDestinationZip == '')
		{
			document.getElementById('ecocalculateur_input_destination_zip_component').className = 'error';
			retour = false;
		}
	}
	else
	{
		document.getElementById('ecocalculateur_input_destination_zip_component').value = '';
		this.selectedDestinationZip = '';
	}
	
	//	Vérification de la plateforme origine
	if (this.idSelectedOriginPlateforme == 0)
	{
		document.getElementById('ecocalculateur_input_origin_plateforme').className = 'error';
		retour = false;
	}
	
	//	Vérification de la plateforme destination
	if (this.idSelectedDestinationPlateforme == 0)
	{
		document.getElementById('ecocalculateur_input_destination_plateforme').className = 'error';
		retour = false;
	}
	
	//	Vérification du nombre d'UTI
	if ((this.nb20p == 0) && (this.nb30p == 0) && (this.nb40p == 0))
	{
		document.getElementById('ecocalculateur_input_goods_20p_component').className = 'ecocalculateur_input_goods_component error';
		document.getElementById('ecocalculateur_input_goods_30p_component').className = 'ecocalculateur_input_goods_component error';
		document.getElementById('ecocalculateur_input_goods_40p_component').className = 'ecocalculateur_input_goods_component error';
		retour = false;
	}
	
	return retour;
};

//	Méthode appelée lors du changement du nombre d'UTI 20p
CRelation.prototype.on20pChange = function(nbUTI)
{
	this.nb20p = nbUTI;
};

//	Méthode appelée lors du changement du nombre d'UTI 30p
CRelation.prototype.on30pChange = function(nbUTI)
{
	this.nb30p = nbUTI;
};

//	Méthode appelée lors du changement du nombre d'UTI 40p
CRelation.prototype.on40pChange = function(nbUTI)
{
	this.nb40p = nbUTI;
};

//	Méthode permettant de mettre à jours la liste des plateformes origines
CRelation.prototype.updateOriginPlateforme = function()
{
	var idDestinationPlateforme = null;
	var idCountry = null;
	var zipCode = null;
	
	if (this.idSelectedDestinationPlateforme != 0)
	{
		idDestinationPlateforme = this.idSelectedDestinationPlateforme;
	}
	if (this.idSelectedOriginCountry != 0)
	{
		idCountry = this.idSelectedOriginCountry;
	}
	if (this.selectedOriginZip != '')
	{
		zipCode = this.selectedOriginZip;
	}
	(new CWSManager()).getMainCarriageOriginStation(this, 'onGetMainCarriageOriginStationResult', idDestinationPlateforme, idCountry, zipCode);
};

//	Méthode permettant de mettre à jours la liste des plateformes destinations
CRelation.prototype.updateDestinationPlateforme = function()
{
	var idOriginPlateforme = null;
	var idCountry = null;
	var zipCode = null;
	
	if (this.idSelectedOriginPlateforme != 0)
	{
		idOriginPlateforme = this.idSelectedOriginPlateforme;
	}
	if (this.idSelectedDestinationCountry != 0)
	{
		idCountry = this.idSelectedDestinationCountry;
	}
	if (this.selectedDestinationZip != '')
	{
		zipCode = this.selectedDestinationZip;
	}
	(new CWSManager()).getMainCarriageDestinationStation(this, 'onGetMainCarriageDestinationStationResult', idOriginPlateforme, idCountry, zipCode);
};

//	Méthode retournant les informations de la relation au format XML
CRelation.prototype.getXML = function()
{
	var xml = '';
	
	xml += '<Relation id="'+this.id+'">';
	xml += '<Origin has_pre_carriage=';
	if (this.selectedOriginZip != '')
	{
		xml += '"1">';
		xml += '<PreCarriage zip_code="'+this.selectedOriginZip+'" id_country="'+this.idSelectedOriginCountry+'"/>';
	}
	else
	{
		xml += '"0">';
	}
		xml += '<Station id="'+this.idSelectedOriginPlateforme+'"/>';
	xml += '</Origin>';
	xml += '<Destination has_post_carriage=';
	if (this.selectedDestinationZip != '')
	{
		xml += '"1">';
		xml += '<PostCarriage zip_code="'+this.selectedDestinationZip+'" id_country="'+this.idSelectedDestinationCountry+'"/>';
	}
	else
	{
		xml += '"0">';
	}
		xml += '<Station id="'+this.idSelectedDestinationPlateforme+'"/>';
	xml += '</Destination>';
	xml += '<Freight nb_20p="'+this.nb20p+'" nb_30p="'+this.nb30p+'" nb_40p="'+this.nb40p+'"/>';
	xml += '<TripInformation';
	if (this.isWayBackTrip)
	{
		xml += ' is_way_back="true" ';
	}
	else
	{
		xml += ' is_way_back="false" ';
	}
	if (this.isEmptyTrip)
	{
		xml += ' is_empty_trip="true" ';
	}
	else
	{
		xml += ' is_empty_trip="false" ';
	}
	xml += '/>';
	xml += '</Relation>';
	
	return xml;
};

CRelation.prototype.getXMLExportData = function()
{
	var xml = '';
	
	xml += '<Relation>';
	xml += '<Origin has_pre_carriage=';
	if (this.selectedOriginZip != '')
	{
		xml += '"1">';
		xml += '<PreCarriage country_label="'+this.labelSelectedOriginCountry+'" zip_code="'+this.selectedOriginZip+'"/>';
	}
	else
	{
		xml += '"0">';
	}
		xml += '<Station label="'+this.labelSelectedOriginPlateforme+'"/>';
	xml += '</Origin>';
	xml += '<Destination has_post_carriage=';
	if (this.selectedDestinationZip != '')
	{
		xml += '"1">';
		xml += '<PostCarriage country_label="'+this.labelSelectedDestinationCountry+'" zip_code="'+this.selectedDestinationZip+'"/>';
	}
	else
	{
		xml += '"0">';
	}
		xml += '<Station label="'+this.labelSelectedDestinationPlateforme+'"/>';
	xml += '</Destination>';
	xml += '<TripInformation is_empty=';
	if (this.isEmptyTrip)
	{
		xml += '"1"'
	}
	else
	{
		xml += '"0"';
	}
	xml += ' is_wayback=';
	if (this.isWayBackTrip)
	{
		xml += '"1"'
	}
	else
	{
		xml += '"0"';
	}
	xml += '/>';
	xml += '<GoodsInformation nb_20="'+this.nb20p+'" nb_30="'+this.nb30p+'" nb_40="'+this.nb40p+'"/>';
	xml += this.environmentalData.getXMLExportData();
	xml += '</Relation>';
	
	return xml;
};

//	Méthode appelée lors du changement de l'état aller-retour
CRelation.prototype.onWayBackTripChange = function(state)
{
	this.isWayBackTrip = state;
	
	if (this.isWayBackTrip)
	{
		this.isEmptyTrip = false;
		document.getElementById('ecocalculateur_input_trip_empty_component').checked = false;
		document.getElementById('ecocalculateur_input_trip_empty_component').disabled = true;
	}
	else
	{
		document.getElementById('ecocalculateur_input_trip_empty_component').disabled = false;
	}
};

//	Méthode appelée lors du changement de l'état trajet vide
CRelation.prototype.onEmptyTripChange = function(state)
{
	this.isEmptyTrip = state;
};

//	Méthode appelée lors du click sur le bouton "calculer"
CRelation.prototype.calculate = function()
{
	if (this.validate())
	{
		(new CWSManager()).getRelationEnvironmentalInformation(this, 'onGetRelationEnvironmentalInformationResult', this.getXML());
	}
	else
	{
		this.isCalculated = false;
		this.updateIHMReporting();
	}
};

//	Callback sur getRelationEnvironmentalInformation
CRelation.prototype.onGetRelationEnvironmentalInformationResult = function(environmentalData)
{
	this.environmentalData = environmentalData;
	this.isCalculated = true;
	this.updateIHMReporting();
};

//	Méthode appelée lors du click sur l'indicateur NRJ
CRelation.prototype.onScopeNRJClick = function()
{
	if (this.selectedScope != CCtrlEcoCalculateur.SCOPE_NRJ)
	{
		this.selectedScope = CCtrlEcoCalculateur.SCOPE_NRJ;
		document.getElementById('ecocalculateur_indicateur_energie').className = 'selected';
		document.getElementById('ecocalculateur_indicateur_co2').className = 'unselected';
		this.updateIHMReporting();
	}
};

//	Méthode appelée lors du click sur l'indicateur CO2
CRelation.prototype.onScopeCO2Click = function()
{
	if (this.selectedScope != CCtrlEcoCalculateur.SCOPE_CO2)
	{
		this.selectedScope = CCtrlEcoCalculateur.SCOPE_CO2;
		document.getElementById('ecocalculateur_indicateur_energie').className = 'unselected';
		document.getElementById('ecocalculateur_indicateur_co2').className = 'selected';
		this.updateIHMReporting();
	}
};

//	Méthode appelée lors de la fermeture de la relation
CRelation.prototype.destroy = function()
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

//	Méthode permettant de réinitialiser le formulaire de saisie
CRelation.prototype.clearInputs = function()
{
	//	RAZ origin country
	var defaultValue = '0';
	var defaultText = '';
	var select = document.getElementById('ecocalculateur_input_origin_country_component');
	var nbOption = select.childNodes.length;
	for (var i = 0 ; i < nbOption ; i++)
	{
		if (select.childNodes[i].attributes['value'].value == defaultValue)
		{
			defaultText = select.childNodes[i].firstChild.data;
		}
	}
	$('#ecocalculateur_input_origin_country_component').selectbox('change', defaultValue, defaultText);
	this.onOriginCountryChange(0);
	
	//	RAZ destination country
	defaultValue = '0';
	defaultText = '';
	select = document.getElementById('ecocalculateur_input_destination_country_component');
	nbOption = select.childNodes.length;
	for (var i = 0 ; i < nbOption ; i++)
	{
		if (select.childNodes[i].attributes['value'].value == defaultValue)
		{
			defaultText = select.childNodes[i].firstChild.data;
		}
	}
	$('#ecocalculateur_input_destination_country_component').selectbox('change', defaultValue, defaultText);
	this.onDestinationCountryChange(0);
	
	//	RAZ origin plateforme
	defaultValue = '0';
	defaultText = '';
	select = document.getElementById('ecocalculateur_input_origin_plateforme_component');
	nbOption = select.childNodes.length;
	for (var i = 0 ; i < nbOption ; i++)
	{
		if (select.childNodes[i].attributes['value'].value == defaultValue)
		{
			defaultText = select.childNodes[i].firstChild.data;
		}
	}
	$('#ecocalculateur_input_origin_plateforme_component').selectbox('change', defaultValue, defaultText);
	this.onDestinationCountryChange(0);
	
	//	RAZ destination plateforme
	defaultValue = '0';
	defaultText = '';
	select = document.getElementById('ecocalculateur_input_destination_plateforme_component');
	nbOption = select.childNodes.length;
	for (var i = 0 ; i < nbOption ; i++)
	{
		if (select.childNodes[i].attributes['value'].value == defaultValue)
		{
			defaultText = select.childNodes[i].firstChild.data;
		}
	}
	$('#ecocalculateur_input_destination_plateforme_component').selectbox('change', defaultValue, defaultText);
	this.onDestinationCountryChange(0);
	
	//	RAZ nb uti
	document.getElementById('ecocalculateur_input_goods_20p_component').value = '0';
	this.on20pChange(0);
	document.getElementById('ecocalculateur_input_goods_30p_component').value = '0';
	this.on30pChange(0);
	document.getElementById('ecocalculateur_input_goods_40p_component').value = '0';
	this.on40pChange(0);
	
	//	RAZ options
	document.getElementById('ecocalculateur_input_trip_wayback_component').checked = false;
	document.getElementById('ecocalculateur_input_trip_empty_component').checked = false;
	document.getElementById('ecocalculateur_input_trip_empty_component').disabled = false;
	
	//	RAZ reporting IHM
	this.isCalculated = false;
	this.updateIHMReporting();
	
	//	RAZ scope
	this.selectedScope = CCtrlEcoCalculateur.SCOPE_NRJ;
	document.getElementById('ecocalculateur_indicateur_energie').className = 'selected';
	document.getElementById('ecocalculateur_indicateur_co2').className = 'unselected';
};