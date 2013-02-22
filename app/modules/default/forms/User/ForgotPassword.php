<?php

class Form_People_ForgotPassword extends Zend_Form
{
 	
    public function init()
    {
        $email_addr = new Zend_Form_Element_Text('email_addr');
        $email_addr->setLabel('Entrez votre adresse email')->setRequired(true)
        	->addValidator('EmailAddress', true, array('mx' => true, 'deep' => true))
        	->addValidator('Db_RecordExists', true, array('table' => 'site_people', 'field' => 'email_addr'))->addErrorMessages(array('L\'adresse e-mail n\'est  pas valide'));

		$submit = new Zend_Form_Element_Submit('forgotpassword_submit');
		$submit->setLabel('Valider');
		
        $this->addElements(array($email_addr, $submit));
        
        foreach($this->getElements() as $element) {
        	$element->removeDecorator('DtDdWrapper')->removeDecorator('HtmlTag')->removeDecorator('Label');
        }
    }
}
