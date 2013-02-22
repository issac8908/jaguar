<?php

class PeopleController extends Zend_Controller_Action
{
    
    protected $_pplTable;

    public function init()
    {
    	$this->_helper->getHelper('layout')->disableLayout();
		$this->_pplTable = new Model_DbTable_People();
    }

    public function indexAction()
    {
        /* redirect user to login page if NOT logged in */
        $auth = Zend_Auth::getInstance();
        if (!$auth->hasIdentity())
            $this->_helper->redirector('login');

        /* redirect backend users to login page because his identity doesn't count */
        if ($this->_isLoggedInAsBackendUser())
            $this->_helper->redirector('login');
        
        $this->view->identity = $auth->getIdentity();
    }
    
    /**
     * user login
     */
    public function loginAction()
    {
        /* redirect to index page if logged in */
        if (Zend_Auth::getInstance()->hasIdentity()) {
            /* ignore backend users' identity because their identities do not count */
            if (!$this->_isLoggedInAsBackendUser()) {
                $this->_helper->redirector();
            }
        }
        $form = $this->_getForm();
    }
    
    public function loginUserAction() 
    {
        /* ajax request */
        if ($this->getRequest()->isXmlHttpRequest()) {
            $this->_helper->viewRenderer->setNoRender();
            
            $data = $this->_request->getPost();
            
            /* authenticate user */
            $this->_authenticateWebRegisteredUser($_POST);
            
            /* remember user */
            if ($data['remember_me']) {
                $seconds = 60 * 60 * 24 * 7; // 7 days
                Zend_Session::rememberMe($seconds);
            }
            echo json_encode(array('success'=>true));
        }
    }
    
    /** 
     * Login with facebook account  
     */
    public function fbloginAction() 
    {
        $this->_helper->getHelper('layout')->disableLayout();
        $this->_helper->viewRenderer->setNoRender();
        
        if ($this->getRequest()->isXmlHttpRequest()) {
            $data = $this->_request->getPost();
            $table = new Model_DbTable_People();
            if (!$table->validUser($data['email_addr'])) {
                if ($data['sex'] == 'male')
                    $data['sex'] = 'm';
                else
                    $data['sex'] = 'f';
                
                $table->registerUser($data);
            }
            /* auenticate user */
            if ($this->_authenticateFacebookUser($data)) {
                echo json_encode(array('success'=>1));
            } else {
                echo json_encode(array('success'=>0));
            }
        } else {
            // not ajax request, redirect user to HOME PAGE .....
            $this->redirect('/');
        }
    }
    
    public function logoutAction() {
        Zend_Auth::getInstance()->clearIdentity();
        $this->_redirect('/');
    }
        
    public function validateFormAction() {
        /* disable auto rendering */
        $this->_helper->getHelper('layout')->disableLayout();
        $this->_helper->viewRenderer->setNoRender();
        
        // is ajax request?
        if ($this->getRequest()->isXmlHttpRequest()) {
            echo $this->_getForm()->processAjax($_POST);
        }
    }
    
    /**
     * Check if the input city name is valid. return true or false.
     */
    public function validateCityAction() {
        /* disable auto rendering */
        $this->_helper->getHelper('layout')->disableLayout();
        $this->_helper->viewRenderer->setNoRender();
        
        // is ajax request?
        if ($this->getRequest()->isXmlHttpRequest()) {
            $table = new Model_DbTable_Cities();
            $city_id = $table->getCityIdByName($_POST['city_name']);
            echo json_encode(array('city_id' => $city_id));
        }
    }
    
    /**
     * Check if the input zip code is valid. \
     * @return boolean
     */
    public function validateZipcodeAction() {
        /* disable auto rendering */
        $this->_helper->getHelper('layout')->disableLayout();
        $this->_helper->viewRenderer->setNoRender();
        
        // is ajax request?
        if ($this->getRequest()->isXmlHttpRequest()) {
            $data = $this->_request->getPost();
            $table = new Model_DbTable_Cities();
            if ($table->getCityByZipcode($data['zip'])) 
                echo json_encode(array('success' => true));
            else 
                echo json_encode(array('success' => false));
        }
    }
    
    /**
     * Validate car brand
     */
    public function validatecarbrandAction() {
        /* disable auto rendering */
        $this->_helper->getHelper('layout')->disableLayout();
        $this->_helper->viewRenderer->setNoRender();
        
        // is ajax request?
        if ($this->getRequest()->isXmlHttpRequest()) {
            $table = new Model_DbTable_Cars();
            if ($table->isValidBrand($_POST['value'])) 
                echo json_encode(array('success' => 1));
            else 
                echo json_encode(array('success' => 0));
        }
    }
    
