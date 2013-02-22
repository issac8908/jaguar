<?php

class Zend_View_Helper_FormatBytes extends Zend_View_Helper_Abstract
{
	public function formatBytes($filesize)
	{	
		if ($filesize < 1024) {
	        return $filesize .' B';
	    } elseif ($filesize < 1048576) {
	        return round($filesize / 1024, 2) .' KiB';
	    } elseif ($filesize < 1073741824) {
	        return round($filesize / 1048576, 2) . ' MiB';
	    } elseif ($filesize < 1099511627776) {
	        return round($filesize / 1073741824, 2) . ' GiB';
	    } elseif ($filesize < 1125899906842624) {
	        return round($filesize / 1099511627776, 2) .' TiB';
	    } elseif ($filesize < 1152921504606846976) {
	        return round($filesize / 1125899906842624, 2) .' PiB';
	    } elseif ($filesize < 1180591620717411303424) {
	        return round($filesize / 1152921504606846976, 2) .' EiB';
	    } elseif ($filesize < 1208925819614629174706176) {
	        return round($filesize / 1180591620717411303424, 2) .' ZiB';
	    } else {
	        return round($filesize / 1208925819614629174706176, 2) .' YiB';
	    }
	}
}