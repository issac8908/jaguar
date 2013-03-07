<?php

class Carburant_Controller_Plugin_UserLogged extends Zend_Controller_Plugin_Abstract
{
    public function preDispatch(Zend_Controller_Request_Abstract $request)
    {
        $module = $request->getModuleName();
        $controller = $request->getControllerName();
        $action = $request->getActionName();
        
        $auth = Zend_Auth::getInstance();
        $layout = Zend_Layout::getMvcInstance();
        $view = $layout->getView();
        
        
        if($module == 'default') {      	
        	if ($controller == 'code') {
                    $request->setControllerName('index');
                    $request->setActionName('index');
                    $request->setParam('code', $action);
                }
        	if ($auth->hasIdentity() && isset($auth->getIdentity()->email)) { 	// Pue du cul, merci tchingtchong    
        		$view->email = $auth->getIdentity()->email; 
                        $view->isLogged = true;
        	} else {
                    /*
                        if($controller != 'index' && $controller != 'users' ) {
        			$redirector = Zend_Controller_Action_HelperBroker::getStaticHelper('redirector');
        			$redirector->setGotoSimple('index', 'index', 'default');
        		}
                     * 
                     */
        	}        	
        }        
    }
}
