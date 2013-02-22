<?php

include_once 'Facebook/facebook.php';

class Carburant_Facebook extends Facebook
{
	/**
	 * Permission
	 * @var string
	 */
	private $_scope = null;
	
	
	public function __construct($params)
	{
		if(!array_key_exists('appId', $params)) {
			require_once 'Zend/Exception.php';
			throw new Zend_Exception('Facebook "appId" parameter does not exist.');
		}
		
		if(!array_key_exists('secret', $params)) {
			require_once 'Zend/Exception.php';
			throw new Zend_Exception('Facebook "secret" parameter does not exist.');
		}
		
		if(null !== $params['scope']) {
			$this->setScope($params['scope']);
		}
		
		parent::__construct($params);
	}
	
	/**
	 * Assign scopes
	 * 
	 * @param string $scope
	 */
	public function setScope($scope)
	{
		$this->_scope = $scope;
	}
	
	/**
	 * Get a scopes
	 * 
	 * @return string
	 */
	public function getScope()
	{
		return $this->_scope;
	}
	
	/**
	 * Shows whether a user shares information with the application
	 * 
	 * @return mixed (false or user ID)
	 */
	public function isConnected()
	{
		$user = $this->getUser();
		
		if($user) {
			return $user;
		} else {
			return false;
		}
	}
	
	/**
	 * Get a application access token
	 * 
	 * @return string (appId|secret)
	 */
	public function getAppAccessToken()
	{
		return $this->getApplicationAccessToken();
	}
	
	/**
	 * Post a open graph action
	 * 
	 * @param string $namespace
	 * @param string $action (action type of Facebook)
	 * @param array $object (key is object and value is URL page OG)
	 */
	public function postAction($namespace, $action, $object)
	{
		if(!is_array($object)) {
			return false;
		}
		
		$params = array();
		$params['access_token'] = $this->getAccessToken();
		
		try {
			$this->api('/' . $this->getUser() . '/'. $namespace . ':' . $action, 'post', array_merge($params, $object));
		} catch(Exception $e) {
			return false;
		}
	}
	
	/**
	 * Post a achievement success user
	 * 
	 * @param string $url (URL of achievement OG)
	 * @return false if 
	 */
	public function postUserAchievement($url)
	{
		$params = array();
		$params['access_token'] = $this->getAppAccessToken();
		
		try {
			$this->api('/' . $this->getUser() . '/achievements', 'post', array_merge($params, $url));
		} catch(Exception $e) {
			return false;
		}
	}
	
	/**
	 * Delete a achievement application by unique URL
	 *
	 * @param string $url
	 * @return boolean
	 */
	public function deleteUserAchievement($url)
	{
		$params = array();
		$params['access_token'] = $this->getAppAccessToken();
		$params['achievement'] = $url;
	
		try {
			return $this->api('/' . $this->getUser() . '/achievements', 'delete', $params);
		} catch(Exception $e) {
			return false;
		}
	}
	
	/**
	 * Register an achievement
	 * 
	 * @param string $url
	 * @param int $order
	 */
	public function createAppAchievement($url, $order = 1)
	{
		$params = array();
		$params['access_token'] = $this->getAppAccessToken();
		$params['achievement'] = $url;
		$params['display_order'] = $order;
		
		try {
			$this->api('/' . $this->getAppId() . '/achievements', 'post', $params);
		} catch(Exception $e) {
			return false;
		}
	}
	
	/**
	 * Return achievement
	 * 
	 * @return mixed
	 */
	public function readAppAchievement()
	{
		$params = array();
		$params['access_token'] = $this->getAppAccessToken();
		
		try {
			return $this->api('/' . $this->getAppId() . '/achievements', 'get', $params);
		} catch(Exception $e) {
			return false;
		}
	}
	
	/**
	 * Delete a achievement application by unique URL
	 * 
	 * @param string $url
	 * @return boolean
	 */
	public function deleteAppAchievement($url)
	{
		$params = array();
		$params['access_token'] = $this->getAppAccessToken();
		$params['achievement'] = $url;
		
		return $this->api('/' . $this->getAppId() . '/achievements', 'delete', $params);
	}
}