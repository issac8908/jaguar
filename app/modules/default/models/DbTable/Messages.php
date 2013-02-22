<?php

class Model_DbTable_Messages extends Zend_Db_Table_Abstract
{
    
        protected $_name = 'message';
        protected $_primary = 'mid';

        
        public function addMessage($data)
        {
            return $data && is_array($data) ? $this->insert($data) : false;
        }
}