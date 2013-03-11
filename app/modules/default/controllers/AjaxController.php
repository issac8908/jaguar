<?php

class AjaxController extends Zend_Controller_Action
{
    /**
     * Get http request
     * @var Zend_Controller_Request_Http
     */
    protected $_request = null;

    /**
     * Initialiaze controller
     * 
     * @return void
     */
    public function init()
    {
            $this->_helper->getHelper('layout')->disableLayout();
            $this->_helper->viewRenderer->setNoRender();

            $this->_request = $this->getRequest();

            if(!$this->_request->isXmlHttpRequest()) {
                    $this->_helper->json(array('error' => 500));
                    exit;
            }
    }

    /**
     * Default action
     * 
     * @return JSON
     */
    public function indexAction()
    {
            $this->_helper->viewRenderer->setNoRender();
            $this->_helper->json(array('error' => 500));
    }

    /**
     * Manages the action on facebook like on an article.
     * 
     * @return JSON
     */
    public function likeAction()
    {
            $this->_helper->viewRenderer->setNoRender();

            $postId = $this->_request->getParam('id', false);
            $remove = $this->_request->getParam('remove', false);

            if($postId) {

                    if($remove) {
                            // Not implemented yet
                            // Remove one like
                    } else {
                            $postcountTable = new Model_DbTable_Posts();
                            $count = $postcountTable->pushCount($postId);

                            if($count) {
                                    $this->_helper->json(array('total' => $count));
                                    exit;
                            }
                    }
            }

            $this->_helper->json(array('error' => 500));
    }

        
    public function validateCodeAction()
    {
                
        $code = $this->_request->getParam('code', false);

        if ($code) {
            $inviteeTable = new Model_DbTable_Invitees();
            
            $invitee = $inviteeTable->getInviteeByCodeNoJoin($code);
            if ($invitee) {
                $this->_saveRegistrationCodeAction($invitee->email, $code);
                $this->_helper->json(array('email' => $invitee->email));
            } else {
                $this->_helper->json(array('error' => 500));
            }
        } else {
            $this->_helper->json(array('error' => 500));
        }
        

    }
    
    private function _saveRegistrationCodeAction($email, $code)
    {
        $session = Zend_Registry::get('session');
		
        $session->email = $email;
        $session->code = $code;
    }
	
}