    /**
     * Validate car model
     */
    public function validatecarmodelAction() {
        /* disable auto rendering */
        $this->_helper->getHelper('layout')->disableLayout();
        $this->_helper->viewRenderer->setNoRender();
        
        // is ajax request?
        if ($this->getRequest()->isXmlHttpRequest()) {
            $table = new Model_DbTable_Cars();
            if ($table->isValidModel($_POST)) 
                echo json_encode(array('success' => 1));
            else 
                echo json_encode(array('success' => 0));
        }
    }
    
    /**
     * ajax request. check if the given email address exists 
     */
    public function isRegisteredEmailAction() {
        /* disable auto rendering */
        $this->_helper->getHelper('layout')->disableLayout();
        $this->_helper->viewRenderer->setNoRender();
        
        // is ajax request?
        if ($this->getRequest()->isXmlHttpRequest()) {
            $table = new Model_DbTable_People();
            if ($table->isExistingUser($_POST['email_addr'])) {
                echo json_encode(array('success' => 0));
            } else {
                echo json_encode(array('success' => 1));
            }
        }
    }
    
    public function getCitiesAction() {
        /* disable auto rendering */
        $this->_helper->getHelper('layout')->disableLayout();
        $this->_helper->viewRenderer->setNoRender();
        
        // is ajax request?
        if ($this->getRequest()->isXmlHttpRequest()) {
            $table_city = new Model_DbTable_Cities();
            echo json_encode($table_city->getCityNames($_POST['search']));
        }
    }
    
    /**
     * Get car brands
     */
    public function getCarBrandsAction() {
        /* disable auto rendering */
        $this->_helper->getHelper('layout')->disableLayout();
        $this->_helper->viewRenderer->setNoRender();
        
        // is ajax request?
        if ($this->getRequest()->isXmlHttpRequest()) {
            $carsTable = new Model_DbTable_Cars();
            echo json_encode($carsTable->getBrands($_POST['search']));
        }
    }
    
    /**
     * Get car models
     */
    public function getCarModelsAction() {
        /* disable auto rendering */
        $this->_helper->getHelper('layout')->disableLayout();
        $this->_helper->viewRenderer->setNoRender();
        
        // is ajax request?
        if ($this->getRequest()->isXmlHttpRequest()) {
            $carsTable = new Model_DbTable_Cars();
            echo json_encode($carsTable->getModels($_POST['brand']));
        }
    }
    
    /**
     * Register user via regular form post.
     */
    public function registerAction() {
        /* redirect to index page if logged in */
        $auth = Zend_Auth::getInstance();
        if ($auth->hasIdentity() && !$this->_isLoggedInAsBackendUser()) {
            $this->_helper->redirector();
        }

        $form = $this->_getForm();
        
        $table = new Model_DbTable_People();
        $question_table = new Model_DbTable_Questions();
        $answer_table = new Model_DbTable_Answers();
        $questions = $question_table->getQuestions();
        $answers = array();
        foreach ($questions as $q)
            $answers[$q->question_id] = $answer_table->getAnswersByQuestionId($q->question_id);
        
        if ($this->_request->isPost()) {
            $data = $this->_request->getPost();
            $qa_data = array();
            foreach ($answers as $row) {
                foreach($row as $col) {
                    if (isset($data['answer_id_' . $col['answer_id']])) {
                        if ($data['answer_id_' . $col['answer_id']]) {
                            $qa_data['answer_id_'.$col['answer_id']] = $data['answer_id_'.$col['answer_id']];
                        }
                        unset($data['answer_id_'.$col['answer_id']]);
                    }
                }
            }
            
            if ($form->isValid($data)) {
                /* Register user */
                unset($data['password2']);
                $people_id = $table->registerUser($data);
                
                $ppl_answers_table = new Model_DbTable_PeopleAnswers();
                foreach ($qa_data as $k => $v) {
                    $ppl_answers_table->savePeopleAnswer(array('people_id'=>$people_id, 'answer_id'=>substr($k, 10), 'context'=>$v));
                }
                
                /* authenticate user */
                $this->_authenticateWebRegisteredUser($data);
                
                /* send welcome email */
                $this->_sendWelcomeEmail($form);

                //$this->_redirect('/');
            } else {
                $form->populate($data);
            }
        } else {
            /* populate data from url */
            $params = $this->_request->getParams();
            $data = array();
            if (isset($params['fn']))
                $data['first_name'] = $params['fn'];
            if (isset($params['ln']))
                $data['last_name'] = $params['ln'];
            if (isset($params['email']))
                $data['email_addr'] = $params['email'];
            if (!empty($data)) 
                $form->populate($data);
        }

        $this->view->qa = $answers;
    }
    
