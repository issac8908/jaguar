<?php

class Form_User_User extends Zend_Form
{
 	
        public function init()
        {

                $uid = new Zend_Form_Element_Hidden('uid');
                
                $first_name = new Zend_Form_Element_Text('first_name');
                $first_name->setRequired(true);
                
                $last_name = new Zend_Form_Element_Text('last_name');
                $last_name->setRequired(true);

                $gender = new Zend_Form_Element_Radio('gender');
                $gender->addMultiOptions(array(
                    'm' => $this->getView()->translate('male'),
                    'f' => $this->getView()->translate('female'),
                ))->setSeparator('  ')->setRequired(true);
                
                $id_passport_number = new Zend_Form_Element_Text('id_passport_number');
                $id_passport_number->setRequired(true);
                
                $tel = new Zend_Form_Element_Text('tel');
                $tel->setRequired(true);
                
                $mobile = new Zend_Form_Element_Text('mobile');
                $mobile->setRequired(true);
                
                $email = new Zend_Form_Element_Text('email');
                $email->setRequired(true)
                        ->addValidator('EmailAddress', true, array('mx' => true, 'deep' => true));
                        //->addValidator('Db_NoRecordExists', true, array('table' => 'user', 'field' => 'email'));//->addErrorMessages(array('Email address cannot be empty'));

                $password = new Zend_Form_Element_Password('password');
                $password->setAttrib('size', '30')->setRequired(true)
                                ->addValidator('StringLength', true, array('min' => 6));

                $is_attending = new Zend_Form_Element_Radio('is_attending');
                $is_attending->addMultiOptions(array(
                    '1' => $this->getView()->translate('yes'),
                    '0' => $this->getView()->translate('no')
                ))->setSeparator('  ')->setRequired(true);
                
                $position = new Zend_Form_Element_Radio('position');
                $position->addMultiOptions(array(
                    'group_head' => $this->getView()->translate('group_head'),
                    'manager' => $this->getView()->translate('general_manager'),
                    'partner' => $this->getView()->translate('partner')
                ))->setSeparator('  ')->setRequired(true);

                $group_one_table = new Model_DbTable_GroupOne();
                
                $group_name = new Zend_Form_Element_Select('group_name');
                $group_name->addMultiOption('', '');
                $group_names = $group_one_table->getGroupOne('group_head');
                if ($group_names) {
                    foreach ($group_names as $n) {
                        $group_name->addMultiOption($n['gid'], $n['title']);
                    }
                }
                
                $group_title = new Zend_Form_Element_Text('group_title');
                
                $dms_code = new Zend_Form_Element_Select('dms_code');
                $dms_code->addMultiOption('', '');
                $dms_codes = $group_one_table->getGroupOne('general_manager');
                if ($dms_codes) {
                    foreach ($dms_codes as $c) {
                        $dms_code->addMultiOption($c['gid'], $c['title']);
                    }
                }
                
                $company_name = new Zend_Form_Element_Text('company_name');
                
                $company_title = new Zend_Form_Element_Text('company_title');
                
                $city_id = new Zend_Form_Element_Select('city_id');
                
                $arrival_date = new Zend_Form_Element_Text('arrival_date');
                $arrival_date->setRequired(true)->addValidator('Date', true,'Y/m/d');
                
                $departure_date = new Zend_Form_Element_Text('departure_date');
                $departure_date->setRequired(true)->addValidator('Date', true,'Y/m/d');
                
                $arrival_transportation = new Zend_Form_Element_Select('arrival_transportation');
                $arrival_transportation->addMultiOptions(array(
                        'airplane' => $this->getView()->translate('airplane'),
                        'train' => $this->getView()->translate('train'),
                        'car' => $this->getView()->translate('car'),
                ));

                $departure_transportation = new Zend_Form_Element_Select('departure_transportation');
                $departure_transportation->addMultiOptions(array(
                        'airplane' => $this->getView()->translate('airplane'),
                        'train' => $this->getView()->translate('train'),
                        'car' => $this->getView()->translate('car'),
                ));

                $arrival_from = new Zend_Form_Element_Select('arrival_from');
                $departure_to = new Zend_Form_Element_Select('departure_to');
                
                       
                $city_id->addMultiOption('','');
                $arrival_from->addMultiOption('','');
                $departure_to->addMultiOption('','');
                $city_table = new Model_DbTable_Cities();
                $cities = $city_table->getCities();
                if ($cities) {
                    foreach ($cities as $c) {
                        $city_id->addMultiOption($c['cid'], $c['ch_name']);
                        $arrival_from->addMultiOption($c['cid'], $c['ch_name']);
                        $departure_to->addMultiOption($c['cid'], $c['ch_name']);
                    }
                }
                
                $arrival_time = new Zend_Form_Element_Text('arrival_time');
                $departure_time = new Zend_Form_Element_Text('departure_time');

                
                $room_type = new Zend_Form_Element_Radio('room_type');
                $room_type->addMultiOptions(array(
                        'single' => 'Single',
                        'twin' => 'Twin'
                ))->setSeparator('  ');

                $guest_name = new Zend_Form_Element_Text('guest_name');

                $is_staying = new Zend_Form_Element_Radio('is_staying');
                $is_staying->addMultiOptions(array(
                    '1' =>  $this->getView()->translate('yes'),
                    '0' =>  $this->getView()->translate('no'),
                ))->setSeparator('  ');

                $not_staying_reason = new Zend_Form_Element_Textarea('not_staying_reason');
                $not_staying_reason->setAttribs(array('rows'=>'5', 'cols'=> '40'));

                $is_joining_lunch = new Zend_Form_Element_Radio('is_joining_lunch');
                $is_joining_lunch->addMultiOptions(array(
                    '1' =>  $this->getView()->translate('yes'),
                    '0' =>  $this->getView()->translate('no'),
                ))->setSeparator('  ');;
        
                $submit = new Zend_Form_Element_Submit('submit');
        
                $this->addElements(array(
                    $uid, $first_name, $last_name, $gender, $id_passport_number, $tel, $mobile, 
                    $email, $password, $is_attending,
                    $position, $group_name, $group_title, $dms_code, $company_name, $company_title, 
                    $city_id,
                    $arrival_date, $departure_date, 
                    $arrival_transportation, $departure_transportation, 
                    $arrival_from, $departure_to,
                    $arrival_time, $departure_time,
                    $room_type, $guest_name, $is_staying, $not_staying_reason, $is_joining_lunch,
                    $submit
                ));

                foreach($this->getElements() as $element) {
                        $element->removeDecorator('DtDdWrapper')->removeDecorator('HtmlTag')->removeDecorator('Label');
                }
        }
}
