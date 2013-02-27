<?php

class UsersController extends Zend_Controller_Action
{
	
	/**
	 * Requqest HTTP
	 * @var Zend_Controller_Request_Http
	 */
	protected $_request = null;
	
	/**
	 * Initialize controller
	 * 
	 * @return void
	 */
	public function init()
	{
		$this->_request = $this->getRequest();
		//$this->_helper->getHelper('layout')->disableLayout();
	}
	
        /** 
         * A logged-in user's index page
         */
        public function indexAction()
        {
                $users_table = new Model_DbTable_Users();
                
                $auth = Zend_Auth::getInstance();
                
                $this->view->user = $users_table->getUserByEmail($auth->getIdentity()->email);
        }
            
	/**
	 * Login Action
	 * 
	 * @return void
	 */
	public function loginAction()
	{
            
                $form = new Form_User_Login(array('method' => 'post'));
                
                if ($this->getRequest()->isPost()) {
                    
                    if ($form->isValid($this->_request->getPost())) {
                        
                        $this->_authenticate($form);
                        
                    } else {
                        $this->view->errors = $form->getErrors();
                    }
                }
                
                $this->view->loginForm = $form;
	
                $this->renderScript('index/index.phtml');
	}
        
        /**
	 * Logout user
	 * 
	 * @return void
	 */
	public function logoutAction()
	{
		$this->_helper->viewRenderer->setNoRender();
		
		Zend_Auth::getInstance()->clearIdentity();
		$this->_helper->redirector('index', 'index');
	}
        
        
        private function _authenticate($form)
        {
                $db = Zend_Db_Table::getDefaultAdapter();
                    $authAdapter = new Zend_Auth_Adapter_DbTable($db);

                    $authAdapter->setTableName('user');
                    $authAdapter->setIdentityColumn('email');
                    $authAdapter->setCredentialColumn('password');
                    $authAdapter->setCredentialTreatment('MD5(?)');

                    $authAdapter->setIdentity($form->getValue('email'));
                    $authAdapter->setCredential($form->getValue('password'));

                    $auth = Zend_Auth::getInstance();
                    $result = $auth->authenticate($authAdapter);

                    // Did the user successfully login?
                    if ($result->isValid()) {

                        $user_table = new Model_DbTable_Users();

                        $user = $user_table->getUserByEmail($form->getValue('email'));

                        $user->last_login_ts = date('Y-m-d H:i:s');

                        $user->save();

                        $storage = $auth->getStorage();
                        $storage->write($authAdapter->getResultRowObject(array('uid', 'first_name', 'last_name', 'email', 'last_login_ts')));

                        Zend_Session::rememberMe(1209600);

                        $this->_helper->flashMessenger->addMessage('You are logged in');
                        $this->_helper->redirector('index', 'index');

                    } else {
                        $this->view->error['form'] = array('Login failed');
                    }
        }
	
	/**
	 * Validate user process action
	 *
	 * @return JSON
	 */
	public function userAction()
	{
		$this->_helper->viewRenderer->setNoRender();
		
		if($this->_request->isXmlHttpRequest()) {
			
			$loginForm = $this->_getLoginForm();
			$data = $this->_request->getPost();
			$loginResult = $loginForm->processAjax($data);
			
			if(Zend_Json::decode($loginResult) === true) {
				$data['password'] = $data['password'];
				if($this->_authenticate($data)) {
					$this->_helper->json->sendJson(true);
				} else {
					$this->_helper->json->sendJson(array(
						'email_addr' => array('wrongEmail' => 'L\'adresse e-mail n\'est pas valide.'),
						'password' =>  array('wrongPassword' => 'Le mot de passe n\'est pas correct')
					));
				}
			} else {
				echo $loginResult;
			}
		}
	}
	
	/**
	 * Register Action
	 *
	 * @return void
	 */
	public function registerAction()
	{
                
		// Instantiate the registration form model
                $form = new Form_User_StepOne();
                $stepTwoForm = new Form_User_StepTwo();
                $stepThreeForm = new Form_User_StepThree();
                
                // Has the form ben submitted?
                if ($this->getRequest()->isPost()) {
                    
                    $data = $this->_request->getPost();
                    
                    // If the form data is valid, process it
                    if ($form->isValid($this->_request->getPost())) {
                        
                        // Does account associated with username exist?
                        // But this step should have been validated earlier
                        
                        try {
                            $user_table = new Model_DbTable_Users();
                            unset($data['confirm_password']);
                            unset($data['confirm_email']);
                            $data['password'] = md5($data['password']);
                            $user_table->addUser($data);
                            
                            // Authenticate user
                            $this->_authenticate($form);

                            // Create a new mail object
                            $mail = new Zend_Mail();

                            // Set the email from address, to address, and subject
                            $mail->setFrom(Zend_Registry::get('config')->email->support);
                            $mail->addTo($form->getValue('email'), "{$form->getValue('first_name')}");
                            $mail->setSubject('JAGUAR E-REGISTRATION');

                            // Retrieve the e-mail message text
                            //include '_email_confirm_email_address.phtml';

                            // Set the email message text
                            $mail->setBodyText($form->getValue('email'));

                            // Send the email
                            $mail->send();

                            // Set the flash message
                            $this->_helper->flashMessenger->addMessage(Zend_Registry::get('config')->messages->register->successful);

                            // Redirect the user to the homepage
                            $this->_helper->redirector('login', 'user');
                        
                        } catch (Exception $e) {
                            $this->view->errors = array(
                                array("There was a problem creating your account")
                            );
                        }
                        
                    } else {
                        
                        $form->populate($_REQUEST);
                      //  $this->view->errors = array(
                      //      array("The email address already exists.")
                      //  );
                    }
                
                } else {
                    $this->view->errors = $form->getErrors();
                }
                
                $this->view->stepOneForm = $form;
                $this->view->stepTwoForm = $stepTwoForm;
		$this->view->stepThreeForm = $stepThreeForm;
	}
	
        
        public function validateStepOneAction()
        {
                /* disable auto rendering */
                $this->_helper->getHelper('layout')->disableLayout();
                $this->_helper->viewRenderer->setNoRender();
                
                if ($this->_request->isXmlHttpRequest()) {
                        
                    $data = $this->_request->getPost();
                    $form = new Form_User_StepOne();
                    
                    if ($form->isValidPartial($data))  
                        echo json_encode(array('success' => true));
                    else 
                        echo $form->processAjax($data);
                }
        }
	
	
	
        /**
         * Get a login form.
         *
         * @return Zend_Form
         */
        private function _getLoginForm()
        {
            $loginForm = new Form_User_Login(array('method' => 'post'));
            $this->view->loginForm = $loginForm;
            return $loginForm;
        }
}

