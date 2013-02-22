<?php

class Zend_View_Helper_StripTags extends Zend_View_Helper_Abstract
{
	public function stripTags($text)
	{
		$filter = new Zend_Filter_StripTags();
		return $filter->filter($text);
	}
}