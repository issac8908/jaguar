//	CCtrlEcoCalculateur
//	CCtrlEcoCalculateur gérant l'EcoCalculateur

function CCtrlEcoCalculateur()
{
}
/*********************************************************STATIQUE*************************************************************/
CCtrlEcoCalculateur.instance = null;
CCtrlEcoCalculateur.getInstance = function()
{
	if (CCtrlEcoCalculateur.instance == null)
	{
		CCtrlEcoCalculateur.instance = new CCtrlEcoCalculateur();
	}
	
	return CCtrlEcoCalculateur.instance;
};

CCtrlEcoCalculateur.NB_RELATION_MAX = 4;

CCtrlEcoCalculateur.SCOPE_NRJ = 1;
CCtrlEcoCalculateur.SCOPE_CO2 = 2;

/**********************************************************CHAMPS**************************************************************/
CCtrlEcoCalculateur.prototype.nbRelation = 0;
CCtrlEcoCalculateur.prototype.relations = null;
CCtrlEcoCalculateur.prototype.iSelectedTab = 0;
CCtrlEcoCalculateur.prototype.selectedRelation = null;
CCtrlEcoCalculateur.prototype.globalReporting = null;
CCtrlEcoCalculateur.prototype.hasForcedOriginPlateforme = false;
CCtrlEcoCalculateur.prototype.idForcedOriginPlateforme = 0;

/*********************************************************METHODES*************************************************************/
//	Méthode permettant de définir une plateforme origine pré-sélectionnée
//	Méthode à appeler avant l'initialisation
CCtrlEcoCalculateur.prototype.forceOriginPlateforme = function(idPlateforme)
{
	this.hasForcedOriginPlateforme = true;
	this.idForcedOriginPlateforme = idPlateforme;
};

//	Méthode appelée lors de l'initialisation de la page de l'EcoCalculateur
CCtrlEcoCalculateur.prototype.initialisation = function()
{
	this.initHTMLComponent();
	this.relations = new Array();
	
	//	Initialisation : ajout de la première relation
	var relation = new CRelation();
	relation.setId(0);
	this.relations.push(relation);
	//	Si une plateforme origine est pré-sélectionnée
	if (this.hasForcedOriginPlateforme)
	{
		relation.setIdSelectedOriginPlateforme(this.idForcedOriginPlateforme);
		this.hasForcedOriginPlateforme = false;
	}
	relation.initialisation();
	this.nbRelation++;
	this.iSelectedTab = 0;
	this.selectedRelation = relation;
	
	this.globalReporting = new CGlobalReporting();
};

//	Méthode retournant l'ensemble des relations
CCtrlEcoCalculateur.prototype.getRelations = function()
{
	return this.relations;
};

