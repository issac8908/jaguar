<?php

class Zend_View_Helper_FormatChars extends Zend_View_Helper_Abstract
{
	public function formatChars($str)
	{
		$str = preg_replace('#<br */? *>#u', ' ', $str);
		$str = preg_replace('# +#', ' ', $str);
		$str = preg_replace("/(\r\n|\n|\r)/", '', $str);
		
		$str = html_entity_decode($str, ENT_QUOTES, 'UTF-8');
		
		$str = trim($str);
		
		return $str;
	}
}