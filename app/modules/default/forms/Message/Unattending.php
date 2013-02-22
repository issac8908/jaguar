<?php

class Form_Message_Unattending extends Zend_Form
{
 	
        public function init()
        {

                $this->setName('step-one');

                $first_name = new Zend_Form_Element_Text('first_name');
                $first_name->setAttrib('tabindex', 2)->setLabel('Prénom* :')->setRequired(true)
                        ->addValidator('NotEmpty', true, array('messages' => array('isEmpty' => 'First name cannot be empty')));
                
                $last_name = new Zend_Form_Element_Text('last_name');
                $last_name->setAttrib('tabindex', 3)->setLabel('Nom* :')->setRequired(true)
                        ->addValidator('NotEmpty', true, array('messages' => array('isEmpty' => 'Last name cannot be empty')));

                $email = new Zend_Form_Element_Text('email');
                $email->setAttrib('tabindex', 7)->setLabel('Adresse e-mail* :')->setRequired(true)
                        ->addValidator('EmailAddress', true, array('mx' => true, 'deep' => true));
                
                $dealership_name = new Zend_Form_Element_Text('dealership_name');
                
                $dealership_addr = new Zend_Form_Element_Text('dealership_addr');
                
                $dealership_region = new Zend_Form_Element_Text('dealership_region');

                $message = new Zend_Form_Element_Textarea('message');
                
                $submit = new Zend_Form_Element_Submit('submit');
                $submit->setAttrib('tabindex', 10)->setLabel('submit');

                $this->addElements(array($first_name, $last_name, $email, $dealership_name, $dealership_addr, $dealership_region, $message, $submit));

                foreach($this->getElements() as $element) {
                        $element->removeDecorator('DtDdWrapper')->removeDecorator('HtmlTag')->removeDecorator('Label');
                }
        }
}
