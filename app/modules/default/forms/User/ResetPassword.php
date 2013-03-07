<?php

class Form_User_ResetPassword extends Zend_Form
{
 	
    public function init()
    {
        
        $uid = new Zend_Form_Element_Hidden('uid');
        
        $password = new Zend_Form_Element_Password('password');
        $password->setRequired(true)->addValidator('StringLength', true, array('min' => 6));


        $confirm_password = new Zend_Form_Element_Password('confirm_password');
        $confirm_password->setRequired(true)->addValidator('identical', true, array('token' => 'password'));
        
        $this->addElements(array($uid, $password, $confirm_password));
        
        foreach($this->getElements() as $element) {
        	$element->removeDecorator('DtDdWrapper')->removeDecorator('HtmlTag')->removeDecorator('Label');
        }
    }
}
