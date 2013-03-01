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
                        
                        try {
                            $user_table = new Model_DbTable_Users();
                            unset($data['confirm_password']);
                            unset($data['confirm_email']);
                            $data['password'] = md5($data['password']);
                            $user_table->addUser($data);
                            
                            // Authenticate user
                            $this->_authenticate($form);

                            // Send admin and the new user emails.
                            $this->_sendMail($data);

                            // Set the flash message
                            //$this->_helper->flashMessenger->addMessage(Zend_Registry::get('config')->messages->register->successful);

                            // Redirect the user to the homepage
                            $this->_helper->redirector('index', 'users');
                        
                        } catch (Exception $e) {
                            $this->view->errors = array(
                                array("There was a problem creating your account")
                            );
                        }
                        
                    } else {
                        $form->populate($_REQUEST);
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
	
	public function validateLoginAction()
        {
                $this->_helper->getHelper('layout')->disableLayout();
                $this->_helper->viewRenderer->setNoRender();
                
                if ($this->_request->isXmlHttpRequest()) {
                        
                    $data = $this->_request->getPost();
                    $form = new Form_User_Login();
                    
                    if ($form->isValid($data)) {  
                        if ($this->_authenticate($form)) {
                            //$this->_helper->redirector('index', 'index');
                            echo json_encode(array('success' => true));
                        } else {
                            echo json_encode(array(
                                'success' => false, 
                                'message' => 'We do not recognize your sign in information. Please try again. Please note the password field is case sensitive.'
                            ));
                        }
                    } else 
                        echo $form->processAjax($data);
                }
        }
	
        private function _getLoginForm()
        {
                $loginForm = new Form_User_Login(array('method' => 'post'));
                $this->view->loginForm = $loginForm;
                return $loginForm;
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
                        //$this->_helper->redirector('index', 'index');
                        return true;
                    } else {
                        //$this->view->error['form'] = array('Login failed');
                        return false;
                    }
        }
        
        private function _sendMail($data)
        {
                $this->view->data = $data;
		
                $config = array(
                    'ssl' => 'tls',
                    'port' => 587,
                    'auth' => 'login',
                    'username' => 'dilin@carburant.fr',
                    'password' => 'dilin110'
                );
                $transport = new Zend_Mail_Transport_Smtp('smtp.gmail.com', $config);
                Zend_Mail::setDefaultTransport($transport);
                
		$mailToAdmin = new Zend_Mail('utf-8');
		$mailToAdmin->addTo('commaille@gmail.com');
                $mailToAdmin->addBcc(array( 'dilin110@gmail.com'));
                $mailToAdmin->setFrom('registration@2013-jlrc-conference.com', '2013-jlrc-conference');
		$mailToAdmin->setSubject($data['first_name'] . ' ' . $data['last_name'] . ' Registered');
		$mailToAdmin->setBodyHtml($this->view->render('users/mail/new-user-admin-notice.phtml'));
		
                $mailToNewUser = new Zend_Mail('utf-8');
		$mailToNewUser->addTo($data['email']);
                $mailToNewUser->addBcc(array('commaille@gmail.com', 'dilin110@gmail.com'));
                $mailToNewUser->setFrom('registration@2013-jlrc-conference.com', '2013-jlrc-conference');
		$mailToNewUser->setSubject('Thank You for Registering at 2013-jlrc-conference.com');
		$mailToNewUser->setBodyHtml($this->view->render('users/mail/new-user.phtml'));
		
                if($mailToAdmin->send() && $mailToNewUser->send()) {
			return true;
		} else {
			return false;
		}
        }
}

