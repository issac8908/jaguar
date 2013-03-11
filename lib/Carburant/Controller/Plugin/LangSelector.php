<?php

class Carburant_Controller_Plugin_LangSelector extends Zend_Controller_Plugin_Abstract
{

	public function dispatchLoopStartup(Zend_Controller_Request_Abstract $request)
	{
		 
                $lang = $param = $request->getParam('lang', '');
		$locale = new Zend_Locale();
                
                if ($lang == 'en') {
                    $locale->setLocale('en_US');
                } else if ($lang == 'zh') {
                    $locale->setLocale('zh_CN');
                } else {
                    
                    if (isset($_COOKIE['locale']) && Zend_Locale::isLocale($_COOKIE['locale'], true, false)) {
                        $locale->setLocale($_COOKIE['locale']);
                    } else if (isset($_SERVER["HTTP_ACCEPT_LANGUAGE"])) {
                        $brower_lang_arr = explode(',', $_SERVER["HTTP_ACCEPT_LANGUAGE"]);
                        $locale->setLocale($brower_lang_arr[0]);
                        $_COOKIE['locale'] = $brower_lang_arr[0];
                    }

                    if ($locale == 'en_US') {
			$lang = 'en';
                    } else { 
			$lang = 'zh';
                    }
                }
		
		$translate = new Zend_Translate('Array', APP_PATH . '/languages/'. $lang . '.php' , $lang);
		Zend_Registry::set('Zend_Translate', $translate);
                
                $translator = new Zend_Translate(
                    array(
                        'adapter' => 'array',
                        'content' => RESOURCES_LANGUAGES, 
                        'locale'  => $lang,
                        'scan' => Zend_Translate::LOCALE_DIRECTORY
                    )
                );
                Zend_Validate_Abstract::setDefaultTranslator($translator);

    }

}