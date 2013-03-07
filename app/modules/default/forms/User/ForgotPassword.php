<?php

class Form_User_ForgotPassword extends Zend_Form
{
 	
    public function init()
    {
        $email_addr = new Zend_Form_Element_Text('email');
        $email_addr->setRequired(true)
        	->addValidator('EmailAddress', true, array('mx' => true, 'deep' => true))
        	->addValidator('Db_RecordExists', true, array('table' => 'user', 'field' => 'email'));
        
        $this->addElements(array($email_addr));
        
        foreach($this->getElements() as $element) {
        	$element->removeDecorator('DtDdWrapper')->removeDecorator('HtmlTag')->removeDecorator('Label');
        }
    }
}
