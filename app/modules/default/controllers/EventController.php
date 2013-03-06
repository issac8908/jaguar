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