//	Méthode permettant d'initialiser les composants HTML
CCtrlEcoCalculateur.prototype.initHTMLComponent = function()
{
	document.getElementById('ecocalculateur_input_origin_country_component').JSObject = this;
	$('#ecocalculateur_input_origin_country_component').selectbox({
		onChange: function(val, inst){this.JSObject.onOriginCountryChange.call(this, val);}
	});
	
	document.getElementById('ecocalculateur_input_origin_plateforme_component').JSObject = this;
	$('#ecocalculateur_input_origin_plateforme_component').selectbox({
		onChange: function(val, inst){this.JSObject.onOriginPlateformeChange.call(this, val);}
	});
	
	document.getElementById('ecocalculateur_input_destination_country_component').JSObject = this;
	$('#ecocalculateur_input_destination_country_component').selectbox({
		onChange: function(val, inst){this.JSObject.onDestinationCountryChange.call(this, val);}
	});
	
	document.getElementById('ecocalculateur_input_destination_plateforme_component').JSObject = this;
	$('#ecocalculateur_input_destination_plateforme_component').selectbox({
		onChange: function(val, inst){this.JSObject.onDestinationPlateformeChange.call(this, val);}
	});
	
	document.getElementById('ecocalculateur_tab_container').JSObject = this;
	$('#ecocalculateur_tab_container').tabs({
		select: function(event, ui)
		{
			this.JSObject.onTabChange.call(this.JSObject, ui.index);
		}
	});
	
	$('#ecocalculateur_tab_container').tabs('add', '#ecocalculateur_input_tab', '');
	$('#ecocalculateur_tab_container').tabs('add', '#ecocalculateur_global_tab', '');
	
	document.getElementById('ecocalculateur_relation_result_text_add_relation').JSObject = this;
	
	document.getElementById('ecocalculateur_input_origin_zip_component').JSObject = this;
	document.getElementById('ecocalculateur_input_origin_zip_component').disabled = true;
	
	document.getElementById('ecocalculateur_input_destination_zip_component').JSObject = this;
	document.getElementById('ecocalculateur_input_destination_zip_component').disabled = true;
	
	document.getElementById('ecocalculateur_input_calculate_button').JSObject = this;
	
	var goods20p = document.getElementById('ecocalculateur_input_goods_20p_component');
	var goods30p = document.getElementById('ecocalculateur_input_goods_30p_component');
	var goods40p = document.getElementById('ecocalculateur_input_goods_40p_component');
	goods20p.JSObject = this;
	goods30p.JSObject = this;
	goods40p.JSObject = this;
	
	document.getElementById('ecocalculateur_input_trip_wayback_component').JSObject = this;
	
	document.getElementById('ecocalculateur_input_trip_empty_component').JSObject = this;
	
	$('#ecocalculateur_popup_error_route').dialog({
		autoOpen:false,
		modal:true,
		buttons:{
			Ok:function(){
				$(this).dialog('close');
			}
		}
	});
	
	$('#ecocalculateur_popup_error_wsclienv').dialog({
		autoOpen:false,
		modal:true,
		buttons:{
			Ok:function(){
				$(this).dialog('close');
			}
		}
	});
	
	document.getElementById('ecocalculateur_indicateur_energie').JSObject = this;
	
	document.getElementById('ecocalculateur_indicateur_co2').JSObject = this;
	
	document.getElementById('ecocalculateur_relation_result_text_clear_input').JSObject = this;
	
	document.getElementById('ecocalculateur_global_indicateur_energie').JSObject = this;
	
	document.getElementById('ecocalculateur_global_indicateur_co2').JSObject = this;
	
	document.getElementById('ecocalculateur_global_clear_input').JSObject = this;
	
	document.getElementById('ecocalculateur_pdf_button').JSObject = this;
	document.getElementById('ecocalculateur_global_pdf_button').JSObject = this;
	document.getElementById('ecocalculateur_print_button').JSObject = this;
	document.getElementById('ecocalculateur_global_print_button').JSObject = this;
	
	document.getElementById('ecocalculateur_relation_result_text_add_relation')['onclick'] = function(){this.JSObject.onAddRelationClick.call(this.JSObject)};
	document.getElementById('ecocalculateur_input_origin_zip_component')['onblur'] = function(){this.JSObject.onOriginZipChange.call(this.JSObject, document.getElementById('ecocalculateur_input_origin_zip_component').value)};
	document.getElementById('ecocalculateur_input_destination_zip_component')['onblur'] = function(){this.JSObject.onDestinationZipChange.call(this.JSObject, document.getElementById('ecocalculateur_input_destination_zip_component').value)};
	document.getElementById('ecocalculateur_input_calculate_button')['onclick'] = function(){this.JSObject.onCalculateClick.call(this.JSObject)};
	goods20p['onblur'] = function(){this.JSObject.on20pChange.call(this.JSObject, goods20p.value)};
	goods30p['onblur'] = function(){this.JSObject.on30pChange.call(this.JSObject, goods30p.value)};
	goods40p['onblur'] = function(){this.JSObject.on40pChange.call(this.JSObject, goods40p.value)};
	document.getElementById('ecocalculateur_indicateur_co2')['onclick'] = function(){this.JSObject.onScopeCO2Click.call(this.JSObject)};
	document.getElementById('ecocalculateur_input_trip_empty_component')['onclick'] = function(){this.JSObject.onEmptyTripChange.call(this.JSObject, document.getElementById('ecocalculateur_input_trip_empty_component').checked)};
	document.getElementById('ecocalculateur_input_trip_wayback_component')['onclick'] = function(){this.JSObject.onWayBackTripChange.call(this.JSObject, document.getElementById('ecocalculateur_input_trip_wayback_component').checked)};
	document.getElementById('ecocalculateur_indicateur_energie')['onclick'] = function(){this.JSObject.onScopeNRJClick.call(this.JSObject)};
	document.getElementById('ecocalculateur_relation_result_text_clear_input')['onclick'] = function(){this.JSObject.onClearInputsClick.call(this.JSObject)};
	document.getElementById('ecocalculateur_global_indicateur_energie')['onclick'] = function(){this.JSObject.onGlobalScopeNRJClick.call(this.JSObject)};
	document.getElementById('ecocalculateur_global_indicateur_co2')['onclick'] = function(){this.JSObject.onGlobalScopeCO2Click.call(this.JSObject)};
	document.getElementById('ecocalculateur_global_clear_input')['onclick'] = function(){this.JSObject.onGlobalClearInputsClick.call(this.JSObject)};
	document.getElementById('ecocalculateur_pdf_button')['onclick'] = function(){this.JSObject.onPDFExportClick.call(this.JSObject)};
	document.getElementById('ecocalculateur_global_pdf_button')['onclick'] = function(){this.JSObject.onPDFExportClick.call(this.JSObject)};
	document.getElementById('ecocalculateur_print_button')['onclick'] = function(){this.JSObject.onPrintClick.call(this.JSObject)};
	document.getElementById('ecocalculateur_global_print_button')['onclick'] = function(){this.JSObject.onPrintClick.call(this.JSObject)};
};

