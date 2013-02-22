<?php

class Carburant_Controller_Plugin_LangSelector extends Zend_Controller_Plugin_Abstract
{

	public function dispatchLoopStartup(Zend_Controller_Request_Abstract $request)
	{
		
		$front = Zend_Controller_Front::getInstance();
		
		$translate = $front->getParam('bootstrap')->getResource('translate');
		$locale = $front->getParam('bootstrap')->getResource('locale');

		switch($locale) {
			case 'zh_CN' : $lang = 'en'; break;
			case 'en_US' : $lang = 'en'; break;
			case 'fr_FR' : $lang = 'fr'; break;
			default : $lang = 'fr'; break;
		}
		
		if($translate->isAvailable($lang)) {
			$translate->setLocale($lang);
		} else {
			$translate->setLocale('fr');
		}

    }

}