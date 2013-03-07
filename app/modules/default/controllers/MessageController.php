<?php

class MessageController extends Zend_Controller_Action
{
	
	public function init()
	{
                $session = Zend_Registry::get('session');
                
                if (!$this->view->isLogged && !($session->email)) {
                    $this->_helper->redirector('index', 'index');
                }
	}
	
        public function indexAction()
        {
                $this->_helper->redirector('unattending');
        }
  
        public function unattendingAction()
        {
                $form = new Form_Message_Unattending();

                if ($this->_request->isPost()) {
                    
                    $data = $this->_request->getPost();
                    if ($form->isValid($data)) {

                        $user_table = new Model_DbTable_Users();
                        $uid = $user_table->addUser(array(
                            'first_name' => $data['first_name'],
                            'last_name' => $data['last_name'],
                            'email' => $data['email'],
                            'is_attending' => '0'
                        )); 

                        if ($uid) {
                            $msg_table = new Model_DbTable_Messages();
                            if ($msg_table->addMessage(array('uid' => $uid, 'msg' => $data['message']))) {

                                // Email admin the message and the user info
                                $this->_sendMail($data);
                                $this->_helper->redirector('index', 'index');
                            }
                        }
                    } else {
                    }
                }

                $this->view->form = $form;
        }
        
        public function validateAction()
        {
            
                $this->_helper->getHelper('layout')->disableLayout();
                $this->_helper->viewRenderer->setNoRender();
                
                if ($this->_request->isXmlHttpRequest()) {
                        
                    $data = $this->_request->getPost();
                    $form = new Form_Message_Unattending();
                    
                    if ($form->isValid($data)) {  
                        
                        if ($this->_isExistingEmail($form->getValue('email'))) {
                            echo json_encode(array('success' => false));
                        } else {
                            echo json_encode(array('success' => true));
                        }
                    } else 
                        echo $form->processAjax($data);
                }
                
        }
        
        private function _isExistingEmail($email) 
        {
                $user_table = new Model_DbTable_Users();
                if ($user_table->getUserByEmail($email))
                    return true;
                else 
                    return false;
        }
        
        /**
         * Send message to ADMIN
         * 
         * @param type $data
         * @return boolean
         */
	private function _sendMail($data)
	{
		$this->view->data = $data;
		
                $config = array(
                    'ssl' => 'ssl',
                    'port' => 465,
                    'auth' => 'login',
                    'username' => 'registration@2013-jlrc-conference.com',
                    'password' => 'jlrc0nf2013',
                );
                $transport = new Zend_Mail_Transport_Smtp('mail.gandi.net', $config);
                Zend_Mail::setDefaultTransport($transport);
                
		$mail = new Zend_Mail('utf-8');
		$mail->addTo('registration@2013-jlrc-conference.com');
                $mail->addBcc(array('dilin110@gmail.com', 'commaille@gmail.com'));
                $mail->setFrom('registration@2013-jlrc-conference.com', '2013 JRL Conference');
		$mail->setSubject($data['first_name'] . ' ' . $data['last_name'] . ' - not Attending the JLRC Conference');
		$mail->setBodyHtml($this->view->render('message/mail/unattending.phtml'));
		
		if($mail->send()) {
			return true;
		} else {
			return false;
		}
	}
        
}