//	Méthode permettant d'ajouter un onglet
CCtrlEcoCalculateur.prototype.addRelationTab = function(idRelation)
{
	/*var HTMLli = document.createElement('LI');
	var HTMLa = document.createElement('A');
	HTMLa.href = '#ecocalculateur_input_tab';
	HTMLli.appendChild(HTMLa);
	document.getElementById('ecocalculateur_tab_container_ul').insertBefore(HTMLli, document.getElementById('ecocalculateur_tab_global'));
	
	$('#ecocalculateur_tab_container').tabs('refresh');*/
	$('#ecocalculateur_tab_container').tabs('add', '#ecocalculateur_input_tab', '', this.nbRelation-1);
	
	for (var i = 2 ; i <= this.nbRelation ; i++)
	{
		$('#ecocalculateur_extratab_calcul_0'+i).removeClass('hide');
	}
};

//	Méthode retournant la relation sélectionnée
CCtrlEcoCalculateur.prototype.getSelectedRelation = function()
{
	return this.selectedRelation;
};

//	Méthode appelée lors du click sur le bouton d'ajout d'une relation
CCtrlEcoCalculateur.prototype.onAddRelationClick = function()
{
	this.addRelation();
};

//	Méthode appelée lors du click sur le bouton d'export PDF
CCtrlEcoCalculateur.prototype.onPDFExportClick = function()
{
	var nbCalculatedRelations = 0;
	for (var i = 0 ; i < this.nbRelation ; i++)
	{
		if (this.relations[i].isCalculated)
		{
			nbCalculatedRelations++;
		}
	}
	if (nbCalculatedRelations > 0)
	{
		this.exportRelationsPDF();
	}
};

//	Méthode appelée lors du click sur le bouton imprimer
CCtrlEcoCalculateur.prototype.onPrintClick = function()
{
	var nbCalculatedRelations = 0;
	for (var i = 0 ; i < this.nbRelation ; i++)
	{
		if (this.relations[i].isCalculated)
		{
			nbCalculatedRelations++;
		}
	}
	if (nbCalculatedRelations > 0)
	{
		this.printRelations();
	}
};

//	Méthode permettant de réaliser l'export PDF des relations calculées
CCtrlEcoCalculateur.prototype.exportRelationsPDF = function()
{
	var xml = '';
	var xmlRelations = new Array();
	var nbCalculatedRelations = 0;
	
	for (var i = 0 ; i < this.nbRelation ; i++)
	{
		if (this.relations[i].isCalculated)
		{
			nbCalculatedRelations++;
			xmlRelations.push(this.relations[i].getXMLExportData());
		}
	}
	
	xml += '<Relations nb_relation="'+nbCalculatedRelations+'">';
	for (var i = 0 ; i < nbCalculatedRelations ; i++)
	{
		xml += xmlRelations[i];
	}
	this.globalReporting.updateReportingData();
	xml += this.globalReporting.environmentalData.getXMLExportData();
	xml += '</Relations>';
	window.open(CWSManager.wsAddress+'eco-calculateur/get-pdf-export?xml_relations='+xml);
};

