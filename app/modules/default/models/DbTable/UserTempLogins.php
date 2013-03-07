<?php

class Model_DbTable_UserTempLogins extends Zend_Db_Table_Abstract
{
    
        protected $_name = 'user_temp_login';
        protected $_primary = 'temp_login_id';

        
        public function addTempLogin($data)
        {
            
            if ($data && is_array($data)) {
                
                if ($this->updateTempLogin(array('uid' =>$data['uid'], 'password' => $data['password']), $data['uid']))

                    return true;
                
                else
                    
                    return $this->insert(array('uid' =>$data['uid'], 'password' => $data['password']));
            
            } 
            
            return false;
        }
        
        public function updateTempLogin($data, $uid) 
        {
            
            $where = $this->getAdapter()->quoteInto('uid = ?', $uid);
            
            return $this->update($data, $where);
        }
        
        public function getTempLogin($data = array()) 
        {
            
            $select = $this->select()->setIntegrityCheck(false);
            $select->from('user_temp_login', 'user_temp_login.*')->joinLeft('user', 'user.uid = user_temp_login.uid', 'user.email');
            
            $select->where('email' . ' = ?', $data['email']);
            $select->where('user_temp_login.' . 'password' . ' = ?', $data['password']);
            
            return $this->fetchRow($select);

        }
        
        public function deleteTempLogin($id)
        {
            return $this->delete('uid = ' . $id);
        }
        
}
