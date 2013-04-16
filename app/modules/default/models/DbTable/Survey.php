<?php

class Model_DbTable_Survey extends Zend_Db_Table_Abstract
{
    
    protected $_name = 'survey';
    protected $_primary = 'survey_id';


    public function addSurvey($data)
    {
        return $data && is_array($data) ? $this->insert($data) : false;
    }

    public function getSurvey($uid = null) 
    {
       
        $sql =  "SELECT * From survey ";
        if ($uid) {
            $sql .= " WHERE uid = " . $uid;
        }
        return $this->_db->query($sql)->fetch();
    }
    
}