<?php

class Zend_View_Helper_WordLimiter extends Zend_View_Helper_Abstract
{
	public function wordLimiter($text, $limit = 20)
	{
	    $explode = explode(' ', $text);
	    $string  = '';
	
	    $dots = '...';
	    
	    if(count($explode) <= $limit){
	        $dots = '';
	        $limit = count($explode);
	    }
	   
	    for($i=0; $i < $limit; $i++){
	        $string .= $explode[$i] . " ";
	    }
	    
	    if ($dots) {
	        $string = substr($string, 0, strlen($string));
	    }
	
	    return $string . $dots;
	}
}