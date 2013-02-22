<?php

class Zend_View_Helper_GetHttpHost extends Zend_View_Helper_Abstract
{
	public function getHttpHost($full = false)
	{
	   $front = Zend_Controller_Front::getInstance();
	   
	   if($full === true) {
	   		return $front->getRequest()->getScheme() . '://' . $front->getRequest()->getHttpHost();
	   }
	   
	   return $front->getRequest()->getHttpHost();
	}
}