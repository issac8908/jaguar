<?php

class Bootstrap extends Zend_Application_Bootstrap_Bootstrap
{
	
	protected function _initAutoload()
	{
		$autoloader = Zend_Loader_Autoloader::getInstance();
		$autoloader->setFallbackAutoloader(true);
                return $autoloader;
	}
	
	/**
	 * Initialize session
	 * 
	 */
	protected function _initSessionNamespaces()
	{
		$this->bootstrap('session');
		$params = $this->getOption('resources');
		$namespace = new Zend_Session_Namespace($params['session']['name']);
		Zend_Registry::set('session', $namespace);
	}
        
        /**
         * Init group code
         */
        public function _initGroupCode()
        {
                Zend_Registry::set('group-one', 'GR0001');
                Zend_Registry::set('group-two', 'GR0002');
                Zend_Registry::set('group-three', 'GR0003');
        }
	
	/**
	 * Permet de charger les plugins
	 * 
	 * @return void
	 */
	protected function _initLoadPlugins()
	{
		$front = Zend_Controller_Front::getInstance();
		$front->registerPlugin(new Carburant_Controller_Plugin_LoadLayout());
		$front->registerPlugin(new Carburant_Controller_Plugin_LangSelector());
                $front->registerPlugin(new Carburant_Controller_Plugin_UserLogged());
                
	}
        
        
        
}

