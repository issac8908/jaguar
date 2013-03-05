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

    $('#is_staying-1').click(function(e) {
        $('.staying_at_hotel').show();
        $('.not_staying_at_hotel').hide();
        
        $('#room_type-single').parent().parent().click(function(){
             initPopupImportantNotice('IMPORTANT NOTICES / 重要提醒');

        });
       
    }); 

    $('#is_staying-0').click(function(e) {
        $('.staying_at_hotel').hide();
        $('.not_staying_at_hotel').show();
    });
});

function initPopupReminder(title)
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
            '<div>FRIENDLY REMINDERS</div>\n\
            <div>- Guests staying at the Intercontinental Hotel are to arrive at the hotel before 11:00am April 8th to check in.</div>\n\
            <div>- Lunch is provided at the Intercontinental hotel on April 8th.</div>\n\
            <div>- Guests are expected at the Shanghai Pudong Expo Center at 12:30pm for conference registration.</div>\n\
            <div>- Your ID card or passport is required for conference access.</div>\n\
            <div>- Flights and accommodation to be handled and paid for independently by guests.</div>\n\
            <div>- No cameras allowed during the event.</div>\n\
            <div>- If you wish to invite an additional guest, please RSVP by calling 021-62585325 62585320 (working hours: 09:30 – 18:30) no later than March 31st</div>\n\
            <div>- Further inquiries about the event please contact Juliet Zhou: 021-61563007</div>\n\
            <div>- Emergency number +86 135 5015 6344 is 24 hours available from April 7th to April 9th</div>'
    );
    //$('#popup-reminder').css({top:'50%',left:'50%',margin:'-'+($('##popup-reminder').height() / 2)+'px 0 0 -'+($('#myDiv').width() / 2)+'px'});
    $('#popup-reminder').dialog('open');
}

function initPopupImportantNotice(title)
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
    $('#popup-important-notice').html(
            '<div>Important Notes:</div>\n\
            <div>- Jaguar Land Rover China has collaborated with Intercontinental Hotel to guarantee you a number of rooms available at a special rate of 1,100RMB net per night. In the case you want to book with Intercontinental Hotel, our team will contact you individually via phone call within a couple of days to help you in the booking process, therefore we need you to provide us with your bank account number to secure your room availability.</div>\n\
            <div>- Please inform the RSVP person for hotel cancellation in 2 days advance, otherwise your room rate will be automatically deducted from your bank account.</div>\n\
            <div>- Privacy Statement: Your bank account information is ONLY for this hotel book and JLR will definitely not put them on the website or apply for any other intentions.</div>'
    );
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
    }
}

function setCookie(name,value) {
    var Days = 30; 
    var exp  = new Date(); 
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape(value) +";expires="+ exp.toGMTString() + ";path=/";
}

