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
                    $this->_helper->redirector('index', 'users');
                }
            }

            $loginForm = $this->_getLoginForm();
            $this->view->code = substr(number_format(time() * rand(),0,'',''),0,20);
	}

	private function _getLoginForm()
        {
            $loginForm = new Form_User_Login(array('method' => 'post'));
            $this->view->loginForm = $loginForm;
            return $loginForm;
        }
	
}

