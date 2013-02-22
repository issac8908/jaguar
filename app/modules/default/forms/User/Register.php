<?php

class Form_User_Register extends Zend_Form
{
 	
        public function init()
        {

                $first_name = new Zend_Form_Element_Text('first_name');
                $first_name->setAttrib('tabindex', 2)->setLabel('Prénom* :')->setRequired(true)
                        ->addValidator('NotEmpty', true, array('messages' => array('isEmpty' => 'First name cannot be empty')));
                
                $last_name = new Zend_Form_Element_Text('last_name');
                $last_name->setAttrib('tabindex', 3)->setLabel('Nom* :')->setRequired(true)
                        ->addValidator('NotEmpty', true, array('messages' => array('isEmpty' => 'Last name cannot be empty')));

                $email = new Zend_Form_Element_Text('email');
                $email->setAttrib('tabindex', 7)->setLabel('Adresse e-mail* :')->setRequired(true)
                        ->addValidator('EmailAddress', true, array('mx' => true, 'deep' => true))
                        ->addValidator('Db_NoRecordExists', true, array('table' => 'user', 'field' => 'email'));//->addErrorMessages(array('Email address cannot be empty'));

                $confirm_email = new Zend_Form_Element_Text('confirm_email');
                $confirm_email->setAttrib('tabindex', 9)->setRequired(true)
                      //  ->addValidator('NotEmpty', true, array('messages' => array('isEmpty' => 'Ce champ est obliatoire')))
                                ->addValidator('identical', true, array('token' => 'email'));
                
                $password = new Zend_Form_Element_Password('password');
                $password->setAttrib('tabindex', 8)->setLabel('Mot de passe* :')->setRequired(true)
                      //  ->addValidator('NotEmpty', true, array('messages' => array('isEmpty' => 'Ce champ est obliatoire')))
                                ->addValidator('StringLength', true, array('min' => 6));


                $confirm_password = new Zend_Form_Element_Password('confirm_password');
                $confirm_password->setAttrib('tabindex', 9)->setLabel('Confirmer le mot de passe* :')->setRequired(true)
                     //   ->addValidator('NotEmpty', true, array('messages' => array('isEmpty' => 'Ce champ est obliatoire')))
                                ->addValidator('identical', true, array('token' => 'password'));
                
                $gender = new Zend_Form_Element_MultiCheckbox('gender');
                $gender->setAttrib('tabindex', 1)->setLabel('Sexe* :')->addMultiOptions(array(
                    'm' => 'Male',
                    'f' => 'Female'
                ))->setSeparator('  ')->setRequired(true);
                
                $dealership_name = new Zend_Form_Element_Text('dealership_name');
                
                $dealership_addr = new Zend_Form_Element_Text('dealership_addr');
                
                $dealership_region = new Zend_Form_Element_Text('dealership_region');

                $submit = new Zend_Form_Element_Submit('step-one-submit');
                $submit->setAttrib('tabindex', 10)->setLabel('NEXT');

                $this->addElements(array($first_name, $last_name, $email, $confirm_email, $password, $confirm_password, $gender, $dealership_name, $dealership_addr, $dealership_region, $submit));

                foreach($this->getElements() as $element) {
                        $element->removeDecorator('DtDdWrapper')->removeDecorator('HtmlTag')->removeDecorator('Label');
                }
        }
}
