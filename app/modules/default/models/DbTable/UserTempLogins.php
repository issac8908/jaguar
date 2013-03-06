<?php

class Model_DbTable_UserTempLogins extends Zend_Db_Table_Abstract
{
    
        protected $_name = 'user_temp_login';
        protected $_primary = 'temp_login_id';

        
        public function addTempLogin($data)
        {
            
           // die($data['temp_password']);
            if ($data && is_array($data)) {
                if ($this->updateTempLogin(array('uid' =>$data['uid'], 'password' => $data['password']), $data['uid'])) {
                    return true;
                } else {
                    return $this->insert(array('uid' =>$data['uid'], 'password' => $data['password']));
                }
            } 
            return false;
        }
        
        public function updateTempLogin($data, $uid) 
        {
            
            $where = $this->getAdapter()->quoteInto('uid = ?', $uid);
            
            return $this->update($data, $where);
        }
}