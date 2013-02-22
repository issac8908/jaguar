<?php

class AjaxController extends Zend_Controller_Action
{
	/**
	 * Get http request
	 * @var Zend_Controller_Request_Http
	 */
	protected $_request = null;

	/**
	 * Initialiaze controller
	 * 
	 * @return void
	 */
	public function init()
	{
		$this->_helper->getHelper('layout')->disableLayout();
		
		$this->_request = $this->getRequest();
		
		if(!$this->_request->isXmlHttpRequest()) {
			//$this->_helper->json(array('error' => 500));
		}
	}
	
	/**
	 * Default action
	 * 
	 * @return JSON
	 */
	public function indexAction()
	{
		$this->_helper->viewRenderer->setNoRender();
		$this->_helper->json(array('error' => 500));
	}
	
	/**
	 * Manages the action on facebook like on an article.
	 * 
	 * @return JSON
	 */
	public function likeAction()
	{
		$this->_helper->viewRenderer->setNoRender();
		
		$postId = $this->_request->getParam('id', false);
		$remove = $this->_request->getParam('remove', false);
	
		if($postId) {
			
			if($remove) {
				// Not implemented yet
				// Remove one like
			} else {
				$postcountTable = new Model_DbTable_Posts();
				$count = $postcountTable->pushCount($postId);
					
				if($count) {
					$this->_helper->json(array('total' => $count));
					exit;
				}
			}
		}
		
		$this->_helper->json(array('error' => 500));
	}

	/**
	 * Get models car by brand
	 * 
	 * @return JSON
	 */
	public function modelsAction()
	{
		$this->_helper->viewRenderer->setNoRender();
		$brand = $this->_request->getParam('brand', false);
		
		if($brand) {
			$carsTable = new Model_DbTable_Cars();
			$rowset = $carsTable->getModelsByBrandName($brand);
			if($rowset) {
				$models = array();
				foreach($rowset as $row) {
					$models[strtolower($row['categorie_1'])] = ucfirst($row['categorie_1']);
				}
				$this->_helper->json($models);
				exit;
			}
		}
		$this->_helper->json(array('error' => 500));
	}
}