    /**
     * Register user via ajax request. 
     */
    public function registerUserAction() {
        /* disable auto rendering */
        $this->_helper->getHelper('layout')->disableLayout();
        $this->_helper->viewRenderer->setNoRender();
        
        // is ajax request?
        if ($this->getRequest()->isXmlHttpRequest()) {
            $data = $this->_request->getPost();

            /* Register user */
            $people_id = $this->_pplTable->registerUser($data['people_data']);
            
            /* Subscribe to the newsletters */
            if ($data['people_data']['optin_newsletter']) {
                $newsletter_table = new Model_DbTable_Newsletter();
                $newsletter_table->subscribe($data['people_data']);
            }
            
            /* Save peple's answer for questions given at the end of the registration form */
            $ppl_answers_table = new Model_DbTable_PeopleAnswers();
            if (!empty($data['people_answer_data'])) {
                $ppl_answers_table->savePeopleAnswers($people_id, $data['people_answer_data']);
            }
            
            /* authenticate user */
            $this->_authenticateWebRegisteredUser($data['people_data']);
            
            /* send welcome email */
            $this->_sendWelcomeEmail($data['people_data']);
            
            echo Zend_Json::encode(array('people_id'=>$people_id));
        } 
    }
    
    /**
     * Get a people form object.
     * 
     * @return \Model_DbTable_People 
     */
    private function _getForm() {
        $form = new Form_People(array(
            'method' => 'post'
        ));
        $this->view->form = $form;
        return $form;
    }
    
    /**
     * Authenticate web-login user 
     * 
     * @param type $data
     * @return boolean
     */
    private function _authenticateWebRegisteredUser($data = array()) {
        /* Get zendDB & instantiate Auth adapters */
        $authAdapter = new Zend_Auth_Adapter_DbTable(null, $this->_pplTable->getTableName(), $this->_pplTable->getIdentityColumn(), $this->_pplTable->getCredentialColumn());

        /* set identity and credential*/
        $authAdapter->setIdentity($data['email_addr']);
        $authAdapter->setCredential(md5($data['password']));

        $result = $authAdapter->authenticate();
        if ($result->isValid()) {
            /* retrieve user info */
            $storage = Zend_Auth::getInstance()->getStorage();
            $storage->write($authAdapter->getResultRowObject(array('people_id', 'first_name', 'last_name', 'email_addr')));
            return true;
        } else {
            return false;
        }
    }
    
    /**
     * Authenticate facebook user. 
     * 
     * @param type $data
     * @return boolean
     */
    private function _authenticateFacebookUser($data = array()) {
        /* Get zendDB & instantiate Auth adapters */
        $table = new Model_DbTable_People();
        $authAdapter = new Zend_Auth_Adapter_DbTable(null, $table->getTableName(), 'email_addr', 'fb_id');
        
        /* set identity and credential */
        $authAdapter->setIdentity($data['email_addr']);
        $authAdapter->setCredential($data['fb_id']);
        
        $result = $authAdapter->authenticate();
        if ($result->isValid()) {
            /* retrieve user info */
            $storage = Zend_Auth::getInstance()->getStorage();
            $storage->write($authAdapter->getResultRowObject(array('people_id'. 'first_name', 'last_name', 'email_addr')));
            
            return true;
        } else {
            return false;
        } 
    }
    
    /**
     * Send welcome email to the new user. 
     * @param type $form
     */
    private function _sendWelcomeEmail($form) {
        /* Benjamin : doesn't work in my  local env, waiting that the customer ask it
    	set_time_limit(4000);
        $mailTransport = new Zend_Mail_Transport_Smtp('smtp.gmail.com', array('auth' => 'login', 'username' => 'dilin@carburant.fr', 'password' => 'dilin110', 'ssl' => 'ssl'));

        $mail = new Zend_Mail('utf-8');
        $mail->setBodyHtml('<p>' . $form['email_addr'] . ', thank you for registering with us');
        $mail->setSubject('welcome you');
        $mail->setFrom('dilin@carburant.fr', 'dilin@carburant.fr');
        $mail->addTo($form['email_addr'], $form['email_addr']);

        $mail->send($mailTransport);*/
    }

    
    /**
     * Does the current identity belong to a backend user? Return true or false
     *  
     * @return bool
     */
    private function _isLoggedInAsBackendUser() {
        $auth = Zend_Auth::getInstance();
        if ($auth->hasIdentity() && isset($auth->getIdentity()->user_id))
             return true;
        return false;
    }
}

