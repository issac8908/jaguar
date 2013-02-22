<?php

class Carburant_Controller_Plugin_LoadLayout extends Zend_Controller_Plugin_Abstract
{
    public function preDispatch(Zend_Controller_Request_Abstract $request)
    {
        $module = $request->getModuleName();
        $layout = Zend_Layout::getMvcInstance();
       
        $layoutsDir = $layout->getLayoutPath();
	
        if(file_exists($layoutsDir . DIRECTORY_SEPARATOR . $module . '.phtml')) {
            $layout->setLayout($module);
        } else {
            $layout->setLayout('default');
        }
    }
}
