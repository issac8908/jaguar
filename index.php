<?php

defined('APP_PATH') || define('APP_PATH', realpath(dirname(__FILE__) . '/app'));
//defined('APP_ENV') || define('APP_ENV', (getenv('APP_ENV') ? getenv('APP_ENV') : 'testing'));


    define('APP_ENV', 'development');
    set_include_path(implode(PATH_SEPARATOR, array(realpath('/Applications/MAMP/htdocs/ZendFramework-1.11.12/library'), realpath('F:\wamp\www\ZendFramework-1.12.0\library'), get_include_path())));
    define('RESOURCES_LANGUAGES', realpath('F:\wamp\www\ZendFramework-1.12.0\resources\languages'));

require_once 'Zend/Application.php';

$application = new Zend_Application(APP_ENV, APP_PATH . '/configs/app.ini');
$application->bootstrap()->run();
