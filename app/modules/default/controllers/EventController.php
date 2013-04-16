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
        
        public function surveyAction()
        {
            
            $survey_table = new Model_DbTable_Survey();
            
            $auth = Zend_Auth::getInstance();
            $survey = $survey_table->getSurvey($auth->getIdentity()->uid);
            if ($survey) {
                $this->view->surveySubmittedBefore = true;
            }
            
            if ($this->_request->isPost()) {
                $auth = Zend_Auth::getInstance();
                $uid = $auth->getIdentity()->uid;
                
                $data = $this->_request->getPost();
                $data['uid'] = $uid;
                
                $result = $survey_table->addSurvey($data);
                if ($result) {
                    $this->_helper->flashMessenger->addMessage('Thanks for submitting your survey.');
                    $this->_helper->redirector('photowall', 'event');
                }
            }
            
            
            $this->view->survey_form = new Form_Survey();
        }
        
        
        public function photowallAction()
        {
            $tab = $this->_request->getParam('tab', false);
            
            if ($tab == null || $tab == 'conference') {
                $tab = 'conference';
                $this->view->thumbs = glob(APP_PATH . '/../medias/uploads/conference/thumbs/*');
                $this->view->isConferenceSelected = true;
            } else if ($tab == 'dinner') {
                $this->view->thumbs = glob(APP_PATH . '/../medias/uploads/dinner/thumbs/*');
                $this->view->isDinnerSelected = true;
            } else if ($tab == 'awards') {
                $this->view->thumbs = glob(APP_PATH . '/../medias/uploads/awards/thumbs/*');
                $this->view->isAwardsSelected = true;
            }
            
            $this->view->tab = $tab;
            $this->view->success_messages = $this->_helper->getHelper('FlashMessenger')->getMessages();
        }
        
        
}

