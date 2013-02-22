function getFrDay(num) {
    if (num === '1') 
        return "Lu";
    else if (num === '2')
        return 'Ma';
    else if (num === '3')
        return 'Me';
    else if (num === '4')
        return 'Je';
    else if (num === '5')
        return 'Ve';
    else if (num === '6')
        return 'Sa';
    else if (num === '7')
        return 'Di';
}

function getEnDay(num) {
    if (num === '1') 
        return "Mo";
    else if (num === '2')
        return 'Tu';
    else if (num === '3')
        return 'We';
    else if (num === '4')
        return 'Th';
    else if (num === '5')
        return 'Fr';
    else if (num === '6')
        return 'Sa';
    else if (num === '7')
        return 'Su';
}