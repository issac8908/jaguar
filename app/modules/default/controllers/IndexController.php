<?php

class IndexController extends Zend_Controller_Action
{	
	public function init()
	{	
	}
	
	public function indexAction()
	{
            $auth = Zend_Auth::getInstance();
            if ($auth->hasIdentity()) {
                $identity = $auth->getIdentity();
                if (isset($identity)) {
                    $this->_helper->redirector('agenda', 'event');
                }
            }

            //$code = substr(number_format(time() * rand(),0,'',''),0,10); 
            if ($this->_getParam('c')) {
                $this->view->code = $this->_getParam('c');
            } else {
                $this->view->code = '';
            }
            $loginForm = $this->_getLoginForm();
	}
        
        
	private function _getLoginForm()
        {
            $loginForm = new Form_User_Login(array('method' => 'post'));
            $this->view->loginForm = $loginForm;
            return $loginForm;
        }
	
}

