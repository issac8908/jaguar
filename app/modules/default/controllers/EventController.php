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
            
            $survey_form = new Form_Survey();
            
            if ($this->_request->isPost()) {
                $auth = Zend_Auth::getInstance();
                $uid = $auth->getIdentity()->uid;
                
                $data = $this->_request->getPost();
                $data['uid'] = $uid;
                
                if ($data['s6_19_topic']) {
                    $survey_form->getElement('s6_19_other')->setRequired(true);
                }
                
                if (isset($data['s11_advice'])) {
                    if ($data['s11_advice'] == 'yes') {
                        $survey_form->getElement('s11_advice_details')->setRequired(true);
                    } else {
                        $data['s11_advice_details'] = '';
                    }
                } 
                
                if (isset($data['s12_expectations'])) {
                    if ($data['s12_expectations'] == 'yes') {
                        $survey_form->getElement('s12_expectation_details')->setRequired(true); 
                    } else {
                        $data['s12_expectation_details'] = '';
                    }
                }
                
                if ($survey_form->isValid($data)) {
                    $result = $survey_table->addSurvey($data);
                    if ($result) {
                        $this->_helper->flashMessenger->addMessage(
                                Zend_Registry::get('Zend_Translate')->translate('thanks_for_submitting_survey'));
                        $this->_helper->redirector('photowall', 'event');
                    }
                } else {
                    $survey_form->populate($data);
                }
            }
            
            $this->view->survey_form = $survey_form;
            
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

