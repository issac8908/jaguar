    
    getOrigins();

    $('li.eco .sbToggle, li.eco .sbSelector').click(function(event){
        event.preventDefault();
        clickDropdown('li.eco .sbOptions');
    });

    $('li.quote .sbToggle, li.quote .sbSelector').click(function(event){
        event.preventDefault();
        clickDropdown('li.quote .sbOptions');
    });

    $('li.transport .sbToggle, li.transport .sbSelector').click(function(event){
        event.preventDefault();
        clickDropdown('li.transport .sbOptions');
    });

    $('#transport-form .depart .sbToggle, #transport-form .depart .sbSelector').click(function(event) {
        event.preventDefault();
        clickDropdown('#transport-form .depart .sbOptions');
    });

    $('#transport-form .arrivee .sbToggle, #transport-form .arrivee .sbSelector').click(function(event) {
        event.preventDefault();
        clickDropdown('#transport-form .arrivee .sbOptions');
    });

    $('#core-left .sbToggle, #core-left .sbSelector').click(function(event){
        event.preventDefault();
        clickDropdown('#core-left .sbOptions');
    });
   
    var ecoMouseOver = false;
    var quoteMouseOver = false;
    var transportMouseOver = false;
    var coreLeftMouseOver = false;
    var transportFormDepartMouseOver = false;
    var transportFormArriveeMouseOver = false;
    $("li.eco .sbHolder").mouseover(function(){ecoMouseOver=true;});
    $("li.eco .sbHolder").mouseout(function(){ecoMouseOver=false;});
    $("li.quote .sbHolder").mouseover(function(){quoteMouseOver=true;});
    $("li.quote .sbHolder").mouseout(function(){quoteMouseOver=false;});
    $("li.transport .sbHolder").mouseover(function(){transportMouseOver=true;});
    $("li.transport .sbHolder").mouseout(function(){transportMouseOver=false;});
    $("#core-left .sbHolder").mouseover(function(){coreLeftMouseOver=true;});
    $("#core-left .sbHolder").mouseout(function(){coreLeftMouseOver=false;});
    $("#transport-form .depart .sbHolder").mouseover(function(){transportFormDepartMouseOver=true;});
    $("#transport-form .depart .sbHolder").mouseout(function(){transportFormDepartMouseOver=false;});
    $("#transport-form .arrivee .sbHolder").mouseover(function(){transportFormArriveeMouseOver=true;});
    $("#transport-form .arrivee .sbHolder").mouseout(function(){transportFormArriveeMouseOver=false;});
    $("*").click(function(){
        if(ecoMouseOver === false) {
            $("li.eco .sbOptions").hide();
        }
        if(quoteMouseOver === false) {
            $("li.quote .sbOptions").hide();
        }
        if(transportMouseOver === false) {
           $("li.transport .sbOptions").hide();
        }
        if(coreLeftMouseOver === false) {
           $("#core-left .sbOptions").hide();
        }
        if(transportFormDepartMouseOver === false) {
           $("#transport-form .depart .sbOptions").hide();
        }
        if(transportFormArriveeMouseOver === false) {
           $("#transport-form .arrivee .sbOptions").hide();
        }
    });

function clickDropdown(elt) {
    if ($(elt).is(':hidden')) {
        $(elt).show();
    } else {
        $(elt).hide(); 
    };
}

function getOrigins() {
    $.ajax({
        type: "post",
        dataType: "json",
        url: "/transport-plan/get-origin-stations", 
        success: function(res) {
            $.each(res, function(k, v) {
                $.each(v, function(k1, v1) {
                    $('li.eco .sbOptions').append('<li><a href="/sustainable/ecocalculator/id_leaf_origin/' + v1.id + '">' + v1.label + '</a></li>');
                    $('li.quote .sbOptions').append('<li><a href="/services/quotation/depart/' + v1.label + '">' + v1.label + '</a></li>');
                    $('li.transport .sbOptions').append('<li><a href="/transport-map/simulator/id_leaf_origin/' + v1.id + '">' + v1.label + '</a></li>');
                    $('#core-left .sbOptions').append('<li><a href="/transport-map/simulator/id_leaf_origin/' + v1.id + '">' + v1.label + '</a></li>');
                    $('#transport-form .depart .sbOptions').append('<li id="id_leaf_origin_' + v1.id + '"><a>' + v1.label + '</a></li>');
                    $('#transport-form .arrivee .sbOptions').append('<li id="id_leaf_destination_' + v1.id + '"><a>' + v1.label + '</a></li>');
                });
            });
            
            
            var selectedOriginID = $('#transport-form .depart .sbSelector').attr('value');
            if (selectedOriginID) {
                var selectedOrigin = $('#id_leaf_origin_' + selectedOriginID + ' a').html();
                $('#transport-form .depart .sbSelector').html(selectedOrigin);
            }
            
            $('#transport-form .depart .sbOptions li a').click(function(event){
                event.preventDefault();
                $('#transport-form .depart .sbSelector').html($(this).html());
                $('#transport-form .depart .sbSelector').attr('value', $(this).parent().attr('id').substr('15'));
                $('#transport-form .arrivee .sbSelector').html('--Choisir la ville--');
                $('#transport-form .arrivee .sbSelector').attr('value', '');
                clickDropdown('#transport-form .depart .sbOptions');
                getDestination($(this).parent().attr('id').substr('15'));
                
            });

            $('#transport-form .arrivee .sbOptions li a').click(function(event){
                event.preventDefault();
                $('#transport-form .arrivee .sbSelector').html($(this).html());
                $('#transport-form .arrivee .sbSelector').attr('value', $(this).parent().attr('id').substr('20'));
                clickDropdown('#transport-form .arrivee .sbOptions');
            });
        }
    });
}

function getDestination(id_leaf_origin) {
    $('#transport-form .arrivee .sbOptions').empty();
    $.ajax({
        type: 'post',
        dataType: "json",
        url: '/transport-plan/get-destination-stations/id_leaf_origin/' + id_leaf_origin,
        success: function(res) {
            $.each(res, function(k, v) {
                $.each(v, function(k1, v1) {
                    $('#transport-form .arrivee .sbOptions').append('<li id="id_leaf_destination_' + v1.id + '"><a>' + v1.label + '</a></li>');
                });
            });
            $('#transport-form .arrivee .sbOptions li a').click(function(event){
                event.preventDefault();
                $('#transport-form .arrivee .sbSelector').html($(this).html());
                $('#transport-form .arrivee .sbSelector').attr('value', $(this).parent().attr('id').substr('20'));
                clickDropdown('#transport-form .arrivee .sbOptions');
            });
        }
    });
}

