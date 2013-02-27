<?php

class Model_DbTable_GroupOne extends Zend_Db_Table_Abstract
{
    
        protected $_name = 'group_one';
        protected $_primary = 'pid';

        
        public function getGroupOne($field = null)
        {
            $sql = "SELECT * FROM group_one";
            if ($field) {
                $sql .= " where field = '" . $field . "'";
            }
            return $this->_db->query($sql)->fetchAll();
        }
        
        public function addGeneralManager($title)
        {
            $sql = "INSERT INTO `group_one` (`title`, `field`) VALUES ('$title', 'general_manager');";
            return $this->_db->query($sql);
        }
}