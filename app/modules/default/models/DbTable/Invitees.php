<?php

class Model_DbTable_Invitees extends Zend_Db_Table_Abstract
{
    
        protected $_name = 'code_email';
        protected $_primary = 'idjl';

    
        public function getInviteeByEmailNoJoin($email) 
        {
            
            $select = $this->select()->where('email = ?', $email);
            return $this->fetchRow($select);

        }
        
        public function getInviteeByCodeNoJoin($code)
        {

            $select = $this->select()->from($this->_name, array('email'))->where('code = ?', $code);
            return $this->fetchRow($select);

        }
        
        
}

?>
