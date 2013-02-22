<?php

class IndexController extends Zend_Controller_Action
{	
	public function init()
	{	
	/*	$actionStack = Zend_Controller_Action_HelperBroker::getStaticHelper('actionStack');	
		$actionStack->actionToStack('slideshow', 'component');
		$actionStack->actionToStack('menu', 'component');
		$actionStack->actionToStack('footermenu', 'component');

		$actionStack->actionToStack('pub', 'sidebar');
		$actionStack->actionToStack('follow', 'sidebar');
		$actionStack->actionToStack('tags', 'sidebar');
		$actionStack->actionToStack('newsletter', 'sidebar');
		$actionStack->actionToStack('recommanded', 'sidebar');
		$actionStack->actionToStack('register', 'sidebar');
         * 
         */
	}
	
	public function indexAction()
	{
                $auth = Zend_Auth::getInstance();
                
                if ($auth->hasIdentity()) {
                    
                    $identity = $auth->getIdentity();
                    
                    if (isset($identity)) {
                        $this->_helper->redirector('index', 'users');
                    }
                }
                
                $loginForm = $this->_getLoginForm();
                $this->view->code = substr(number_format(time() * rand(),0,'',''),0,20);
            /*	$highlightTable = new Model_DbTable_Highlight();
                    $tagsTable = new Model_DbTable_Tags();

                    $this->view->focus = $highlightTable->getHighlightByHpbloc();
                    $this->view->articles = $highlightTable->getHighlightByHplist();

                    $tagsRowset = $tagsTable->getTags(array('status' => 'enabled'));
                    if($tagsRowset) {
                            $tags = array();
                            foreach($tagsRowset as $value) {
                                    $tags[] = $value['title'];
                            }

                            $this->view->seo_keyword = implode(', ', $tags);
                    }

                    $this->view->ogTitle = 'Citoyens de la Route';
                    $this->view->ogDescription = $this->view->seo_description = 'Automobilistes et utilisateurs de 2 roues, ensemble, imaginons une route plus juste, plus sûre, plus libre et plus sereine.';
                    $this->view->ogImage = $this->view->getHttpHost(true) .  '/medias/images/app_pic.jpg';
                    $this->view->ogUrl = $this->view->getHttpHost(true);
             * 
             */
	}

	
	private function _getLoginForm()
        {
            $loginForm = new Form_User_Login(array('method' => 'post'));
            $this->view->loginForm = $loginForm;
            return $loginForm;
        }
	
}

