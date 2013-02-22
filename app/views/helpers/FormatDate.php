<?php

class Zend_View_Helper_FormatDate extends Zend_View_Helper_Abstract
{
	
	public function formatDate($date, $format = null)
	{	
		$date = new Zend_Date($date);
		if($format !== null) {
			return $date->toString($format);
		}
		
		return $date;
	}
	
}