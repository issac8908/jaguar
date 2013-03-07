<?php

class EventController extends Zend_Controller_Action
{
	
	public function init()
	{
            if (!$this->view->isLogged) {
                $this->_helper->redirector('index', 'index');
            }
	}
	
        /** 
         * A logged-in user's index page
         */
        public function indexAction()
        {
        }
  
        public function agendaAction()
        {
            $this->view->success_messages = $this->_helper->getHelper('FlashMessenger')->getMessages();
        }
        
        public function confAction()
        {
            
        }
        
        public function hospitalityAction()
        {
            
        }
        
        public function contactAction()
        {
            
        }
        
        public function venueAction()
        {
            
        }
}