//	Méthode permettant d'imprimer l'export PDF des relations
CCtrlEcoCalculateur.prototype.printRelations = function()
{
	var xml = '';
	var xmlRelations = new Array();
	var nbCalculatedRelations = 0;
	
	for (var i = 0 ; i < this.nbRelation ; i++)
	{
		if (this.relations[i].isCalculated)
		{
			nbCalculatedRelations++;
			xmlRelations.push(this.relations[i].getXMLExportData());
		}
	}
	
	xml += '<Relations nb_relation="'+nbCalculatedRelations+'">';
	for (var i = 0 ; i < nbCalculatedRelations ; i++)
	{
		xml += xmlRelations[i];
	}
	this.globalReporting.updateReportingData();
	xml += this.globalReporting.environmentalData.getXMLExportData();
	xml += '</Relations>';
	window.open(CWSManager.wsAddress+'eco-calculateur/print-pdf-export?xml_relations='+xml);
};

//	Méthode permettant d'ajouter une relation
CCtrlEcoCalculateur.prototype.addRelation = function()
{
	if (this.nbRelation < CCtrlEcoCalculateur.NB_RELATION_MAX)
	{
		var relation = new CRelation();
		this.relations.push(relation);
		relation.setId(this.nbRelation);
		this.nbRelation++;
		this.addRelationTab(relation.getId());
	}
};

//	Méthode appelée lors du changement d'onglet
CCtrlEcoCalculateur.prototype.onTabChange = function(iTab)
{
	if (iTab != this.iSelectedTab)
	{
		$('#ecocalculateur_extratab_calcul_01').removeClass('selected');
		$('#ecocalculateur_extratab_calcul_02').removeClass('selected');
		$('#ecocalculateur_extratab_calcul_03').removeClass('selected');
		$('#ecocalculateur_extratab_calcul_04').removeClass('selected');
		$('#ecocalculateur_extratab_global').removeClass('selected');
		$('#ecocalculateur_extratab_calcul_01').addClass('unselected');
		$('#ecocalculateur_extratab_calcul_02').addClass('unselected');
		$('#ecocalculateur_extratab_calcul_03').addClass('unselected');
		$('#ecocalculateur_extratab_calcul_04').addClass('unselected');
		$('#ecocalculateur_extratab_global').addClass('unselected');
	
		if (this.selectedRelation != null)
			this.selectedRelation.destroy();
		this.globalReporting.destroy();
		this.iSelectedTab = iTab;
		var isGlobal = true;
		if (iTab < this.nbRelation)
			isGlobal = false;
		
		if (isGlobal)
		{
			$('#ecocalculateur_extratab_global').removeClass('unselected');
			$('#ecocalculateur_extratab_global').addClass('selected');
			
			this.selectedRelation = null;
			this.globalReporting.updateIHM();
		}
		else
		{
			$('#ecocalculateur_extratab_calcul_0'+(this.iSelectedTab+1)).removeClass('unselected');
			$('#ecocalculateur_extratab_calcul_0'+(this.iSelectedTab+1)).addClass('selected');
			
			document.getElementById('ecocalculateur_input_goods_20p_component').className = 'ecocalculateur_input_goods_component';
			document.getElementById('ecocalculateur_input_goods_30p_component').className = 'ecocalculateur_input_goods_component';
			document.getElementById('ecocalculateur_input_goods_40p_component').className = 'ecocalculateur_input_goods_component';
			document.getElementById('ecocalculateur_input_destination_zip_component').className = '';
			document.getElementById('ecocalculateur_input_origin_zip_component').className = '';
			document.getElementById('ecocalculateur_input_destination_plateforme').className = '';
			document.getElementById('ecocalculateur_input_origin_plateforme').className = '';
			for (var i = 0 ; i < this.nbRelation ; i++)
			{
				if (this.relations[i].getId() == iTab)
				{
					this.selectedRelation = this.relations[i];
					this.selectedRelation.updateIHM();
				}
			}
		}
	}
};

//	Méthode appelée lors du changement du pays origine
CCtrlEcoCalculateur.prototype.onOriginCountryChange = function(idCountry)
{
	this.selectedRelation.onOriginCountryChange(idCountry);
	if (idCountry == 0)
	{
		document.getElementById('ecocalculateur_input_origin_zip_component').disabled = true;
	}
	else
	{
		document.getElementById('ecocalculateur_input_origin_zip_component').disabled = false;
	}
};

//	Méthode appelée lors du changement du pays destination
CCtrlEcoCalculateur.prototype.onDestinationCountryChange = function(idCountry)
{
	this.selectedRelation.onDestinationCountryChange(idCountry);
	if (idCountry == 0)
	{
		document.getElementById('ecocalculateur_input_destination_zip_component').disabled = true;
	}
	else
	{
		document.getElementById('ecocalculateur_input_destination_zip_component').disabled = false;
	}
};

