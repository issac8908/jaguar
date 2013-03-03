<?php

class Form_User_StepOne extends Zend_Form
{
 	
        public function init()
        {

                $first_name = new Zend_Form_Element_Text('first_name');
                $first_name->setAttrib('tabindex', 1)
                        ->setAttrib('size', '30')
                        ->setRequired(true);
                        //->addValidator('NotEmpty', true, array('messages' => array('isEmpty' => 'First name cannot be empty')));
                
                $last_name = new Zend_Form_Element_Text('last_name');
                $last_name->setAttrib('tabindex', 2)
                        ->setAttrib('size', '30')
                        ->setRequired(true);
                        //->addValidator('NotEmpty', true, array('messages' => array('isEmpty' => 'Last name cannot be empty')));

                $gender = new Zend_Form_Element_Radio('gender');
                $gender->setAttrib('tabindex', 3)->setLabel('Gender :')->addMultiOptions(array(
                    'm' => 'Male',
                    'f' => 'Female'
                ))->setSeparator('  ')->setRequired(true);
                
                $id_passport_number = new Zend_Form_Element_Text('id_passport_number');
                $id_passport_number->setAttrib('size', '30')->setRequired(true);
                
                
                $email = new Zend_Form_Element_Text('email');
                $email->setAttrib('size', '30')
                        ->setLabel('Adresse e-mail* :')
                        ->setRequired(true)
                        ->addValidator('EmailAddress', true, array('mx' => true, 'deep' => true))
                        ->addValidator('Db_NoRecordExists', true, array('table' => 'user', 'field' => 'email'));//->addErrorMessages(array('Email address cannot be empty'));

                $confirm_email = new Zend_Form_Element_Text('confirm_email');
                $confirm_email->setAttrib('size', '30')->setRequired(true)
                      //  ->addValidator('NotEmpty', true, array('messages' => array('isEmpty' => 'Ce champ est obliatoire')))
                                ->addValidator('identical', true, array('token' => 'email'));
                
                $password = new Zend_Form_Element_Password('password');
                $password->setAttrib('size', '30')->setLabel('Mot de passe* :')->setRequired(true)
                      //  ->addValidator('NotEmpty', true, array('messages' => array('isEmpty' => 'Ce champ est obliatoire')))
                                ->addValidator('StringLength', true, array('min' => 6));


                $confirm_password = new Zend_Form_Element_Password('confirm_password');
                $confirm_password->setAttrib('size', '30')->setLabel('Confirmer le mot de passe* :')->setRequired(true)
                     //   ->addValidator('NotEmpty', true, array('messages' => array('isEmpty' => 'Ce champ est obliatoire')))
                                ->addValidator('identical', true, array('token' => 'password'));
                
                
                $tel = new Zend_Form_Element_Text('tel');
                $tel->setAttrib('size', '30')->setRequired(true);;
                
                $mobile = new Zend_Form_Element_Text('mobile');
                $mobile->setAttrib('size', '30')->setRequired(true);;
                
                $position = new Zend_Form_Element_Radio('position');
                $position->addMultiOptions(array(
                    'group_head' => 'Group Head',
                    'manager' => 'General Manager',
                    'partner' => 'Partner'
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
                $city_table = new Model_DbTable_Cities();
                $cities = $city_table->getCities();
                if ($cities) {
                    foreach ($cities as $c) {
                        $city_id->addMultiOption($c['cid'], $c['ch_name']);
                    }
                }
                
                $submit = new Zend_Form_Element_Submit('step_one_next');
                $submit->setLabel('NEXT');

                $this->addElements(array(
                    $first_name, $last_name, $gender, $id_passport_number, 
                    $email, $confirm_email, $password, $confirm_password, 
                    $tel, $mobile, $position, $group_name, $group_title, $dms_code, $company_name, $company_title, 
                    $city_id, $submit
                ));

                foreach($this->getElements() as $element) {
                        $element->removeDecorator('DtDdWrapper')->removeDecorator('HtmlTag')->removeDecorator('Label');
                }
        }
}
