<?php

class Model_DbTable_Temp extends Zend_Db_Table_Abstract
{
    
        protected $_name = 'temp';
        protected $_primary = 'id';

        
        public function addTable()
        {
            
            $sql = "

CREATE TABLE `user_temp_login` (
  `temp_login_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `password` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `create_ts` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`temp_login_id`),
  UNIQUE KEY `temp_login_id_UNIQUE` (`temp_login_id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci
";
            return $this->_db->query($sql);


        }
        
        public function showTables()
        {
            $sql = "show tables;";
            return $this->_db->query($sql);
        }
        
        public function getUserTempLoginTable()
        {
           $sql = "select * from user_temp_login";
            return $this->_db->query($sql);
        }
        
        public function alterEncoding()
        {
           // $sql = "ALTER TABLE `jlrcdb`.`user` CHANGE COLUMN `dms_code` `dms_code` VARCHAR(45) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL DEFAULT NULL  ;";
           // $sql = "SELECT * FROM message";
          // $sql = "ALTER TABLE `jlrcdb`.`user` CHANGE COLUMN `position` `position` ENUM('group_head','manager','partner', 'internals') CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL DEFAULT NULL  ;";
          $sql = "UPDATE `jlrcdb`.`user` SET `position`='internal' WHERE `email`='5';";
            return $this->_db->query($sql)->fetchAll();
        }
        
}
