$(document).ready(function () {	
    
    $("#popup-form").hide().fadeIn(4000);
    $('#step-one').show();
    $('#step-two', '#step-three').hide();
    
    $('input[name="position"]').click(function(){
        showPosition();
    });

    $('#stepTwoBackBtn').click(function(){
        $('#step-two').hide();
        $('#step-one').show();
    });

    $('#stepThreeBackBtn').click(function(){
        $('#step-three').hide();
        $('#step-two').show();
    });

    $('#stepTwoNextBtn').click(function(e) {
        e.preventDefault();
        $('#step-two').hide();
        $('ul li#trans').removeClass('active');
        $('ul li#accomodation').addClass('active');
        $('#step-three').show();
    });

    $('#is_staying-0').click(function(e) {
        $('.staying_at_hotel').hide();
        $('.not_staying_at_hotel').show();
    });
});

function initPopupReminder(title, popupReminderText)
{
    $('#popup-reminder').dialog({
        autoOpen: false,
        modal: true,
        title: title,
        width: 700,
        show: { effect: 'fade', duration: 500 },
        hide: { effect: 'hide', duration: 500 },
        buttons: {
            'Close': function(){
                $(this).dialog("close");
                $('#register-form form').submit();
            }
        }
    });
    $('#popup-reminder').html(
            popupReminderText
    );
    //$('#popup-reminder').css({top:'50%',left:'50%',margin:'-'+($('##popup-reminder').height() / 2)+'px 0 0 -'+($('#myDiv').width() / 2)+'px'});
    $('#popup-reminder').dialog('open');
}

function initPopupImportantNotice(title, importantNoticesForRoomType)
{
    $('#popup-important-notice').dialog({
        autoOpen: false,
        modal: true,
        title: title,
        width: 700,
        show: { effect: 'fade', duration: 500 },
        hide: { effect: 'hide', duration: 500 },
        buttons: {
            'Close': function(){
                $(this).dialog("close");
            }
        }
    });
    $('#popup-important-notice').html(importantNoticesForRoomType);
    $('#popup-important-notice').dialog('open');
}

function showPosition()
{
    var value = $('input[name="position"]:checked').val();
    if (value === 'group_head') {
        $('#group_name').parent().parent().show();
        $('#group_title').parent().parent().show();
        $('#dms_code').parent().parent().hide();
        $('#company_name').parent().parent().hide();
        $('#company_title').parent().parent().hide();
    } else if (value === 'manager') {
        $('#group_name').parent().parent().hide();
        $('#group_title').parent().parent().hide();
        $('#dms_code').parent().parent().show();
        $('#company_name').parent().parent().hide();
        $('#company_title').parent().parent().hide();
    } else if (value === 'partner') {
        $('#group_name').parent().parent().hide();
        $('#group_title').parent().parent().hide();
        $('#dms_code').parent().parent().hide();
        $('#company_name').parent().parent().show();
        $('#company_title').parent().parent().show();
    } else if (value === 'internals') {
        $('#group_name').parent().parent().hide();
        $('#group_title').parent().parent().hide();
        $('#dms_code').parent().parent().hide();
        $('#company_name').parent().parent().hide();
        $('#company_title').parent().parent().hide();
    }
}

function setCookie(name,value) {
    var Days = 30; 
    var exp  = new Date(); 
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape(value) +";expires="+ exp.toGMTString() + ";path=/";
}

