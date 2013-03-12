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
            $select = $this->select()->setIntegrityCheck(false);
            $select->from('user','*')
                    ->where('user.uid = ?', $id)
                    ->joinLeft('city', 'city.cid = user.city_id', array('en_name as city_en_name','ch_name as city_ch_name'))
                    ->joinLeft('city as arrival_city', 'arrival_city.cid = user.city_id', array('en_name as arrival_from_en_name','ch_name as arrival_from_ch_name'))
                    ->joinLeft('city as departure_city', 'departure_city.cid = user.city_id', array('en_name as departure_to_en_name','ch_name as departure_to_ch_name'));
            return $this->fetchRow($select);       
        }

        public function getUserByIdUsingSQL($id) 
        {
            $sql = "SELECT c1.en_name as city, 
                    c2.en_name as arrival_from_city, 
                    c3.en_name as departure_to_city, 
                    g2.title as dms,
                    g3.title as group_head_name,
                    u.* from user as u
                    left join city as c1 on u.city_id = c1.cid 
                    left join city as c2 on u.arrival_from = c2.cid
                    left join city as c3 on u.departure_to = c3.cid 
                    left join group_one as g2 on u.dms_code = g2.gid 
                    left join group_one as g3 on u.group_name = g3.gid
                    where `u`.`uid` = '" . $id . "'";
            return $this->_db->query($sql)->fetch();
        }
        
        /**
         * Get people by address email
         * 
         * @param string $email
         * @return Zend_Db_Table_Row
         */
        public function getUserByEmail($email)
        {
            $select = $this->select()->setIntegrityCheck(false);
            $select->from('user','*')
                    ->where('user.email = ?', $email)
                    ->joinLeft('city', 'city.cid = user.city_id', array('en_name as city_en_name','ch_name as city_ch_name'))
                    ->joinLeft('city as arrival_city', 'arrival_city.cid = user.arrival_from', array('en_name as arrival_from_en_name','ch_name as arrival_from_ch_name'))
                    ->joinLeft('city as departure_city', 'departure_city.cid = user.departure_to', array('en_name as departure_to_en_name','ch_name as departure_to_ch_name'));
                    
            return $this->fetchRow($select);
        }
        
        public function getUserByEmailUsingSQL($email) 
        {
            $sql = "SELECT c1.en_name as city, 
                    c2.en_name as arrival_from_city, 
                    c3.en_name as departure_to_city, 
                    g2.title as dms,  
                    g3.title as group_head_name,
                    u.* from user as u
                    left join city as c1 on u.city_id = c1.cid 
                    left join city as c2 on u.arrival_from = c2.cid
                    left join city as c3 on u.departure_to = c3.cid 
                    left join group_one as g2 on u.dms_code = g2.gid 
                    left join group_one as g3 on u.group_name = g3.gid 
                    where `u`.`email` = '" . $email . "'";
            
            return $this->_db->query($sql)->fetch();
        }
        
        public function getUserByEmailNoJoin($email)
        {
            $select = $this->select()->where('email = ?', $email);
            return $this->fetchRow($select);
        }
        
        public function getUserByIdNoJoin($id)
        {
            $select = $this->select()->where('uid = ?', $id);
            return $this->fetchRow($select);
        }
        
        public function getUserByEmailExcludeUid($data) 
        {
            $uid = $data['uid'];
            $email = $data['email'];
            $sql = "select * from user where email = '$email' and uid != '$uid';";
            return $this->_db->query($sql)->fetchAll();
        }
        
        public function getUserByCode($data) 
        {
            $select = $this->select()
                    ->where('code = ?', $data['code'])
                    ->where('uid = ?', $data['uid']);
            return $this->fetchRow($select);
        }
        
        public function addUser($data)
        {
            return $data && is_array($data) ? $this->insert($data) : false;
        }
        
        public function addDataAndGetUser($data) 
        {
            $id = $this->addUser($data);
            if ($id) {
                return $this->getUserById($id);
            }
            return null;
        }
        
        public function updateUserProfile($id, $data)
        {
            if ($data && $id) {
                if (is_numeric($id)) {
                    return $this->update($data, 'uid = ' . $id);
                }
            }
            return false;
        }
        
        public function updateUserByEmail($data, $email) 
        {
            $where = $this->getAdapter()->quoteInto('email = ?', $email);
            return $this->update($data, $where);
        }
}