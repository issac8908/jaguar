<?php

class MessageController extends Zend_Controller_Action
{
	
	public function init()
	{
	}
	
        public function indexAction()
        {
                $this->_helper->redirector('unattending');
        }
  
        public function unattendingAction()
        {
                $form = new Form_Message_Unattending(array('method'=>'post'));

                if ($this->_request->isPost()) {
                    
                    $data = $this->_request->getPost();
                    
                    if ($form->isValid($data)) {

                        $user_table = new Model_DbTable_Users();
                        $uid = $user_table->addUser(array(
                            'first_name' => $data['first_name'],
                            'last_name' => $data['last_name'],
                            'email' => $data['email'],
                            'is_attending' => '0',
                            'dealership_name' => $data['dealership_name'],
                            'dealership_addr' => $data['dealership_addr'],
                            'dealership_region' => $data['dealership_region']
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
        
        /**
         * Send message to ADMIN
         * 
         * @param type $data
         * @return boolean
         */
	private function _sendMail($data)
	{
		$this->view->login = '111111';
		$this->view->password = '2222222';
		
                $config = array(
                    'ssl' => 'tls',
                    'port' => 587,
                    'auth' => 'login',
                    'username' => 'dilin@carburant.fr',
                    'password' => 'dilin110'
                );
                $transport = new Zend_Mail_Transport_Smtp('smtp.gmail.com', $config);
                Zend_Mail::setDefaultTransport($transport);
                
		$mail = new Zend_Mail('utf-8');
		$mail->addTo($data['email']);
		$mail->setSubject('Unattending User Detail');
		$mail->setBodyHtml($this->view->render('message/mail/unattending.phtml'));
		
		if($mail->send()) {
			return true;
		} else {
			return false;
		}
	}
        
}