//	Méthode appelée lors du changement du code zip origine
CCtrlEcoCalculateur.prototype.onOriginZipChange = function(zip)
{
	document.getElementById('ecocalculateur_input_origin_zip_component').className = '';
	this.selectedRelation.onOriginZipChange(zip);
};

//	Méthode appelée lors du changement du code zip destination
CCtrlEcoCalculateur.prototype.onDestinationZipChange = function(zip)
{
	document.getElementById('ecocalculateur_input_destination_zip_component').className = '';
	this.selectedRelation.onDestinationZipChange(zip);
};

//	Méthode appelée lors du changement de la plateforme origine
CCtrlEcoCalculateur.prototype.onOriginPlateformeChange = function(idPlateforme)
{
	document.getElementById('ecocalculateur_input_origin_plateforme').className = '';
	this.selectedRelation.onOriginPlateformeChange(idPlateforme);
};

//	Méthode appelée lors du changement de la plateforme destination
CCtrlEcoCalculateur.prototype.onDestinationPlateformeChange = function(idPlateforme)
{
	document.getElementById('ecocalculateur_input_destination_plateforme').className = '';
	this.selectedRelation.onDestinationPlateformeChange(idPlateforme);
};

//	Méthode appelée lors du click sur le bouton calculer
CCtrlEcoCalculateur.prototype.onCalculateClick = function()
{
	this.selectedRelation.calculate();
};

//	Méthode appelée lors du changement du nombre d'UTI 20p
CCtrlEcoCalculateur.prototype.on20pChange = function(nbUTI)
{
	document.getElementById('ecocalculateur_input_goods_20p_component').className = 'ecocalculateur_input_goods_component';
	document.getElementById('ecocalculateur_input_goods_30p_component').className = 'ecocalculateur_input_goods_component';
	document.getElementById('ecocalculateur_input_goods_40p_component').className = 'ecocalculateur_input_goods_component';
	
	var nbUTIValidated = parseInt(nbUTI);
	if (isNaN(nbUTIValidated))
		nbUTIValidated = 0;
	if (nbUTIValidated < 0)
		nbUTIValidated = 0;
	
	document.getElementById('ecocalculateur_input_goods_20p_component').value = nbUTIValidated;
	
	this.selectedRelation.on20pChange(nbUTIValidated);
};

//	Méthode appelée lors du changement du nombre d'UTI 30p
CCtrlEcoCalculateur.prototype.on30pChange = function(nbUTI)
{
	document.getElementById('ecocalculateur_input_goods_20p_component').className = 'ecocalculateur_input_goods_component';
	document.getElementById('ecocalculateur_input_goods_30p_component').className = 'ecocalculateur_input_goods_component';
	document.getElementById('ecocalculateur_input_goods_40p_component').className = 'ecocalculateur_input_goods_component';
	
	var nbUTIValidated = parseInt(nbUTI);
	if (isNaN(nbUTIValidated))
		nbUTIValidated = 0;
	if (nbUTIValidated < 0)
		nbUTIValidated = 0;
	
	document.getElementById('ecocalculateur_input_goods_30p_component').value = nbUTIValidated;
	
	this.selectedRelation.on30pChange(nbUTIValidated);
};

//	Méthode appelée lors du changement du nombre d'UTI 40p
CCtrlEcoCalculateur.prototype.on40pChange = function(nbUTI)
{
	document.getElementById('ecocalculateur_input_goods_20p_component').className = 'ecocalculateur_input_goods_component';
	document.getElementById('ecocalculateur_input_goods_30p_component').className = 'ecocalculateur_input_goods_component';
	document.getElementById('ecocalculateur_input_goods_40p_component').className = 'ecocalculateur_input_goods_component';
	
	var nbUTIValidated = parseInt(nbUTI);
	if (isNaN(nbUTIValidated))
		nbUTIValidated = 0;
	if (nbUTIValidated < 0)
		nbUTIValidated = 0;
	
	document.getElementById('ecocalculateur_input_goods_40p_component').value = nbUTIValidated;
	
	this.selectedRelation.on40pChange(nbUTIValidated);
};

//	Méthode appelée lorsque l'itinéraire saisi par l'utilisateur n'est pas réalisable
CCtrlEcoCalculateur.prototype.displayRouteError = function()
{
	$('#ecocalculateur_popup_error_route').dialog('open');
};

