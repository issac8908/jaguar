<?php

class Zend_View_Helper_GetCrop extends Zend_View_Helper_Abstract
{
	public function getCrop($coords)
	{
		if(!empty($coords)) {
			$decode = Zend_Json::decode($coords);
			
			return 'crop_' . $decode['filename'];
		}
		
		return false;
	}
}