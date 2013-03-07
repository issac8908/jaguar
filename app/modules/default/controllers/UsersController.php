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
                $this->table = new Model_DbTable_Users();
                $this->config = array(
                    'ssl' => 'ssl',
                    'port' => 465,
                    'auth' => 'login',
                    'username' => 'registration@2013-jlrc-conference.com',
                    'password' => 'jlrc0nf2013',
                );;
                $transport = new Zend_Mail_Transport_Smtp('mail.gandi.net', $this->config);
                Zend_Mail::setDefaultTransport($transport);
                
                $this->translate = Zend_Registry::get('Zend_Translate');
                
	}
	
        /** 
         * A logged-in user's index page
         */
        public function indexAction()
        {
                $users_table = new Model_DbTable_Users();
                
                $auth = Zend_Auth::getInstance();
                if (!$auth->hasIdentity()) {
                    $this->_helper->redirector('login', 'users');
                }
                
                if ($auth->getIdentity()->email) {
                    $this->view->user = $users_table->getUserByEmailUsingSQL($auth->getIdentity()->email);
                    //$this->view->form = $users_table->getUserByEmail($auth->getIdentity()->email);
                } else {
                }
         }
            
	/**
	 * Login Action
	 * 
	 * @return void
	 */
	public function loginAction()
	{
                $this->_helper->redirector('index', 'index');
	}
        
        public function forgotPwdAction()
        {
                $forgotPasswordForm = $this->_getForgotPasswordForm();
        }
        
        public function resetPasswordAction() 
        {
                
            
                // check parameters are valid; 
                $email = $this->_request->getParam('email');
                $token = $this->_request->getParam('token');
                
                if ($email && $token) {
                    
                    $user_temp_login_table = new Model_DbTable_UserTempLogins();
                    $temp_login = $user_temp_login_table->getTempLogin(array('email'=>$email, 'password' => md5($token)));
                    
                    if ($temp_login) {
                        $valid_timestamp = strtotime("+1 day", strtotime($temp_login['create_ts']));
                        if ($valid_timestamp > strtotime("now")) {
                            
                            
                            // valid token and valid session, show reset-password form 
                            $resetPasswordForm = new Form_User_ResetPassword();
                            $resetPasswordForm->populate(array('uid' => $temp_login['uid']));
                            $this->view->resetPasswordForm = $resetPasswordForm;
                            
                        } else {
                            // expired token, remove it.
                            $this->_helper->redirector('index', 'index');
                        }
                    } else {
                        // false url 
                        $this->_helper->redirector('index', 'index');
                    }
                        
                } else {
                    $this->_helper->redirector('index', 'index');
                }
                
        }
        
        public function processResetPasswordAction()
        {
                
                  if ($this->_request->isPost()) {   
                      
                    $data = $this->_request->getPost();
                    
                    $row_updated = $this->table->updateUserProfile($data['uid'], array('password' => md5($data['password'])));
                    $user = $this->table->getUserByIdNoJoin($data['uid']);
                    // user profile successfully updated
                    if ($row_updated) {
                        
                        // remove temp login
                        $temp_login_table = new Model_DbTable_UserTempLogins();
                        $temp_login_table->deleteTempLogin($user->uid);
                        
                    } else {
                        // the new password identical to the old one.
                    }
                    $this->_authenticate(array('email'=>$user->email, 'password' => $data['password']));
                    $this->_helper->flashMessenger->addMessage('You have successfully reset your JLR account password! Thank you.');
                    return $this->_helper->redirector('agenda', 'event');
                }
        }
                
        
        
        /**
	 * Logout user
	 * 
	 * @return void
	 */
	public function logoutAction()
	{
		$this->_helper->viewRenderer->setNoRender();
		
                $session = Zend_Registry::get('session');
                $session->email = false;
                
                
		Zend_Auth::getInstance()->clearIdentity();
		$this->_helper->redirector('index', 'index');
	}
        
        
        public function editAction()
        {
                
                $form = new Form_User_User(array('method' => 'post'));
                
                    if ($this->getRequest()->isPost()) {
                    
                        $data = $this->_request->getPost();
                        $data['is_attending'] = 1;
                        unset($data['submit']);
                        
                        if ($form->isValid($data)) {
                            if ($data['position'] == 'manager') {
                                $data['group_name'] = '';
                                $data['group_title'] = '';
                                $data['company_name'] = '';
                                $data['company_title'] = '';
                            } else if ($data['position'] == 'group_head') {
                                $data['dms_code'] = '';
                                $data['company_name'] = '';
                                $data['company_title'] = '';
                            } else {
                                $data['group_name'] = '';
                                $data['group_title'] = '';
                                $data['dms_code'] = '';
                            }
                            $data['password'] = md5($data['password']);
                            $this->table->updateUserProfile($data['uid'], $data);
                            $this->_authenticate($data);
                            // Nofity admin the changes of the user profile.
                            $this->_notifyAdminUserProfileUpdated($data);
                            $this->_redirect('/event/agenda');
                        } else {
                            $this->view->errors = $form->getErrors();
                            $form->populate($data);
                        }
                        
                    } else {
                        
                        $id = $this->_request->getParam('id');
                        $data = $this->table->getUserById($id)->toArray();
                        // format time
                        $arrival_time = $data['arrival_time'];
                        $departure_time = $data['departure_time'];
                        $data['arrival_time'] = date ('H:i',strtotime($arrival_time));
                        $data['departure_time'] = date('H:i', strtotime($departure_time));
                        $form->populate($data);
                    }
                
                    $this->view->form = $form;
        }
	
	
	/**
	 * Register Action
	 *
	 * @return void
	 */
	public function registerAction()
	{
                // if logged in, redirect to agenda page
                if ($this->view->isLogged) 
                    $this->_helper->redirector('index', 'users');
                
                // if no email saved, redirect to login page 
                $session = Zend_Registry::get('session');
                if (!$session->email)
                    $this->_helper->redirector('index', 'index');
                    
                // Instantiate the registration form model
                $form = new Form_User_StepOne();
                $stepTwoForm = new Form_User_StepTwo();
                $stepThreeForm = new Form_User_StepThree();
                
                // passing email to form
                $form->populate(array('email'=>$session->email));
                
                // Has the form ben submitted?
                if ($this->getRequest()->isPost()) {
                    
                    $data = $this->_request->getPost();
                    $data['email'] = $session->email;
                    
                    // If the form data is valid, process it
                    if ($form->isValid($data)) {
                        
                        try {
                            
                            
                            $user_table = new Model_DbTable_Users();
                            unset($data['confirm_password']);
                            $password = $data['password'];
                            $data['password'] = md5($data['password']);
                            
                            $user = $user_table->addDataAndGetUser($data);
                            
                            // Authenticate user
                            //$this->_authenticate($form);
                            $this->_authenticate(array('email'=>$data['email'], 'password'=>$password));
                            
                            $data = $user->toArray();
                            $data['password'] = $password;
 
                            // Send admin and the new user emails.
                            $this->_sendMail($data);

                            // Set the flash message
                            $this->_helper->flashMessenger->addMessage($this->translate->translate('registered_successfully_msg_1') . $this->translate->translate('registered_successfully_msg_2'));

                            // Redirect the user to the homepage
                            $this->_helper->redirector('agenda', 'event');
                        
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
	
        
        public function validateEmailAction()
        {
                $this->_helper->getHelper('layout')->disableLayout();
                $this->_helper->viewRenderer->setNoRender();
             
                if ($this->_request->isXmlHttpRequest()) {
                    $data = $this->_request->getPost();
                   
                    $user = $this->table->getUserByEmailExcludeUid(array(
                        'email'=>$data['email'], 
                        'uid'=>$data['uid']
                    ));
                    
                    if ($user)
                        echo json_encode(array('success' => false));
                    else 
                        echo json_encode(array('success' => true));
                }
        }
        
        public function validateExistingEmailAction()
        {
                $this->_helper->getHelper('layout')->disableLayout();
                $this->_helper->viewRenderer->setNoRender();
             
                if ($this->_request->isXmlHttpRequest()) {
                    $form = $this->_getForgotPasswordForm();
                    $data = $this->_request->getPost();
                   
                    if ($form->isValid($data)) {
                        
                            $user = $this->table->getUserByEmail($data['email']);
                            
                            if ($user) {
                                $password = substr(md5(mt_rand().microtime()), 0, 10);
                                
                                $tempLoginTable = new Model_DbTable_UserTempLogins();
                                $tempLoginTable->addTempLogin(array(
                                    'uid' => $user['uid'],
                                    'password' => md5($password)
                                ));
                                //$this->table->updateUserByEmail(array('password' => md5($password)), $data['email']);
                                $user['password'] = $password;
                                $this->_sendResetAccountEmail(array(
                                    'first_name' => $user['first_name'], 
                                    'last_name' => $user['last_name'],
                                    'temp_password' => $password,
                                    'email' => $user['email']));

                                echo json_encode(array('success' => true));

                            } else {
                                echo json_encode(array('success' => false));
                            }
                    } else {
                        echo $form->processAjax($data);
                    }
                   
                }
        }
        
        public function validatePasswordAction()
        {
                $this->_helper->getHelper('layout')->disableLayout();
                $this->_helper->viewRenderer->setNoRender();
                
                if ($this->_request->isXmlHttpRequest()) {
                    
                    $data = $this->_request->getPost();
                    $form = new Form_User_ResetPassword();
                    
                    if ($form->isValid($data)) {
                        echo json_encode(array('success' => true));
                    } else {
                        echo $form->processAjax($data);
                    }
                }
        }
        
        
        public function validateProfileAction()
        {
                $this->_helper->getHelper('layout')->disableLayout();
                $this->_helper->viewRenderer->setNoRender();
             
                if ($this->_request->isXmlHttpRequest()) {
                    $data = $this->_request->getPost();
                    $form = new Form_User_User();
                    
                    if ($form->isValid($data))  
                        echo json_encode(array('success' => true));
                    else 
                        echo $form->processAjax($data);
                }
        }
        
        public function validateStepOneAction()
        {
                $this->_helper->getHelper('layout')->disableLayout();
                $this->_helper->viewRenderer->setNoRender();
                
                if ($this->_request->isXmlHttpRequest()) {
                        
                    $data = $this->_request->getPost();
                    $form = new Form_User_StepOne();
                    
                    if ($form->isValid($data))  
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
                        if ($this->_authenticate($data)) {
                            $this->_helper->getHelper('FlashMessenger')->addMessage('You have successfully logged in.');
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
        
        private function _getForgotPasswordForm()
        {
                $forgotPasswordForm = new Form_User_ForgotPassword(array('method' => 'post'));
                $this->view->forgotPasswordForm = $forgotPasswordForm;
                return $forgotPasswordForm;
        }
        
        private function _saveRegistrationCodeAction($code)
        {
                $session = Zend_Registry::get('session');
		
                $session->code = $code;
        }
        
        
        
        private function _authenticate($data)
        {
                $email = $data['email'];
                $password = $data['password'];
                
                $db = Zend_Db_Table::getDefaultAdapter();
                    $authAdapter = new Zend_Auth_Adapter_DbTable($db);

                    $authAdapter->setTableName('user');
                    $authAdapter->setIdentityColumn('email');
                    $authAdapter->setCredentialColumn('password');
                    $authAdapter->setCredentialTreatment('MD5(?)');

                    $authAdapter->setIdentity($email);
                    $authAdapter->setCredential($password);

                    $auth = Zend_Auth::getInstance();
                    $result = $auth->authenticate($authAdapter);

                    // Did the user successfully login?
                    if ($result->isValid()) {

                        $user_table = new Model_DbTable_Users();

                        $user = $user_table->getUserByEmailNoJoin($email);

                        $user->last_login_ts = date('Y-m-d H:i:s');

                        $user->save();

                        $storage = $auth->getStorage();
                        $storage->write($authAdapter->getResultRowObject(array('uid', 'first_name', 'last_name', 'email', 'last_login_ts')));

                        Zend_Session::rememberMe(1209600);

                        //$this->_helper->flashMessenger->addMessage('You are logged in');
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
		
                $transport = new Zend_Mail_Transport_Smtp('mail.gandi.net', $this->config);
                Zend_Mail::setDefaultTransport($transport);
                
		$mailToAdmin = new Zend_Mail('utf-8');
		$mailToAdmin->addTo('registration@2013-jlrc-conference.com');
                $mailToAdmin->addBcc(array('commaille@gmail.com', 'dilin110@gmail.com'));

                $mailToAdmin->setFrom('registration@2013-jlrc-conference.com', '2013 JLRC');
		$mailToAdmin->setSubject($data['first_name'] . ' ' . $data['last_name'] . ' Registered to the JLR Conference');
		$mailToAdmin->setBodyHtml($this->view->render('users/mail/new-user-admin-notice.phtml'));
		
                $mailToNewUser = new Zend_Mail('utf-8');
		$mailToNewUser->addTo($data['email']);
                $mailToNewUser->addBcc(array('commaille@gmail.com', 'dilin110@gmail.com'));
                $mailToNewUser->setFrom('registration@2013-jlrc-conference.com', '2013 JLRC');
		$mailToNewUser->setSubject($this->translate->translate('welcome_email_subject'));
		$mailToNewUser->setBodyHtml($this->view->render('users/mail/new-user.phtml'));
		
                if($mailToAdmin->send() && $mailToNewUser->send()) {
			return true;
		} else {
			return false;
		}
        }
        
        /**
         * Send admin the user's new profile
         * @param type $data
         * @return boolean
         */
        private function _notifyAdminUserProfileUpdated($data)
        {
                $this->view->data = $data;
                 
                
                
		$mailToAdmin = new Zend_Mail('utf-8');
                $mailToAdmin->addTo('registration@2013-jlrc-conference.com');
                $mailToAdmin->addBcc(array( 'dilin110@gmail.com','commaille@gmail.com'));
                
                $mailToAdmin->setFrom('registration@2013-jlrc-conference.com', '2013 JLRC');
		$mailToAdmin->setSubject($data['first_name'] . ' ' . $data['last_name'] . ' Updated the Profile');
		$mailToAdmin->setBodyHtml($this->view->render('users/mail/profile-update-notice.phtml'));
		
                if($mailToAdmin->send()) {
			return true;
		} else {
			return false;
		}
        }
        
        /**
         * Send admin the user's new profile
         * @param type $data
         * @return boolean
         */
        private function _sendResetAccountEmail($data)
        {
                
                $data['link'] = 'http://2013-jlrc-conference.com/users/reset-password/email/' . $data['email'] . '/token/' . $data['temp_password'] . '/fwihsl/vmii-ec';
                $this->view->data = $data;

                $transport = new Zend_Mail_Transport_Smtp('mail.gandi.net', $this->config);
                Zend_Mail::setDefaultTransport($transport);
                
		$mailToUser = new Zend_Mail('utf-8');
                $mailToUser->addTo(array($data['email']));
                $mailToUser->setFrom('registration@2013-jlrc-conference.com', '2013 JLR Conference');
		$mailToUser->setSubject('Reset Your 2013 JLR Conference Account');
		$mailToUser->setBodyHtml($this->view->render('users/mail/forgot-password.phtml'));
                
                if($mailToUser->send()) {
			return true;
		} else {
			return false;
		}
        }
}

