<?php

class Form_User_StepThree extends Zend_Form
{
 	
    public function init()
    {
        
        $room_type = new Zend_Form_Element_Radio('room_type');
        $room_type->addMultiOptions(array(
        	'single' => $this->getView()->translate('single'),
        	'twin' => $this->getView()->translate('twin')
        ))->setSeparator('  ');
        
        $guest_name = new Zend_Form_Element_Text('guest_name');
        
        //$not_staying = new Zend_Form_Element_Checkbox('not_staying');
        $is_staying = new Zend_Form_Element_Radio('is_staying');
        $is_staying->addMultiOptions(array(
            '1' => $this->getView()->translate('yes'),
            '0' => $this->getView()->translate('no')
        ))->setSeparator('  ');
        
        $not_staying_reason = new Zend_Form_Element_Textarea('not_staying_reason');
        $not_staying_reason->setAttribs(array('rows'=>'5', 'cols'=> '40'));
        
        $is_joining_lunch = new Zend_Form_Element_Radio('is_joining_lunch');
        $is_joining_lunch->addMultiOptions(array(
            '1' => $this->getView()->translate('yes'),
            '0' => $this->getView()->translate('no')
        ))->setSeparator('  ');
        
        $this->addElements(array($room_type, $guest_name, $is_staying, $not_staying_reason, $is_joining_lunch));
        
        foreach($this->getElements() as $element) {
        	$element->removeDecorator('DtDdWrapper')->removeDecorator('HtmlTag')->removeDecorator('Label');
        }
    }
   
}
