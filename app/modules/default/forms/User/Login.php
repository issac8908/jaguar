<?php

class Form_User_Login extends Zend_Form
{
 	
        public function init()
        {
                $email= new Zend_Form_Element_Text('email');
                $email->setLabel('Login')
                        ->setRequired(true)
                        ->addValidator('EmailAddress', true, array('mx' => true, 'deep' => true));

                $password = new Zend_Form_Element_Password('password');
                $password->setLabel('Password')
                        ->setRequired(true)
                        ->addValidator('StringLength', true, array('min' => 6));

                $submit = new Zend_Form_Element_Submit('submit');
                $submit->setAttrib('tabindex', 10)->setLabel('SUBMIT');

                $this->addElements(array($email, $password, $submit));

                foreach($this->getElements() as $element) {
                        $element->removeDecorator('DtDdWrapper')->removeDecorator('HtmlTag')->removeDecorator('Label');
                }
        }
}