//	Méthode appelée lorsque les données saisies ne permettent pas de réaliser le calcul environnemental
CCtrlEcoCalculateur.prototype.displayECTWError = function()
{
	$('#ecocalculateur_popup_error_wsclienv').dialog('open');
	if (this.selectedRelation.selectedOriginZip != '')
	{
		document.getElementById('ecocalculateur_input_origin_zip_component').className = 'error';
	}
	if (this.selectedRelation.selectedDestinationZip != '')
	{
		document.getElementById('ecocalculateur_input_destination_zip_component').className = 'error';
	}
};

//	Méthode appelée lors du changement de l'état aller-retour
CCtrlEcoCalculateur.prototype.onWayBackTripChange = function(state)
{
	this.selectedRelation.onWayBackTripChange(state);
};

//	Méthode appelée lors du changement de l'état trajet vide
CCtrlEcoCalculateur.prototype.onEmptyTripChange = function(state)
{
	this.selectedRelation.onEmptyTripChange(state);
};

//	Méthode appelée lors du click sur l'indicateur NRJ
CCtrlEcoCalculateur.prototype.onScopeNRJClick = function()
{
	this.selectedRelation.onScopeNRJClick();
};

//	Méthode appelée lors du click sur l'indicateur CO2
CCtrlEcoCalculateur.prototype.onScopeCO2Click = function()
{
	this.selectedRelation.onScopeCO2Click();
};

//	Méthode appelée lors du click sur le bouton de RAZ du formulaire de saisie
CCtrlEcoCalculateur.prototype.onClearInputsClick = function()
{
	this.selectedRelation.clearInputs();
};

//	Méthode retournant le composant gérant le reporting global
CCtrlEcoCalculateur.prototype.getGlobalReporting = function()
{
	return this.globalReporting;
};

//	Méthode appelée lors du click sur l'indicateur energie de l'onglet "Global"
CCtrlEcoCalculateur.prototype.onGlobalScopeNRJClick = function()
{
	this.globalReporting.onScopeNRJClick();
};

//	Méthode appelée lors du click sur l'indicateur CO2 de l'onglet "Global"
CCtrlEcoCalculateur.prototype.onGlobalScopeCO2Click = function()
{
	this.globalReporting.onScopeCO2Click();
};

//	Méthode appelée lors du click sur le bouton "réinitialiser" de l'onglet "Global"
CCtrlEcoCalculateur.prototype.onGlobalClearInputsClick = function()
{
	$('#ecocalculateur_extratab_calcul_02').addClass('hide');
	$('#ecocalculateur_extratab_calcul_03').addClass('hide');
	$('#ecocalculateur_extratab_calcul_04').addClass('hide');
			
	var oldNbRelation = this.nbRelation;
	this.globalReporting.destroy();
	for (var i = 0 ; i < this.nbRelation ; i++)
	{
		this.relations[i].destroy();
	}
	
	this.relations = new Array();
	this.nbRelation = 0;
	
	var relation = new CRelation();
	relation.setId(0);
	this.relations.push(relation);
	relation.initialisation();
	this.nbRelation++;
	this.iSelectedTab = -1;
	this.selectedRelation = relation;
	
	this.globalReporting = new CGlobalReporting();
	
	$('#ecocalculateur_tab_container').tabs({ selected: 0 });
	for (var i = 1 ; i < oldNbRelation ; i++)
	{
		$("#ecocalculateur_tab_container").tabs('disable', i);
	}
	
	/*var tabContainer = document.getElementById('ecocalculateur_tab_container_ul');
	var tab = tabContainer.firstChild;
	while (tab.id != 'ecocalculateur_tab_global')
	{
		tabContainer.removeChild(tab);
		tab = tabContainer.firstChild;
	}
	var HTMLli = document.createElement('LI');
	var HTMLa = document.createElement('A');
	HTMLa.href = '#ecocalculateur_input_tab';
	HTMLa.id = 'ecocalculateur_input_tab_0';
	HTMLli.appendChild(HTMLa);
	tabContainer.insertBefore(HTMLli, document.getElementById('ecocalculateur_tab_global'));
	
	$('#ecocalculateur_tab_container').tabs('refresh');
	$('#ecocalculateur_tab_container').tabs({ selected: 0 });
	this.onTabChange(0);*/
};