<?php

class ComponentController extends Zend_Controller_Action
{
	public function init()
	{
		
		
	}
	
	public function slideshowAction()
	{

		$highlightTable = new Model_DbTable_Highlight();
		$this->view->slideshows = $highlightTable->getHighlightByHpslider();

		$this->_helper->viewRenderer->setResponseSegment('slideshow');
	}
	
	public function menuAction()
	{
		$taxonomyDB = new Model_DbTable_Taxonomies();
		$taxonomies = $taxonomyDB->getTaxonomiesByPos();
		$this->view->menus = $taxonomies;
		$this->_helper->viewRenderer->setResponseSegment('menu');
	}
	
	
	public function footermenuAction()
	{
		$postsDB = new Model_DbTable_Posts();
		$posts = $postsDB->getPostByTaxoId(21); // footer categorie
		$this->view->footermenu = $posts;
		$this->_helper->viewRenderer->setResponseSegment('footermenu');
	}
		
	public function spotlightAction()
	{
		$this->_helper->viewRenderer->setResponseSegment('slideshow');
	}
	
}



