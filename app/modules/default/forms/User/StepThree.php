<?php

class Form_User_StepThree extends Zend_Form
{
 	
    public function init()
    {
        
        $room_type = new Zend_Form_Element_Select('room_type');
        $room_type->addMultiOptions(array(
        	'single' => 'Single',
        	'twin' => 'Twin'
        ));
        
        $guest_name = new Zend_Form_Element_Text('guest_name');
        
        $not_staying = new Zend_Form_Element_Checkbox('not_staying');
        
        $not_staying_reason = new Zend_Form_Element_Text('not_staying_reason');
        
        $is_joining_lunch = new Zend_Form_Element_Radio('is_joining_lunch');
        $is_joining_lunch->addMultiOptions(array(
            '1' => 'YES',
            '0' => 'NO'
        ));
        
        $this->addElements(array($room_type, $guest_name, $not_staying, $not_staying_reason, $is_joining_lunch));
        
        foreach($this->getElements() as $element) {
        	$element->removeDecorator('DtDdWrapper')->removeDecorator('HtmlTag')->removeDecorator('Label');
        }
    }
   
}
