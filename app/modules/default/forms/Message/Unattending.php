<?php

class Form_Message_Unattending extends Zend_Form
{
 	
        public function init()
        {

                $first_name = new Zend_Form_Element_Text('first_name');
                $first_name->setRequired(true);
                        //->addValidator('NotEmpty', true, array('messages' => array('isEmpty' => 'First name cannot be empty')));
                
                $last_name = new Zend_Form_Element_Text('last_name');
                $last_name->setRequired(true);
                        //->addValidator('NotEmpty', true, array('messages' => array('isEmpty' => 'Last name cannot be empty')));

                $email = new Zend_Form_Element_Text('email');
                $email->setRequired(true)
                        ->addValidator('EmailAddress', true, array('mx' => true, 'deep' => true))
                        ->addValidator('Db_NoRecordExists', true, array('table' => 'user', 'field' => 'email'));
                
                $dealership_name = new Zend_Form_Element_Text('dealership_name');
                
                $dealership_addr = new Zend_Form_Element_Text('dealership_addr');
                
                $dealership_region = new Zend_Form_Element_Text('dealership_region');

                $message = new Zend_Form_Element_Textarea('message');
                
                $submit = new Zend_Form_Element_Submit('submit');
                $submit->setLabel('submit');

                $this->addElements(array($first_name, $last_name, $email, $dealership_name, $dealership_addr, $dealership_region, $message, $submit));

                foreach($this->getElements() as $element) {
                        $element->removeDecorator('DtDdWrapper')->removeDecorator('HtmlTag')->removeDecorator('Label');
                }
        }
}
