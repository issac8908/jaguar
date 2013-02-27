<?php

class Form_User_StepTwo extends Zend_Form
{
 	
        public function init()
        {

                $arrival_date = new Zend_Form_Element_Text('arrival_date');
                $arrival_date->setRequired(true);
		//->addValidator('Date', true,'m/d/Y');
                
                $departure_date = new Zend_Form_Element_Text('departure_date');
                
                $arrival_transportation = new Zend_Form_Element_Select('arrival_transportation');
                $arrival_transportation->addMultiOptions(array(
                        'airplane' => 'Airplane',
                        'train' => 'Train',
                        'car' => 'Car'
                ));

                $departure_transportation = new Zend_Form_Element_Select('departure_transportation');
                $departure_transportation->addMultiOptions(array(
                        'airplane' => 'Airplane',
                        'train' => 'Train',
                        'car' => 'Car'
                ));

                $arrival_from = new Zend_Form_Element_Select('arrival_from');
                $departure_to = new Zend_Form_Element_Select('departure_to');
                
                $city_table = new Model_DbTable_Cities();
                $cities = $city_table->getCities();
                if ($cities) {
                    foreach ($cities as $c) {
                        $arrival_from->addMultiOption($c['cid'], $c['ch_name']);
                        $departure_to->addMultiOption($c['cid'], $c['ch_name']);
                    }
                }
                
                $arrival_time = new Zend_Form_Element_Text('arrival_time');
                $departure_time = new Zend_Form_Element_Text('departure_time');


                $this->addElements(array($arrival_date, $departure_date, 
                                         $arrival_transportation, $departure_transportation, 
                                         $arrival_from, $departure_to,
                                         $arrival_time, $departure_time
                ));

                foreach($this->getElements() as $element) {
                        $element->removeDecorator('DtDdWrapper')->removeDecorator('HtmlTag')->removeDecorator('Label');
                }
                
        }
   
}
