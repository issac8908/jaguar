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

            $code = $this->_request->getParam('code', '');
            
            
            $session = Zend_Registry::get('session');
            if (isset($session->code) && $session->code) {
                $code = $session->code;
            } else {
                $invitee_table = new Model_DbTable_Invitees();
                $invitee = $invitee_table->getInviteeByCodeNoJoin($code);
                if ($invitee) {
                    $session->code = $code;
                } else {
                    // invalid code
                    $code = '';
                }
            }
            
            $this->view->code = $code;
            
            $loginForm = $this->_getLoginForm();
	}
        
        
	private function _getLoginForm()
        {
            $loginForm = new Form_User_Login(array('method' => 'post'));
            $this->view->loginForm = $loginForm;
            return $loginForm;
        }
	
}

