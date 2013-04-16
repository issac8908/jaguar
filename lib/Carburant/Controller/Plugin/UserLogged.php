<?php

class Carburant_Controller_Plugin_UserLogged extends Zend_Controller_Plugin_Abstract
{
    public function preDispatch(Zend_Controller_Request_Abstract $request)
    {
        $module = $request->getModuleName();
        $controller = $request->getControllerName();
        $action = $request->getActionName();
       
        $auth = Zend_Auth::getInstance();
        $layout = Zend_Layout::getMvcInstance();
        $view = $layout->getView();
        
        
        if($module == 'default') {      	
        	if ($controller == 'code') {
                    $request->setControllerName('index');
                    $request->setActionName('index');
                    $request->setParam('code', $action);
                }
        	if ($auth->hasIdentity() && isset($auth->getIdentity()->email)) { 	
        		$view->email = $auth->getIdentity()->email; 
                        $view->isLogged = true;
        	} else {

                    if ($controller == 'event' && $action == 'survey') { 
                        $code = $request->getParam('code', 'false');
                        if ($code) {
                            // valid code?
                            $user_table = new Model_DbTable_Users();
                            $user = $user_table->getUserByCode($code);
                            
                            // user registered? if yes, login user
                            if ($user['uid'] && $user['email']) {
                                
                                $db = Zend_Db_Table::getDefaultAdapter();
                                $authAdapter = new Zend_Auth_Adapter_DbTable($db);

                                $authAdapter->setTableName('user');
                                $authAdapter->setIdentityColumn('email');
                                $authAdapter->setCredentialColumn('password');
                                $authAdapter->setCredentialTreatment('? or 1 = 1');

                                $authAdapter->setIdentity($user['email']);
                                $authAdapter->setCredential('any');

                                $result = $auth->authenticate($authAdapter);

                                if ($result->isValid()) {

                                    $user = $user_table->getUserByEmailNoJoin($user['email']);

                                    $user->last_login_ts = date('Y-m-d H:i:s');

                                    $user->save();

                                    $storage = $auth->getStorage();
                                    $storage->write($authAdapter->getResultRowObject(array('uid',  'email', 'last_login_ts')));

                                    Zend_Session::rememberMe(1209600);
                                    
                                    $view->isLogged = true;
                                    
                                }
                            }
                                
                        }
                    }
                    /*
                        if($controller != 'index' && $controller != 'users' ) {
        			$redirector = Zend_Controller_Action_HelperBroker::getStaticHelper('redirector');
        			$redirector->setGotoSimple('index', 'index', 'default');
        		}
                     * 
                     */
        	}        	
        }        
    }
}
