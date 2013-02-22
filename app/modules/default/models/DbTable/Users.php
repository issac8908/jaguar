<?php

class Model_DbTable_Users extends Zend_Db_Table_Abstract
{
    
        protected $_name = 'user';
        protected $_primary = 'uid';

        
        /**
         * Get people by people id
         * 
         * @param int $id
         * @return Zend_Db_Table_Row
         */
        public function getUserById($id)
        {
            $select = $this->select()->where('uid = ?', $id);
            return $this->fetchRow($select);
        }

        /**
         * Get people by address email
         * 
         * @param string $email
         * @return Zend_Db_Table_Row
         */
        public function getUserByEmail($email)
        {
            $select = $this->select()->where('email = ?', $email)->limit(1);
            return $this->fetchRow($select);
        }
        
        public function addUser($data)
        {
            return $data && is_array($data) ? $this->insert($data) : false;
        }
}