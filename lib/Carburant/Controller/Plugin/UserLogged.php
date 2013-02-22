<?php

class Carburant_Controller_Plugin_UserLogged extends Zend_Controller_Plugin_Abstract
{
    public function preDispatch(Zend_Controller_Request_Abstract $request)
    {
        $module = $request->getModuleName();
        $controller = $request->getControllerName();
        
        $auth = Zend_Auth::getInstance();
        $layout = Zend_Layout::getMvcInstance();
        $view = $layout->getView();
        
        
        if($module == 'default') {      	
        	
        	if ($auth->hasIdentity() && isset($auth->getIdentity()->email)) { 	// Pue du cul, merci tchingtchong    
        		$view->email = $auth->getIdentity()->email; 
                        $view->isLogged = true;
        	} else {
                    /*
        		if($controller != 'login') {
        			$redirector = Zend_Controller_Action_HelperBroker::getStaticHelper('redirector');
        			$redirector->setGotoSimple('index', 'login', 'admin');
        		}
                     * 
                     */
        	}        	
        }        
    }
}
