//	CWSManager
//	CWSManager gérant les communications avec la couche métier (Singleton)

function CWSManager()
{
}

/*********************************************************STATIQUE*************************************************************/
CWSManager.wsAddress = '';

CWSManager.setWSAddress = function(address)
{
	CWSManager.wsAddress = address;
};

/**********************************************************CHAMPS**************************************************************/
CWSManager.prototype.handlerInstance = null;
CWSManager.prototype.handlerMethod = '';

/*********************************************************METHODES*************************************************************/
//	Méthode permettant de récupérer un objet xmlHttpRequest.
CWSManager.prototype.getXMLHTTP = function()
{
	var xhr=null;
	
	if (window.XMLHttpRequest) // Firefox et autres
	{
		xhr = new XMLHttpRequest();
	}
	else if (window.ActiveXObject) // Internet Explorer
	{
		try
		{
			xhr = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (e)
		{
			try
			{
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (e1)
			{
				xhr = null;
			}
		}
	}
	else // XMLHttpRequest non supporté par le navigateur
	{
		alert("Votre navigateur ne supporte pas les objets XMLHTTPRequest...");
	}
	return xhr;
};

//	Méthode permettant d'envoyer une requête à la couche métier
CWSManager.prototype.sendRequest = function(controller, action, datas, handlerInstance, handlerMethod)
{
	var xhr = this.getXMLHTTP();
	xhr.onreadystatechange = function()
	{
		// On ne fait quelque chose que si on a tout reçu et que le serveur est ok
		if(xhr.readyState == 4 && xhr.status == 200)
		{
			var dataReceived = eval('(' + xhr.responseText + ')');
			handlerInstance[handlerMethod].call(handlerInstance, dataReceived);
		}
	}
	xhr.open("POST", CWSManager.wsAddress + controller + '/' + action, true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	
	//Préparation des données POST
	var first = true;
	var postData = '';
	if (datas != null)
	{
		for (data in datas)
		{
			if (!first)
			{
				postData += '&';
			}
			postData += data + '=' + datas[data];
			first = false;
		}
	}
	xhr.send(postData);
};

//	Méthode permettant de récupérer la liste des pays de pre/post acheminement
CWSManager.prototype.getPrePostCarriageCountry = function(handlerInstance, handlerMethod)
{
	this.handlerInstance = handlerInstance;
	this.handlerMethod = handlerMethod;
	this.sendRequest('eco-calculateur', 'get-pre-post-carriage-country', null, this, 'onGetPrePostCarriageCountryResult');
};
//	Callback
CWSManager.prototype.onGetPrePostCarriageCountryResult = function(data)
{
	var originCountry = new Array();
	var destinationCountry = new Array();
	var nbOriginCountry = data.preCarriageCountry.length;
	var nbDestinationCountry = data.postCarriageCountry.length;
	
	for (var i = 0 ; i < nbOriginCountry ; i++)
	{
		originCountry.push(this.instantiateCountry(data.preCarriageCountry[i]));
	}
	
	for (var i = 0 ; i < nbDestinationCountry ; i++)
	{
		destinationCountry.push(this.instantiateCountry(data.postCarriageCountry[i]));
	}
	
	this.handlerInstance[this.handlerMethod].call(this.handlerInstance, originCountry, destinationCountry);
};

//	Méthode permettant d'instancier la classe CCountry à partir des données reçues de la couche métier
CWSManager.prototype.instantiateCountry = function(data)
{
	return new CCountry(data.id, data.label)
};

//	Méthode permettant de récupérer la liste des gares origine d'acheminement principal
CWSManager.prototype.getMainCarriageOriginStation = function(handlerInstance, handlerMethod, idDestinationStation, idCountry, zipCode)
{
	var data = new Array();;
	
	this.handlerInstance = handlerInstance;
	this.handlerMethod = handlerMethod;
	
	if (idDestinationStation != null)
	{
		data['related_destination_station_id'] = idDestinationStation;
	}
	if (idCountry != null)
	{
		data['related_id_country'] = idCountry;
	}
	if (zipCode != null)
	{
		data['related_zip_code'] = zipCode;
	}
	
	this.sendRequest('eco-calculateur', 'get-main-carriage-origin-station', data, this, 'onGetMainCarriageOriginStationResult');
};
//	Callback
CWSManager.prototype.onGetMainCarriageOriginStationResult = function(data)
{
	if (data.state == 'OK')
	{
		var stations = new Array();
		var nbStations = data.stations.length;
		
		for (var i = 0 ; i < nbStations ; i++)
		{
			stations.push(this.instantiateStation(data.stations[i]));
		}
		
		this.handlerInstance[this.handlerMethod].call(this.handlerInstance, stations);
	}
	else
	{
		this.handlerInstance[this.handlerMethod].call(this.handlerInstance, new Array());
		CCtrlEcoCalculateur.getInstance().displayRouteError();
	}
};

//	Méthode permettant de récupérer la liste des gares destination d'acheminement principal
CWSManager.prototype.getMainCarriageDestinationStation = function(handlerInstance, handlerMethod, idOriginStation, idCountry, zipCode)
{
	var data = new Array();
	
	this.handlerInstance = handlerInstance;
	this.handlerMethod = handlerMethod;
	
	if (idOriginStation != null)
	{
		data['related_origin_station_id'] = idOriginStation;
	}
	if (idCountry != null)
	{
		data['related_id_country'] = idCountry;
	}
	if (zipCode != null)
	{
		data['related_zip_code'] = zipCode;
	}
	
	this.sendRequest('eco-calculateur', 'get-main-carriage-destination-station', data, this, 'onGetMainCarriageDestinationStationResult');
};
//	Callback
CWSManager.prototype.onGetMainCarriageDestinationStationResult = function(data)
{
	if (data.state == 'OK')
	{
		var stations = new Array();
		var nbStations = data.stations.length;
		
		for (var i = 0 ; i < nbStations ; i++)
		{
			stations.push(this.instantiateStation(data.stations[i]));
		}
		
		this.handlerInstance[this.handlerMethod].call(this.handlerInstance, stations);
	}
	else
	{
		this.handlerInstance[this.handlerMethod].call(this.handlerInstance, new Array());
		CCtrlEcoCalculateur.getInstance().displayRouteError();
	}
};

//	Méthode permettant d'instancier la classe CStation à partir des données reçues de la couche métier
CWSManager.prototype.instantiateStation = function(data)
{
	var station = new CStation(data.id, data.label);
	
	if (data.is_default == 0)
		station.setIsDefault(false);
	else
		station.setIsDefault(true);
	
	return station;
};

//	Méthode permettant de récupérer les informations environnementales d'une relation
CWSManager.prototype.getRelationEnvironmentalInformation = function(handlerInstance, handlerMethod, xmlRelation)
{
	var data = new Array();
	
	this.handlerInstance = handlerInstance;
	this.handlerMethod = handlerMethod;
	
	data['xml_relation'] = xmlRelation;
	
    $('#ecocalculateur_input_calculate_button_ajax_loader').show(); 
    
	this.sendRequest('eco-calculateur', 'get-relation-environmental-information', data, this, 'onGetRelationEnvironmentalInformation');
};
//	Callback
CWSManager.prototype.onGetRelationEnvironmentalInformation = function(data)
{
    $('#ecocalculateur_input_calculate_button_ajax_loader').hide();
    $('#ecocalculateur_input_title_3').hide();
    
	if (data.state == 'OK')
	{
		this.handlerInstance[this.handlerMethod].call(this.handlerInstance, this.instantiateEnvironmentalData(data));
	}
	else
	{
		CCtrlEcoCalculateur.getInstance().displayECTWError();
	}
};

//	Méthode permettant d'instancier la classe CEnvironmentalData à partir des données reçues de la couche métier
CWSManager.prototype.instantiateEnvironmentalData = function(data)
{
	var environmentalData = new CEnvironmentalData();
	environmentalData.setRoadGlobalData(Math.round(parseFloat(data.RoadGlobal.nrj)*10)/10, Math.round(parseFloat(data.RoadGlobal.co2)*100)/100);
	environmentalData.setNavilandGlobalData(Math.round(parseFloat(data.NavilandGlobal.nrj)*10)/10, Math.round(parseFloat(data.NavilandGlobal.co2)*100)/100, Math.round(parseFloat(data.NavilandGlobal.nrj_prepost)*10)/10, Math.round(parseFloat(data.NavilandGlobal.co2_prepost)*100)/100, Math.round(parseFloat(data.NavilandGlobal.nrj_main)*10)/10, Math.round(parseFloat(data.NavilandGlobal.co2_main)*100)/100);
	
	environmentalData.setRoadKPIUTIData(Math.round(parseFloat(data.RoadKPIUTI.nrj)*10)/10, Math.round(parseFloat(data.RoadKPIUTI.co2)*100)/100);
	environmentalData.setNavilandKPIUTIData(Math.round(parseFloat(data.NavilandKPIUTI.nrj)*10)/10, Math.round(parseFloat(data.NavilandKPIUTI.co2)*100)/100, Math.round(parseFloat(data.NavilandKPIUTI.nrj_prepost)*10)/10, Math.round(parseFloat(data.NavilandKPIUTI.co2_prepost)*100)/100, Math.round(parseFloat(data.NavilandKPIUTI.nrj_main)*10)/10, Math.round(parseFloat(data.NavilandKPIUTI.co2_main)*100)/100);
	
	environmentalData.setGapData(parseInt(data.Gap.nrj), parseInt(data.Gap.co2));
	return environmentalData;
};