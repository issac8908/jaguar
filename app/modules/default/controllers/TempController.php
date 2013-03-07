<?php

class TempController extends Zend_Controller_Action
{
	
	public function init()
	{
	}
	
        public function indexAction()
        {
            $table = new Model_DbTable_Temp();
            //$table->addTable();
           die(print_r($table->getUserTempLoginTable()));
        }
  
        

        
        
}

