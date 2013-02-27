<?php

class Model_DbTable_Cities extends Zend_Db_Table_Abstract
{
    
        protected $_name = 'city';
        protected $_primary = 'cid';

        
        public function getCities()
        {
            $sql = "SELECT * FROM city";
            return $this->_db->query($sql)->fetchAll();
        }
        
}