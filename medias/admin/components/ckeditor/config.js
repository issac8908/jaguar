/*
Copyright (c) 2003-2012, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.editorConfig = function( config )
{
    // Define changes to default configuration here. For example:
    // config.language = 'fr';
    //config.uiColor = //'#AADC6E';
    config.contentsCss = '/medias/css/fonts.css';
    config.font_names = 'HelveticaNeueBold; HelveticaNeue; HelveticaNeueLight;'+ config.font_names;
    config.fontSize_sizes = '8/8px;' 
            + '9/9px;' 
            + '10/10px;' 
            + '11/11px;' 
            + '12/12px;' 
            + '13/13px;' 
            + '14/14px;' 
            + '15/15px;' 
            + '16/16px;' 
            + '17/17px;' 
            + '18/18px;' 
            + '19/19px;' 
            + '20/20px;' 
            + '21/21px;' 
            + '22/22px;' 
            + '23/23px;' 
            + '24/24px;' 
            + '25/25px;' 
            + '26/26px;';// + config.fontSize_sizes  ;
    config.indentOffset = 20;
};
