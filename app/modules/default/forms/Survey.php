<?php

class Form_Survey extends Zend_Form
{
 	
        public function init()
        {

                $s1 = new Zend_Form_Element_Radio('s1_overall');
                $s1 = $this->_addMultiOptions($s1);
                
                $s2 = new Zend_Form_Element_Radio('s2_hospitality');
                $s2 = $this->_addMultiOptions($s2);
                
                $s3 = new Zend_Form_Element_Radio('s3_venue');
                $s3 = $this->_addMultiOptions($s3);
                
                $s4 = new Zend_Form_Element_Radio('s4_food');
                $s4 = $this->_addMultiOptions($s4);
                
                $s5 = new Zend_Form_Element_Radio('s5_dinner');
                $s5 = $this->_addMultiOptions($s5);
                
                $s6_1 = new Zend_Form_Element_Radio('s6_1_cust_adv');
                $s6_1 = $this->_addMultiOptions($s6_1);
                
                $s6_2 = new Zend_Form_Element_Radio('s6_2_jnt_venture');
                $s6_2 = $this->_addMultiOptions($s6_2);
                
                $s6_3 = new Zend_Form_Element_Radio('s6_3_buss_int');
                $s6_3 = $this->_addMultiOptions($s6_3);
                
                $s6_4 = new Zend_Form_Element_Radio('s6_4_sales_obj');
                $s6_4 = $this->_addMultiOptions($s6_4);
                
                $s6_5 = new Zend_Form_Element_Radio('s6_5_network_dev');
                $s6_5 = $this->_addMultiOptions($s6_5);
                
                $s6_6 = new Zend_Form_Element_Radio('s6_6_deal_struct');
                $s6_6 = $this->_addMultiOptions($s6_6);
                
                $s6_7 = new Zend_Form_Element_Radio('s6_7_cs_org');
                $s6_7 = $this->_addMultiOptions($s6_7);
                
                $s6_8 = new Zend_Form_Element_Radio('s6_8_nps');
                $s6_8 = $this->_addMultiOptions($s6_8);
                
                $s6_9 = new Zend_Form_Element_Radio('s6_9_3g');
                $s6_9 = $this->_addMultiOptions($s6_9);
                
                $s6_10 = new Zend_Form_Element_Radio('s6_10_it');
                $s6_10 = $this->_addMultiOptions($s6_10);
                
                $s6_11 = new Zend_Form_Element_Radio('s6_11_fin_model');
                $s6_11 = $this->_addMultiOptions($s6_11);
                
                $s6_12 = new Zend_Form_Element_Radio('s6_12_pr_comm');
                $s6_12 = $this->_addMultiOptions($s6_12);
                
                $s6_13 = new Zend_Form_Element_Radio('s6_13_brand_health');
                $s6_13 = $this->_addMultiOptions($s6_13);
                
                $s6_14 = new Zend_Form_Element_Radio('s6_14_mkt_plan');
                $s6_14 = $this->_addMultiOptions($s6_14);
                
                $s6_15 = new Zend_Form_Element_Radio('s6_15_mkt_support');
                $s6_15 = $this->_addMultiOptions($s6_15);
                
                $s6_16 = new Zend_Form_Element_Radio('s6_16_mkt_vision');
                $s6_16 = $this->_addMultiOptions($s6_16);
                
                $s6_17 = new Zend_Form_Element_Radio('s6_17_evoque_plan');
                $s6_17 = $this->_addMultiOptions($s6_17);
                
                $s6_18 = new Zend_Form_Element_Radio('s6_18_new_prod');
                $s6_18 = $this->_addMultiOptions($s6_18);
                
                $s6_19 = new Zend_Form_Element_Radio('s6_19_other');
                $s6_19 = $this->_addMultiOptions($s6_19);
                
                $s6_19_topic = new Zend_Form_Element_Text('s6_19_topic');
                $s6_19_topic->setAttrib('placeholder', $this->getView()->translate('please_specify'));
                
                
                $s7 = new Zend_Form_Element_Textarea('s7_best_speaker');
                $s7->setAttrib('rows', '3');
                
                $s8 = new Zend_Form_Element_Textarea('s8_strategies');
                $s8->setAttrib('rows', '3');
                
                $s9 = new Zend_Form_Element_Radio('s9_faith_jaguar');
                $s9->addMultiOptions(array(
                    'very strong' => $this->getView()->translate('very strong'),
                    'strong' => $this->getView()->translate('strong'),
                    'average' => $this->getView()->translate('average'),
                    'weak' => $this->getView()->translate('weak')
                    ))->setSeparator('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');//->setRequired(true);
                
                $s10 = new Zend_Form_Element_Radio('s10_faith_jlr');
                $s10->addMultiOptions(array(
                    'very strong' => $this->getView()->translate('very strong'),
                    'strong' => $this->getView()->translate('strong'),
                    'average' => $this->getView()->translate('average'),
                    'weak' => $this->getView()->translate('weak')
                    ))->setSeparator('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');//->setRequired(true);
                
                $s11 = new Zend_Form_Element_Radio('s11_advice');
                $s11->addMultiOptions(array(
                    'yes' => $this->getView()->translate('yes_i_have'),
                    'no' => $this->getView()->translate('no_i_dont_have')
                ))->setSeparator('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');//->setRequired(true);
                
                $s11_advice_details = new Zend_Form_Element_Textarea('s11_advice_details');
                $s11_advice_details->setAttrib('rows', '3');
                        //->setAttrib('placeholder', $this->getView()->translate('if_yes'));
                        
                
                $s12 = new Zend_Form_Element_Radio('s12_expectations');
                $s12->addMultiOptions(array(
                    'yes' => $this->getView()->translate('yes_i_have'),
                    'no' => $this->getView()->translate('no_i_dont_have')
                ))->setSeparator('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');//->setRequired(true);
                
                $s12_expectation_details = new Zend_Form_Element_Textarea('s12_expectation_details');
                $s12_expectation_details->setAttrib('rows', '3');
                        //->setAttrib('placeholder', $this->getView()->translate('if_yes'));
                
                $this->addElements(array(
                    $s1, $s2, $s3, $s3, $s4, $s5, 
                    $s6_1, $s6_2, $s6_3, $s6_4, $s6_5, $s6_6, $s6_7, $s6_8, 
                    $s6_9, $s6_10, $s6_11, $s6_12, $s6_13, $s6_14, $s6_15, $s6_16,
                    $s6_17, $s6_18, $s6_19, $s6_19_topic,
                    $s7, $s8, $s9, $s10, $s11, $s11_advice_details, $s12, $s12_expectation_details
                ));

                foreach($this->getElements() as $element) {
                        $element->removeDecorator('DtDdWrapper')->removeDecorator('HtmlTag')->removeDecorator('Label')->setRequired(false);
                }
        }
        
        private function _addMultiOptions($s) 
        {
            $s->addMultiOptions(array(
                'excellent' => $this->getView()->translate('excellent'),
                'good' => $this->getView()->translate('good'),
                'average' => $this->getView()->translate('average'),
                'bad' => $this->getView()->translate('bad'),
            ))->setSeparator('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
            return $s;
        }
}

