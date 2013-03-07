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

            if ($this->_getParam('code')) {
                $this->view->code = $this->_getParam('code');
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

