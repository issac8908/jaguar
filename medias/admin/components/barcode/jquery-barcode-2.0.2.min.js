/*
 *  BarCode Coder Library (BCC Library)
 *  BCCL Version 2.0
 *    
 *  Porting : jQuery barcode plugin 
 *  Version : 2.0.2
 *   
 *  Date  : March 01, 2011
 *  Author  : DEMONTE Jean-Baptiste <jbdemonte@gmail.com>
 *            HOUREZ Jonathan
 *             
 *  Web site: http://barcode-coder.com/
 *  dual licence :  http://www.cecill.info/licences/Licence_CeCILL_V2-fr.html
 *                  http://www.gnu.org/licenses/gpl.html
 */ 
(function(b){var a={settings:{barWidth:1,barHeight:50,moduleSize:5,showHRI:true,addQuietZone:true,marginHRI:5,bgColor:"#FFFFFF",color:"#000000",fontSize:10,output:"css",posX:0,posY:0},intval:function(d){var c=typeof(d);if(c=="string"){d=d.replace(/[^0-9-.]/g,"");d=parseInt(d*1,10);return isNaN(d)||!isFinite(d)?0:d}return c=="number"&&isFinite(d)?Math.floor(d):0},i25:{encoding:["NNWWN","WNNNW","NWNNW","WWNNN","NNWNW","WNWNN","NWWNN","NNNWW","WNNWN","NWNWN"],compute:function(g,j,f){if(!j){if(g.length%2!=0){g="0"+g}}else{if((f=="int25")&&(g.length%2==0)){g="0"+g}var h=true,c,e=0;for(var d=g.length-1;d>-1;d--){c=a.intval(g.charAt(d));if(isNaN(c)){return("")}e+=h?3*c:c;h=!h}g+=((10-e%10)%10).toString()}return(g)},getDigit:function(k,l,h){k=this.compute(k,l,h);if(k==""){return("")}result="";var f,d;if(h=="int25"){result+="1010";var g,e;for(f=0;f<k.length/2;f++){g=k.charAt(2*f);e=k.charAt(2*f+1);for(d=0;d<5;d++){result+="1";if(this.encoding[g].charAt(d)=="W"){result+="1"}result+="0";if(this.encoding[e].charAt(d)=="W"){result+="0"}}}result+="1101"}else{if(h=="std25"){result+="11011010";var m;for(f=0;f<k.length;f++){m=k.charAt(f);for(d=0;d<5;d++){result+="1";if(this.encoding[m].charAt(d)=="W"){result+="11"}result+="0"}}result+="11010110"}}return(result)}},ean:{encoding:[["0001101","0100111","1110010"],["0011001","0110011","1100110"],["0010011","0011011","1101100"],["0111101","0100001","1000010"],["0100011","0011101","1011100"],["0110001","0111001","1001110"],["0101111","0000101","1010000"],["0111011","0010001","1000100"],["0110111","0001001","1001000"],["0001011","0010111","1110100"]],first:["000000","001011","001101","001110","010011","011001","011100","010101","010110","011010"],getDigit:function(h,g){var d=g=="ean8"?7:12;h=h.substring(0,d);if(h.length!=d){return("")}var k;for(var f=0;f<h.length;f++){k=h.charAt(f);if((k<"0")||(k>"9")){return("")}}h=this.compute(h,g);var j="101";if(g=="ean8"){for(var f=0;f<4;f++){j+=this.encoding[a.intval(h.charAt(f))][0]}j+="01010";for(var f=4;f<8;f++){j+=this.encoding[a.intval(h.charAt(f))][2]}}else{var e=this.first[a.intval(h.charAt(0))];for(var f=1;f<7;f++){j+=this.encoding[a.intval(h.charAt(f))][a.intval(e.charAt(f-1))]}j+="01010";for(var f=7;f<13;f++){j+=this.encoding[a.intval(h.charAt(f))][2]}}j+="101";return(j)},compute:function(f,e){var c=e=="ean13"?12:7;f=f.substring(0,c);var d=0,g=true;for(i=f.length-1;i>-1;i--){d+=(g?3:1)*a.intval(f.charAt(i));g=!g}return(f+((10-d%10)%10).toString())}},msi:{encoding:["100100100100","100100100110","100100110100","100100110110","100110100100","100110100110","100110110100","100110110110","110100100100","110100100110"],compute:function(c,d){if(typeof(d)=="object"){if(d.crc1=="mod10"){c=this.computeMod10(c)}else{if(d.crc1=="mod11"){c=this.computeMod11(c)}}if(d.crc2=="mod10"){c=this.computeMod10(c)}else{if(d.crc2=="mod11"){c=this.computeMod11(c)}}}else{if(typeof(d)=="boolean"){if(d){c=this.computeMod10(c)}}}return(c)},computeMod10:function(h){var d,g=h.length%2;var f=0,e=0;for(d=0;d<h.length;d++){if(g){f=10*f+a.intval(h.charAt(d))}else{e+=a.intval(h.charAt(d))}g=!g}var c=(2*f).toString();for(d=0;d<c.length;d++){e+=a.intval(c.charAt(d))}return(h+((10-e%10)%10).toString())},computeMod11:function(f){var e=0,c=2;for(var d=f.length-1;d>=0;d--){e+=c*a.intval(f.charAt(d));c=c==7?2:c+1}return(f+((11-e%11)%11).toString())},getDigit:function(e,g){var d="0123456789";var c=0;var f="";e=this.compute(e,false);f="110";for(i=0;i<e.length;i++){c=d.indexOf(e.charAt(i));if(c<0){return("")}f+=this.encoding[c]}f+="1001";return(f)}},code11:{encoding:["101011","1101011","1001011","1100101","1011011","1101101","1001101","1010011","1101001","110101","101101"],getDigit:function(d){var q="0123456789-";var g,l,o="",h="0";o="1011001"+h;for(g=0;g<d.length;g++){l=q.indexOf(d.charAt(g));if(l<0){return("")}o+=this.encoding[l]+h}var p=0,e=0,j=1,m=0;for(g=d.length-1;g>=0;g--){p=p==10?1:p+1;j=j==10?1:j+1;l=q.indexOf(d.charAt(g));e+=p*l;m+=j*l}var n=e%11;m+=n;var f=m%11;o+=this.encoding[n]+h;if(d.length>=10){o+=this.encoding[f]+h}o+="1011001";return(o)}},code39:{encoding:["101001101101","110100101011","101100101011","110110010101","101001101011","110100110101","101100110101","101001011011","110100101101","101100101101","110101001011","101101001011","110110100101","101011001011","110101100101","101101100101","101010011011","110101001101","101101001101","101011001101","110101010011","101101010011","110110101001","101011010011","110101101001","101101101001","101010110011","110101011001","101101011001","101011011001","110010101011","100110101011","110011010101","100101101011","110010110101","100110110101","100101011011","110010101101","100110101101","100100100101","100100101001","100101001001","101001001001","100101101101"],getDigit:function(f){var e="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. $/+%*";var d,c,h="",g="0";if(f.indexOf("*")>=0){return("")}f=("*"+f+"*").toUpperCase();for(d=0;d<f.length;d++){c=e.indexOf(f.charAt(d));if(c<0){return("")}if(d>0){h+=g}h+=this.encoding[c]}return(h)}},code93:{encoding:["100010100","101001000","101000100","101000010","100101000","100100100","100100010","101010000","100010010","100001010","110101000","110100100","110100010","110010100","110010010","110001010","101101000","101100100","101100010","100110100","100011010","101011000","101001100","101000110","100101100","100010110","110110100","110110010","110101100","110100110","110010110","110011010","101101100","101100110","100110110","100111010","100101110","111010100","111010010","111001010","101101110","101110110","110101110","100100110","111011010","111010110","100110010","101011110"],getDigit:function(d,h){var o="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. $/+%____*",l,m="";if(d.indexOf("*")>=0){return("")}d=d.toUpperCase();m+=this.encoding[47];for(i=0;i<d.length;i++){l=d.charAt(i);index=o.indexOf(l);if((l=="_")||(index<0)){return("")}m+=this.encoding[index]}if(h){var n=0,e=0,g=1,j=0;for(i=d.length-1;i>=0;i--){n=n==20?1:n+1;g=g==15?1:g+1;index=o.indexOf(d.charAt(i));e+=n*index;j+=g*index}var l=e%47;j+=l;var f=j%47;m+=this.encoding[l];m+=this.encoding[f]}m+=this.encoding[47];m+="1";return(m)}},code128:{encoding:["11011001100","11001101100","11001100110","10010011000","10010001100","10001001100","10011001000","10011000100","10001100100","11001001000","11001000100","11000100100","10110011100","10011011100","10011001110","10111001100","10011101100","10011100110","11001110010","11001011100","11001001110","11011100100","11001110100","11101101110","11101001100","11100101100","11100100110","11101100100","11100110100","11100110010","11011011000","11011000110","11000110110","10100011000","10001011000","10001000110","10110001000","10001101000","10001100010","11010001000","11000101000","11000100010","10110111000","10110001110","10001101110","10111011000","10111000110","10001110110","11101110110","11010001110","11000101110","11011101000","11011100010","11011101110","11101011000","11101000110","11100010110","11101101000","11101100010","11100011010","11101111010","11001000010","11110001010","10100110000","10100001100","10010110000","10010000110","10000101100","10000100110","10110010000","10110000100","10011010000","10011000010","10000110100","10000110010","11000010010","11001010000","11110111010","11000010100","10001111010","10100111100","10010111100","10010011110","10111100100","10011110100","10011110010","11110100100","11110010100","11110010010","11011011110","11011110110","11110110110","10101111000","10100011110","10001011110","10111101000","10111100010","11110101000","11110100010","10111011110","10111101110","11101011110","11110101110","11010000100","11010010000","11010011100","11000111010"],getDigit:function(d){var m=" !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";var n="";var k=0;var e=0;var h=0;var g=0;var o=0;for(h=0;h<d.length;h++){if(m.indexOf(d.charAt(h))==-1){return("")}}var f=d.length>1;var l="";for(h=0;h<3&&h<d.length;h++){l=d.charAt(h);f&=l>="0"&&l<="9"}k=f?105:104;n=this.encoding[k];h=0;while(h<d.length){if(!f){g=0;while((h+g<d.length)&&(d.charAt(h+g)>="0")&&(d.charAt(h+g)<="9")){g++}f=(g>5)||((h+g-1==d.length)&&(g>3));if(f){n+=this.encoding[99];k+=++e*99}}else{if((h==d.length)||(d.charAt(h)<"0")||(d.charAt(h)>"9")||(d.charAt(h+1)<"0")||(d.charAt(h+1)>"9")){f=false;n+=this.encoding[100];k+=++e*100}}if(f){o=a.intval(d.charAt(h)+d.charAt(h+1));h+=2}else{o=m.indexOf(d.charAt(h));h+=1}n+=this.encoding[o];k+=++e*o}n+=this.encoding[k%103];n+=this.encoding[106];n+="11";return(n)}},codabar:{encoding:["101010011","101011001","101001011","110010101","101101001","110101001","100101011","100101101","100110101","110100101","101001101","101100101","1101011011","1101101011","1101101101","1011011011","1011001001","1010010011","1001001011","1010011001"],getDigit:function(f){var e="0123456789-$:/.+";var d,c,h="",g="0";h+=this.encoding[16]+g;for(d=0;d<f.length;d++){c=e.indexOf(f.charAt(d));if(c<0){return("")}h+=this.encoding[c]+g}h+=this.encoding[16];return(h)}},datamatrix:{encoding:["101010011","101011001","101001011","110010101","101101001","110101001","100101011","100101101","100110101","110100101","101001101","101100101","1101011011","1101101011","1101101101","1011011011","1011001001","1010010011","1001001011","1010011001"],lengthRows:[10,12,14,16,18,20,22,24,26,32,36,40,44,48,52,64,72,80,88,96,104,120,132,144,8,8,12,12,16,16],lengthCols:[10,12,14,16,18,20,22,24,26,32,36,40,44,48,52,64,72,80,88,96,104,120,132,144,18,32,26,36,36,48],mappingRows:[8,10,12,14,16,18,20,22,24,28,32,36,40,44,48,56,64,72,80,88,96,108,120,132,6,6,10,10,14,14],mappingCols:[8,10,12,14,16,18,20,22,24,28,32,36,40,44,48,56,64,72,80,88,96,108,120,132,16,28,24,32,32,44],dataCWCount:[3,5,8,12,18,22,30,36,44,62,86,114,144,174,204,280,368,456,576,696,816,1050,1304,1558,5,10,16,22,32,49],solomonCWCount:[5,7,10,12,14,18,20,24,28,36,42,48,56,68,84,112,144,192,224,272,336,408,496,620,7,11,14,18,24,28],dataRegionRows:[8,10,12,14,16,18,20,22,24,14,16,18,20,22,24,14,16,18,20,22,24,18,20,22,6,6,10,10,14,14],dataRegionCols:[8,10,12,14,16,18,20,22,24,14,16,18,20,22,24,14,16,18,20,22,24,18,20,22,16,14,24,16,16,22],regionRows:[1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,4,4,4,4,4,4,6,6,6,1,1,1,1,1,1],regionCols:[1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,4,4,4,4,4,4,6,6,6,1,2,1,2,2,2],interleavedBlocks:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,4,4,4,4,6,6,8,8,1,1,1,1,1,1],logTab:[-255,255,1,240,2,225,241,53,3,38,226,133,242,43,54,210,4,195,39,114,227,106,134,28,243,140,44,23,55,118,211,234,5,219,196,96,40,222,115,103,228,78,107,125,135,8,29,162,244,186,141,180,45,99,24,49,56,13,119,153,212,199,235,91,6,76,220,217,197,11,97,184,41,36,223,253,116,138,104,193,229,86,79,171,108,165,126,145,136,34,9,74,30,32,163,84,245,173,187,204,142,81,181,190,46,88,100,159,25,231,50,207,57,147,14,67,120,128,154,248,213,167,200,63,236,110,92,176,7,161,77,124,221,102,218,95,198,90,12,152,98,48,185,179,42,209,37,132,224,52,254,239,117,233,139,22,105,27,194,113,230,206,87,158,80,189,172,203,109,175,166,62,127,247,146,66,137,192,35,252,10,183,75,216,31,83,33,73,164,144,85,170,246,65,174,61,188,202,205,157,143,169,82,72,182,215,191,251,47,178,89,151,101,94,160,123,26,112,232,21,51,238,208,131,58,69,148,18,15,16,68,17,121,149,129,19,155,59,249,70,214,250,168,71,201,156,64,60,237,130,111,20,93,122,177,150],aLogTab:[1,2,4,8,16,32,64,128,45,90,180,69,138,57,114,228,229,231,227,235,251,219,155,27,54,108,216,157,23,46,92,184,93,186,89,178,73,146,9,18,36,72,144,13,26,52,104,208,141,55,110,220,149,7,14,28,56,112,224,237,247,195,171,123,246,193,175,115,230,225,239,243,203,187,91,182,65,130,41,82,164,101,202,185,95,190,81,162,105,210,137,63,126,252,213,135,35,70,140,53,106,212,133,39,78,156,21,42,84,168,125,250,217,159,19,38,76,152,29,58,116,232,253,215,131,43,86,172,117,234,249,223,147,11,22,44,88,176,77,154,25,50,100,200,189,87,174,113,226,233,255,211,139,59,118,236,245,199,163,107,214,129,47,94,188,85,170,121,242,201,191,83,166,97,194,169,127,254,209,143,51,102,204,181,71,142,49,98,196,165,103,206,177,79,158,17,34,68,136,61,122,244,197,167,99,198,161,111,222,145,15,30,60,120,240,205,183,67,134,33,66,132,37,74,148,5,10,20,40,80,160,109,218,153,31,62,124,248,221,151,3,6,12,24,48,96,192,173,119,238,241,207,179,75,150,1],champGaloisMult:function(d,c){if(!d||!c){return 0}return this.aLogTab[(this.logTab[d]+this.logTab[c])%255]},champGaloisDoub:function(d,c){if(!d){return 0}if(!c){return d}return this.aLogTab[(this.logTab[d]+c)%255]},champGaloisSum:function(d,c){return d^c},selectIndex:function(c,d){if((c<1||c>1558)&&!d){return -1}if((c<1||c>49)&&d){return -1}var e=0;if(d){e=24}while(this.dataCWCount[e]<c){e++}return e},encodeDataCodeWordsASCII:function(f){var e=new Array();var h=0,d,g;for(d=0;d<f.length;d++){g=f.charCodeAt(d);if(g>127){e[h]=235;g=g-127;h++}else{if((g>=48&&g<=57)&&(d+1<f.length)&&(f.charCodeAt(d+1)>=48&&f.charCodeAt(d+1)<=57)){g=((g-48)*10)+((f.charCodeAt(d+1))-48);g+=130;d++}else{g++}}e[h]=g;h++}return e},addPadCW:function(d,g,f){if(g>=f){return}d[g]=129;var e,c;for(c=g+1;c<f;c++){e=((149*(c+1))%253)+1;d[c]=(129+e)%254}},calculSolFactorTable:function(c){var f=new Array();var e,d;for(e=0;e<=c;e++){f[e]=1}for(e=1;e<=c;e++){for(d=e-1;d>=0;d--){f[d]=this.champGaloisDoub(f[d],e);if(d>0){f[d]=this.champGaloisSum(f[d],f[d-1])}}}return f},addReedSolomonCW:function(c,g,l,m,h){var o=0;var n=c/h;var p=new Array();var f,e,d;for(d=0;d<h;d++){for(f=0;f<n;f++){p[f]=0}for(f=d;f<l;f=f+h){o=this.champGaloisSum(m[f],p[n-1]);for(e=n-1;e>=0;e--){if(!o){p[e]=0}else{p[e]=this.champGaloisMult(o,g[e])}if(e>0){p[e]=this.champGaloisSum(p[e-1],p[e])}}}e=l+d;for(f=n-1;f>=0;f--){m[e]=p[f];e=e+h}}return m},getBits:function(d){var e=new Array();for(var c=0;c<8;c++){e[c]=d&(128>>c)?1:0}return e},next:function(h,k,d,j,g,c){var f=0;var l=4;var e=0;do{if((l==k)&&(e==0)){this.patternShapeSpecial1(g,c,j[f],k,d);f++}else{if((h<3)&&(l==k-2)&&(e==0)&&(d%4!=0)){this.patternShapeSpecial2(g,c,j[f],k,d);f++}else{if((l==k-2)&&(e==0)&&(d%8==4)){this.patternShapeSpecial3(g,c,j[f],k,d);f++}else{if((l==k+4)&&(e==2)&&(d%8==0)){this.patternShapeSpecial4(g,c,j[f],k,d);f++}}}}do{if((l<k)&&(e>=0)&&(c[l][e]!=1)){this.patternShapeStandard(g,c,j[f],l,e,k,d);f++}l-=2;e+=2}while((l>=0)&&(e<d));l+=1;e+=3;do{if((l>=0)&&(e<d)&&(c[l][e]!=1)){this.patternShapeStandard(g,c,j[f],l,e,k,d);f++}l+=2;e-=2}while((l<k)&&(e>=0));l+=3;e+=1}while((l<k)||(e<d))},patternShapeStandard:function(g,f,h,j,e,d,c){this.placeBitInDatamatrix(g,f,h[0],j-2,e-2,d,c);this.placeBitInDatamatrix(g,f,h[1],j-2,e-1,d,c);this.placeBitInDatamatrix(g,f,h[2],j-1,e-2,d,c);this.placeBitInDatamatrix(g,f,h[3],j-1,e-1,d,c);this.placeBitInDatamatrix(g,f,h[4],j-1,e,d,c);this.placeBitInDatamatrix(g,f,h[5],j,e-2,d,c);this.placeBitInDatamatrix(g,f,h[6],j,e-1,d,c);this.placeBitInDatamatrix(g,f,h[7],j,e,d,c)},patternShapeSpecial1:function(f,e,g,d,c){this.placeBitInDatamatrix(f,e,g[0],d-1,0,d,c);this.placeBitInDatamatrix(f,e,g[1],d-1,1,d,c);this.placeBitInDatamatrix(f,e,g[2],d-1,2,d,c);this.placeBitInDatamatrix(f,e,g[3],0,c-2,d,c);this.placeBitInDatamatrix(f,e,g[4],0,c-1,d,c);this.placeBitInDatamatrix(f,e,g[5],1,c-1,d,c);this.placeBitInDatamatrix(f,e,g[6],2,c-1,d,c);this.placeBitInDatamatrix(f,e,g[7],3,c-1,d,c)},patternShapeSpecial2:function(f,e,g,d,c){this.placeBitInDatamatrix(f,e,g[0],d-3,0,d,c);this.placeBitInDatamatrix(f,e,g[1],d-2,0,d,c);this.placeBitInDatamatrix(f,e,g[2],d-1,0,d,c);this.placeBitInDatamatrix(f,e,g[3],0,c-4,d,c);this.placeBitInDatamatrix(f,e,g[4],0,c-3,d,c);this.placeBitInDatamatrix(f,e,g[5],0,c-2,d,c);this.placeBitInDatamatrix(f,e,g[6],0,c-1,d,c);this.placeBitInDatamatrix(f,e,g[7],1,c-1,d,c)},patternShapeSpecial3:function(f,e,g,d,c){this.placeBitInDatamatrix(f,e,g[0],d-3,0,d,c);this.placeBitInDatamatrix(f,e,g[1],d-2,0,d,c);this.placeBitInDatamatrix(f,e,g[2],d-1,0,d,c);this.placeBitInDatamatrix(f,e,g[3],0,c-2,d,c);this.placeBitInDatamatrix(f,e,g[4],0,c-1,d,c);this.placeBitInDatamatrix(f,e,g[5],1,c-1,d,c);this.placeBitInDatamatrix(f,e,g[6],2,c-1,d,c);this.placeBitInDatamatrix(f,e,g[7],3,c-1,d,c)},patternShapeSpecial4:function(f,e,g,d,c){this.placeBitInDatamatrix(f,e,g[0],d-1,0,d,c);this.placeBitInDatamatrix(f,e,g[1],d-1,c-1,d,c);this.placeBitInDatamatrix(f,e,g[2],0,c-3,d,c);this.placeBitInDatamatrix(f,e,g[3],0,c-2,d,c);this.placeBitInDatamatrix(f,e,g[4],0,c-1,d,c);this.placeBitInDatamatrix(f,e,g[5],1,c-3,d,c);this.placeBitInDatamatrix(f,e,g[6],1,c-2,d,c);this.placeBitInDatamatrix(f,e,g[7],1,c-1,d,c)},placeBitInDatamatrix:function(g,f,j,h,e,d,c){if(h<0){h+=d;e+=4-((d+4)%8)}if(e<0){e+=c;h+=4-((c+4)%8)}if(f[h][e]!=1){g[h][e]=j;f[h][e]=1}},addFinderPattern:function(h,m,d,n,c){var l=(n+2)*m;var k=(c+2)*d;var e=new Array();e[0]=new Array();for(var f=0;f<k+2;f++){e[0][f]=0}for(var g=0;g<l;g++){e[g+1]=new Array();e[g+1][0]=0;e[g+1][k+1]=0;for(var f=0;f<k;f++){if(g%(n+2)==0){if(f%2==0){e[g+1][f+1]=1}else{e[g+1][f+1]=0}}else{if(g%(n+2)==n+1){e[g+1][f+1]=1}else{if(f%(c+2)==c+1){if(g%2==0){e[g+1][f+1]=0}else{e[g+1][f+1]=1}}else{if(f%(c+2)==0){e[g+1][f+1]=1}else{e[g+1][f+1]=0;e[g+1][f+1]=h[g-1-(2*(parseInt(g/(n+2))))][f-1-(2*(parseInt(f/(c+2))))]}}}}}}e[l+1]=new Array();for(var f=0;f<k+2;f++){e[l+1][f]=0}return e},getDigit:function(m,u){var s=this.encodeDataCodeWordsASCII(m);var e=s.length;var h=this.selectIndex(e,u);var n=this.dataCWCount[h];var x=this.solomonCWCount[h];var c=n+x;var A=this.lengthRows[h];var z=this.lengthCols[h];var k=this.regionRows[h];var l=this.regionCols[h];var f=this.dataRegionRows[h];var y=this.dataRegionCols[h];var w=A-2*k;var j=z-2*l;var p=this.interleavedBlocks[h];var q=(x/p);var d=(n/p);this.addPadCW(s,e,n);var v=this.calculSolFactorTable(q);this.addReedSolomonCW(x,v,n,s,p);var t=new Array();for(var r=0;r<c;r++){t[r]=this.getBits(s[r])}var B=new Array();var o=new Array();for(var r=0;r<j;r++){B[r]=new Array();o[r]=new Array()}if(((w*j)%8)==4){B[w-2][j-2]=1;B[w-1][j-1]=1;B[w-1][j-2]=0;B[w-2][j-1]=0;o[w-2][j-2]=1;o[w-1][j-1]=1;o[w-1][j-2]=1;o[w-2][j-1]=1}this.next(0,w,j,t,B,o);B=this.addFinderPattern(B,k,l,f,y);return B}},lec:{cInt:function(e,f){var d="";for(var c=0;c<f;c++){d+=String.fromCharCode(e&255);e=e>>8}return d},cRgb:function(e,d,c){return String.fromCharCode(c)+String.fromCharCode(d)+String.fromCharCode(e)},cHexColor:function(h){var d=parseInt("0x"+h.substr(1));var c=d&255;d=d>>8;var f=d&255;var e=d>>8;return(this.cRgb(e,f,c))}},hexToRGB:function(h){var d=parseInt("0x"+h.substr(1));var c=d&255;d=d>>8;var f=d&255;var e=d>>8;return({r:e,g:f,b:c})},isHexColor:function(d){var c=new RegExp("#[0-91-F]","gi");return d.match(c)},base64Encode:function(o){var c="",h,f,e,n,m,l,j;var d="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var g=0;while(g<o.length){h=o.charCodeAt(g++);f=o.charCodeAt(g++);e=o.charCodeAt(g++);n=h>>2;m=((h&3)<<4)|(f>>4);l=((f&15)<<2)|(e>>6);j=e&63;if(isNaN(f)){l=j=64}else{if(isNaN(e)){j=64}}c+=d.charAt(n)+d.charAt(m)+d.charAt(l)+d.charAt(j)}return c},bitStringTo2DArray:function(f){var e=[];e[0]=[];for(var c=0;c<f.length;c++){e[0][c]=f.charAt(c)}return(e)},resize:function(d,c){d.css("padding","0px").css("overflow","auto").css("width",c+"px").html("");return d},digitToBmpRenderer:function(t,w,o,g,n,z){var e=o.length;var f=o[0].length;var u=0;var r=this.isHexColor(w.bgColor)?this.lec.cHexColor(w.bgColor):this.lec.cRgb(255,255,255);var q=this.isHexColor(w.color)?this.lec.cHexColor(w.color):this.lec.cRgb(0,0,0);var d="";var c="";for(u=0;u<n;u++){d+=r;c+=q}var p="";var C=(4-((n*f*3)%4))%4;var B=(n*f+C)*z*e;var v="";for(u=0;u<C;u++){v+="\0"}var A="BM"+this.lec.cInt(54+B,4)+"\0\0\0\0"+this.lec.cInt(54,4)+this.lec.cInt(40,4)+this.lec.cInt(n*f,4)+this.lec.cInt(z*e,4)+this.lec.cInt(1,2)+this.lec.cInt(24,2)+"\0\0\0\0"+this.lec.cInt(B,4)+this.lec.cInt(2835,4)+this.lec.cInt(2835,4)+this.lec.cInt(0,4)+this.lec.cInt(0,4);for(var h=e-1;h>=0;h--){var l="";for(var j=0;j<f;j++){l+=o[h][j]=="0"?d:c}l+=v;for(var s=0;s<z;s++){A+=l}}var m=document.createElement("object");m.setAttribute("type","image/bmp");m.setAttribute("data","data:image/bmp;base64,"+this.base64Encode(A));this.resize(t,n*f+C).append(m)},digitToBmp:function(g,f,j,d){var c=a.intval(f.barWidth);var e=a.intval(f.barHeight);this.digitToBmpRenderer(g,f,this.bitStringTo2DArray(j),d,c,e)},digitToBmp2D:function(f,e,g,c){var d=a.intval(e.moduleSize);this.digitToBmpRenderer(f,e,g,c,d,d)},digitToCssRenderer:function(q,d,m,e,p,g){var r=m.length;var c=m[0].length;var j="";var o='<div style="float: left; font-size: 0px; background-color: '+d.bgColor+"; height: "+g+'px; width: &Wpx"></div>';var l='<div style="float: left; font-size: 0px; width:0; border-left: &Wpx solid '+d.color+"; height: "+g+'px;"></div>';var f,h;for(var k=0;k<r;k++){f=0;h=m[k][0];for(var n=0;n<c;n++){if(h==m[k][n]){f++}else{j+=(h=="0"?o:l).replace("&W",f*p);h=m[k][n];f=1}}if(f>0){j+=(h=="0"?o:l).replace("&W",f*p)}}if(d.showHRI){j+='<div style="clear:both; width: 100%; background-color: '+d.bgColor+"; color: "+d.color+"; text-align: center; font-size: "+d.fontSize+"px; margin-top: "+d.marginHRI+'px;">'+e+"</div>"}this.resize(q,p*c).html(j)},digitToCss:function(g,f,j,d){var c=a.intval(f.barWidth);var e=a.intval(f.barHeight);this.digitToCssRenderer(g,f,this.bitStringTo2DArray(j),d,c,e)},digitToCss2D:function(f,e,g,c){var d=a.intval(e.moduleSize);this.digitToCssRenderer(f,e,g,c,d,d)},digitToSvgRenderer:function(q,s,n,f,l,t){var d=n.length;var e=n[0].length;var o=l*e;var u=t*d;if(s.showHRI){var g=a.intval(s.fontSize);u+=a.intval(s.marginHRI)+g}var m='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="'+o+'" height="'+u+'">';m+='<rect width="'+o+'" height="'+u+'" x="0" y="0" fill="'+s.bgColor+'" />';var c='<rect width="&W" height="'+t+'" x="&X" y="&Y" fill="'+s.color+'" />';var r,p;for(var h=0;h<d;h++){r=0;p=n[h][0];for(var j=0;j<e;j++){if(p==n[h][j]){r++}else{if(p=="1"){m+=c.replace("&W",r*l).replace("&X",(j-r)*l).replace("&Y",h*t)}p=n[h][j];r=1}}if((r>0)&&(p=="1")){m+=c.replace("&W",r*l).replace("&X",(e-r)*l).replace("&Y",h*t)}}if(s.showHRI){m+='<g transform="translate('+Math.floor(o/2)+' 0)">';m+='<text y="'+(u-Math.floor(g/2))+'" text-anchor="middle" style="font-family: Arial; font-size: '+g+'px;" fill="'+s.color+'">'+f+"</text>";m+="</g>"}m+="</svg>";var k=document.createElement("object");k.setAttribute("type","image/svg+xml");k.setAttribute("data","data:image/svg+xml,"+m);this.resize(q,o).append(k)},digitToSvg:function(g,f,j,d){var c=a.intval(f.barWidth);var e=a.intval(f.barHeight);this.digitToSvgRenderer(g,f,this.bitStringTo2DArray(j),d,c,e)},digitToSvg2D:function(f,e,g,c){var d=a.intval(e.moduleSize);this.digitToSvgRenderer(f,e,g,c,d,d)},digitToCanvasRenderer:function(s,d,o,f,m,e,q,k){var j=s.get(0);if(!j||!j.getContext){return}var t=o.length;var c=o[0].length;var r=j.getContext("2d");r.lineWidth=1;r.lineCap="butt";r.fillStyle=d.bgColor;r.fillRect(m,e,c*q,t*k);r.fillStyle=d.color;for(var n=0;n<t;n++){var h=0;var l=o[n][0];for(var p=0;p<c;p++){if(l==o[n][p]){h++}else{if(l=="1"){r.fillRect(m+(p-h)*q,e+n*k,q*h,k)}l=o[n][p];h=1}}if((h>0)&&(l=="1")){r.fillRect(m+(c-h)*q,e+n*k,q*h,k)}}if(d.showHRI){var g=r.measureText(f);r.fillText(f,m+Math.floor((c*q-g.width)/2),e+t*k+d.fontSize+d.marginHRI)}},digitToCanvas:function(j,g,l,e){var d=a.intval(g.barWidth);var f=a.intval(g.barHeight);var c=a.intval(g.posX);var k=a.intval(g.posY);this.digitToCanvasRenderer(j,g,this.bitStringTo2DArray(l),e,c,k,d,f)},digitToCanvas2D:function(g,f,j,d){var e=a.intval(f.moduleSize);var c=a.intval(f.posX);var h=a.intval(f.posY);this.digitToCanvasRenderer(g,f,j,d,c,h,e,e)}};b.fn.extend({barcode:function(h,m,f){var o="",g="",d="",k=true,n=false,j=false;if(typeof(h)=="string"){d=h}else{if(typeof(h)=="object"){d=typeof(h.code)=="string"?h.code:"";k=typeof(h.crc)!="undefined"?h.crc:true;n=typeof(h.rect)!="undefined"?h.rect:false}}if(d==""){return(false)}if(typeof(f)=="undefined"){f=[]}for(var c in a.settings){if(f[c]==undefined){f[c]=a.settings[c]}}switch(m){case"std25":case"int25":o=a.i25.getDigit(d,k,m);g=a.i25.compute(d,k,m);break;case"ean8":case"ean13":o=a.ean.getDigit(d,m);g=a.ean.compute(d,m);break;case"code11":o=a.code11.getDigit(d);g=d;break;case"code39":o=a.code39.getDigit(d);g=d;break;case"code93":o=a.code93.getDigit(d,k);g=d;break;case"code128":o=a.code128.getDigit(d);g=d;break;case"codabar":o=a.codabar.getDigit(d);g=d;break;case"msi":o=a.msi.getDigit(d,k);g=a.msi.compute(d,k);break;case"datamatrix":o=a.datamatrix.getDigit(d,n);g=d;j=true;break}if(o.length==0){return(b(this))}if(!j&&f.addQuietZone){o="0000000000"+o+"0000000000"}var l=b(this);var e="digitTo"+f.output.charAt(0).toUpperCase()+f.output.substr(1)+(j?"2D":"");if(typeof(a[e])=="function"){a[e](l,f,o,g)}return(l)}})}(jQuery));

function QR8bitByte(data) {
	this.mode = QRMode.MODE_8BIT_BYTE;
	this.data = data;
}

QR8bitByte.prototype = {

	getLength : function(buffer) {
		return this.data.length;
	},
	
	write : function(buffer) {
		for (var i = 0; i < this.data.length; i++) {
			// not JIS ...
			buffer.put(this.data.charCodeAt(i), 8);
		}
	}
};

//---------------------------------------------------------------------
// QRCode
//---------------------------------------------------------------------

function QRCode(typeNumber, errorCorrectLevel) {
	this.typeNumber = typeNumber;
	this.errorCorrectLevel = errorCorrectLevel;
	this.modules = null;
	this.moduleCount = 0;
	this.dataCache = null;
	this.dataList = new Array();
}

QRCode.prototype = {
	
	addData : function(data) {
		var newData = new QR8bitByte(data);
		this.dataList.push(newData);
		this.dataCache = null;
	},
	
	isDark : function(row, col) {
		if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
			throw new Error(row + "," + col);
		}
		return this.modules[row][col];
	},

	getModuleCount : function() {
		return this.moduleCount;
	},
	
	make : function() {
		// Calculate automatically typeNumber if provided is < 1
		if (this.typeNumber < 1 ){
			var typeNumber = 1;
			for (typeNumber = 1; typeNumber < 40; typeNumber++) {
				var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, this.errorCorrectLevel);

				var buffer = new QRBitBuffer();
				var totalDataCount = 0;
				for (var i = 0; i < rsBlocks.length; i++) {
					totalDataCount += rsBlocks[i].dataCount;
				}

				for (var i = 0; i < this.dataList.length; i++) {
					var data = this.dataList[i];
					buffer.put(data.mode, 4);
					buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber) );
					data.write(buffer);
				}
				if (buffer.getLengthInBits() <= totalDataCount * 8)
					break;
			}
			this.typeNumber = typeNumber;
		}
		this.makeImpl(false, this.getBestMaskPattern() );
	},
	
	makeImpl : function(test, maskPattern) {
		
		this.moduleCount = this.typeNumber * 4 + 17;
		this.modules = new Array(this.moduleCount);
		
		for (var row = 0; row < this.moduleCount; row++) {
			
			this.modules[row] = new Array(this.moduleCount);
			
			for (var col = 0; col < this.moduleCount; col++) {
				this.modules[row][col] = null;//(col + row) % 3;
			}
		}
	
		this.setupPositionProbePattern(0, 0);
		this.setupPositionProbePattern(this.moduleCount - 7, 0);
		this.setupPositionProbePattern(0, this.moduleCount - 7);
		this.setupPositionAdjustPattern();
		this.setupTimingPattern();
		this.setupTypeInfo(test, maskPattern);
		
		if (this.typeNumber >= 7) {
			this.setupTypeNumber(test);
		}
	
		if (this.dataCache == null) {
			this.dataCache = QRCode.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);
		}
	
		this.mapData(this.dataCache, maskPattern);
	},

	setupPositionProbePattern : function(row, col)  {
		
		for (var r = -1; r <= 7; r++) {
			
			if (row + r <= -1 || this.moduleCount <= row + r) continue;
			
			for (var c = -1; c <= 7; c++) {
				
				if (col + c <= -1 || this.moduleCount <= col + c) continue;
				
				if ( (0 <= r && r <= 6 && (c == 0 || c == 6) )
						|| (0 <= c && c <= 6 && (r == 0 || r == 6) )
						|| (2 <= r && r <= 4 && 2 <= c && c <= 4) ) {
					this.modules[row + r][col + c] = true;
				} else {
					this.modules[row + r][col + c] = false;
				}
			}		
		}		
	},
	
	getBestMaskPattern : function() {
	
		var minLostPoint = 0;
		var pattern = 0;
	
		for (var i = 0; i < 8; i++) {
			
			this.makeImpl(true, i);
	
			var lostPoint = QRUtil.getLostPoint(this);
	
			if (i == 0 || minLostPoint >  lostPoint) {
				minLostPoint = lostPoint;
				pattern = i;
			}
		}
	
		return pattern;
	},
	
	createMovieClip : function(target_mc, instance_name, depth) {
	
		var qr_mc = target_mc.createEmptyMovieClip(instance_name, depth);
		var cs = 1;
	
		this.make();

		for (var row = 0; row < this.modules.length; row++) {
			
			var y = row * cs;
			
			for (var col = 0; col < this.modules[row].length; col++) {
	
				var x = col * cs;
				var dark = this.modules[row][col];
			
				if (dark) {
					qr_mc.beginFill(0, 100);
					qr_mc.moveTo(x, y);
					qr_mc.lineTo(x + cs, y);
					qr_mc.lineTo(x + cs, y + cs);
					qr_mc.lineTo(x, y + cs);
					qr_mc.endFill();
				}
			}
		}
		
		return qr_mc;
	},

	setupTimingPattern : function() {
		
		for (var r = 8; r < this.moduleCount - 8; r++) {
			if (this.modules[r][6] != null) {
				continue;
			}
			this.modules[r][6] = (r % 2 == 0);
		}
	
		for (var c = 8; c < this.moduleCount - 8; c++) {
			if (this.modules[6][c] != null) {
				continue;
			}
			this.modules[6][c] = (c % 2 == 0);
		}
	},
	
	setupPositionAdjustPattern : function() {
	
		var pos = QRUtil.getPatternPosition(this.typeNumber);
		
		for (var i = 0; i < pos.length; i++) {
		
			for (var j = 0; j < pos.length; j++) {
			
				var row = pos[i];
				var col = pos[j];
				
				if (this.modules[row][col] != null) {
					continue;
				}
				
				for (var r = -2; r <= 2; r++) {
				
					for (var c = -2; c <= 2; c++) {
					
						if (r == -2 || r == 2 || c == -2 || c == 2 
								|| (r == 0 && c == 0) ) {
							this.modules[row + r][col + c] = true;
						} else {
							this.modules[row + r][col + c] = false;
						}
					}
				}
			}
		}
	},
	
	setupTypeNumber : function(test) {
	
		var bits = QRUtil.getBCHTypeNumber(this.typeNumber);
	
		for (var i = 0; i < 18; i++) {
			var mod = (!test && ( (bits >> i) & 1) == 1);
			this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
		}
	
		for (var i = 0; i < 18; i++) {
			var mod = (!test && ( (bits >> i) & 1) == 1);
			this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
		}
	},
	
	setupTypeInfo : function(test, maskPattern) {
	
		var data = (this.errorCorrectLevel << 3) | maskPattern;
		var bits = QRUtil.getBCHTypeInfo(data);
	
		// vertical		
		for (var i = 0; i < 15; i++) {
	
			var mod = (!test && ( (bits >> i) & 1) == 1);
	
			if (i < 6) {
				this.modules[i][8] = mod;
			} else if (i < 8) {
				this.modules[i + 1][8] = mod;
			} else {
				this.modules[this.moduleCount - 15 + i][8] = mod;
			}
		}
	
		// horizontal
		for (var i = 0; i < 15; i++) {
	
			var mod = (!test && ( (bits >> i) & 1) == 1);
			
			if (i < 8) {
				this.modules[8][this.moduleCount - i - 1] = mod;
			} else if (i < 9) {
				this.modules[8][15 - i - 1 + 1] = mod;
			} else {
				this.modules[8][15 - i - 1] = mod;
			}
		}
	
		// fixed module
		this.modules[this.moduleCount - 8][8] = (!test);
	
	},
	
	mapData : function(data, maskPattern) {
		
		var inc = -1;
		var row = this.moduleCount - 1;
		var bitIndex = 7;
		var byteIndex = 0;
		
		for (var col = this.moduleCount - 1; col > 0; col -= 2) {
	
			if (col == 6) col--;
	
			while (true) {
	
				for (var c = 0; c < 2; c++) {
					
					if (this.modules[row][col - c] == null) {
						
						var dark = false;
	
						if (byteIndex < data.length) {
							dark = ( ( (data[byteIndex] >>> bitIndex) & 1) == 1);
						}
	
						var mask = QRUtil.getMask(maskPattern, row, col - c);
	
						if (mask) {
							dark = !dark;
						}
						
						this.modules[row][col - c] = dark;
						bitIndex--;
	
						if (bitIndex == -1) {
							byteIndex++;
							bitIndex = 7;
						}
					}
				}
								
				row += inc;
	
				if (row < 0 || this.moduleCount <= row) {
					row -= inc;
					inc = -inc;
					break;
				}
			}
		}
		
	}

};

QRCode.PAD0 = 0xEC;
QRCode.PAD1 = 0x11;

QRCode.createData = function(typeNumber, errorCorrectLevel, dataList) {
	
	var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);
	
	var buffer = new QRBitBuffer();
	
	for (var i = 0; i < dataList.length; i++) {
		var data = dataList[i];
		buffer.put(data.mode, 4);
		buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber) );
		data.write(buffer);
	}

	// calc num max data.
	var totalDataCount = 0;
	for (var i = 0; i < rsBlocks.length; i++) {
		totalDataCount += rsBlocks[i].dataCount;
	}

	if (buffer.getLengthInBits() > totalDataCount * 8) {
		throw new Error("code length overflow. ("
			+ buffer.getLengthInBits()
			+ ">"
			+  totalDataCount * 8
			+ ")");
	}

	// end code
	if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
		buffer.put(0, 4);
	}

	// padding
	while (buffer.getLengthInBits() % 8 != 0) {
		buffer.putBit(false);
	}

	// padding
	while (true) {
		
		if (buffer.getLengthInBits() >= totalDataCount * 8) {
			break;
		}
		buffer.put(QRCode.PAD0, 8);
		
		if (buffer.getLengthInBits() >= totalDataCount * 8) {
			break;
		}
		buffer.put(QRCode.PAD1, 8);
	}

	return QRCode.createBytes(buffer, rsBlocks);
}

QRCode.createBytes = function(buffer, rsBlocks) {

	var offset = 0;
	
	var maxDcCount = 0;
	var maxEcCount = 0;
	
	var dcdata = new Array(rsBlocks.length);
	var ecdata = new Array(rsBlocks.length);
	
	for (var r = 0; r < rsBlocks.length; r++) {

		var dcCount = rsBlocks[r].dataCount;
		var ecCount = rsBlocks[r].totalCount - dcCount;

		maxDcCount = Math.max(maxDcCount, dcCount);
		maxEcCount = Math.max(maxEcCount, ecCount);
		
		dcdata[r] = new Array(dcCount);
		
		for (var i = 0; i < dcdata[r].length; i++) {
			dcdata[r][i] = 0xff & buffer.buffer[i + offset];
		}
		offset += dcCount;
		
		var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
		var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);

		var modPoly = rawPoly.mod(rsPoly);
		ecdata[r] = new Array(rsPoly.getLength() - 1);
		for (var i = 0; i < ecdata[r].length; i++) {
            var modIndex = i + modPoly.getLength() - ecdata[r].length;
			ecdata[r][i] = (modIndex >= 0)? modPoly.get(modIndex) : 0;
		}

	}
	
	var totalCodeCount = 0;
	for (var i = 0; i < rsBlocks.length; i++) {
		totalCodeCount += rsBlocks[i].totalCount;
	}

	var data = new Array(totalCodeCount);
	var index = 0;

	for (var i = 0; i < maxDcCount; i++) {
		for (var r = 0; r < rsBlocks.length; r++) {
			if (i < dcdata[r].length) {
				data[index++] = dcdata[r][i];
			}
		}
	}

	for (var i = 0; i < maxEcCount; i++) {
		for (var r = 0; r < rsBlocks.length; r++) {
			if (i < ecdata[r].length) {
				data[index++] = ecdata[r][i];
			}
		}
	}

	return data;

}

//---------------------------------------------------------------------
// QRMode
//---------------------------------------------------------------------

var QRMode = {
	MODE_NUMBER :		1 << 0,
	MODE_ALPHA_NUM : 	1 << 1,
	MODE_8BIT_BYTE : 	1 << 2,
	MODE_KANJI :		1 << 3
};

//---------------------------------------------------------------------
// QRErrorCorrectLevel
//---------------------------------------------------------------------
 
var QRErrorCorrectLevel = {
	L : 1,
	M : 0,
	Q : 3,
	H : 2
};

//---------------------------------------------------------------------
// QRMaskPattern
//---------------------------------------------------------------------

var QRMaskPattern = {
	PATTERN000 : 0,
	PATTERN001 : 1,
	PATTERN010 : 2,
	PATTERN011 : 3,
	PATTERN100 : 4,
	PATTERN101 : 5,
	PATTERN110 : 6,
	PATTERN111 : 7
};

//---------------------------------------------------------------------
// QRUtil
//---------------------------------------------------------------------
 
var QRUtil = {

    PATTERN_POSITION_TABLE : [
	    [],
	    [6, 18],
	    [6, 22],
	    [6, 26],
	    [6, 30],
	    [6, 34],
	    [6, 22, 38],
	    [6, 24, 42],
	    [6, 26, 46],
	    [6, 28, 50],
	    [6, 30, 54],		
	    [6, 32, 58],
	    [6, 34, 62],
	    [6, 26, 46, 66],
	    [6, 26, 48, 70],
	    [6, 26, 50, 74],
	    [6, 30, 54, 78],
	    [6, 30, 56, 82],
	    [6, 30, 58, 86],
	    [6, 34, 62, 90],
	    [6, 28, 50, 72, 94],
	    [6, 26, 50, 74, 98],
	    [6, 30, 54, 78, 102],
	    [6, 28, 54, 80, 106],
	    [6, 32, 58, 84, 110],
	    [6, 30, 58, 86, 114],
	    [6, 34, 62, 90, 118],
	    [6, 26, 50, 74, 98, 122],
	    [6, 30, 54, 78, 102, 126],
	    [6, 26, 52, 78, 104, 130],
	    [6, 30, 56, 82, 108, 134],
	    [6, 34, 60, 86, 112, 138],
	    [6, 30, 58, 86, 114, 142],
	    [6, 34, 62, 90, 118, 146],
	    [6, 30, 54, 78, 102, 126, 150],
	    [6, 24, 50, 76, 102, 128, 154],
	    [6, 28, 54, 80, 106, 132, 158],
	    [6, 32, 58, 84, 110, 136, 162],
	    [6, 26, 54, 82, 110, 138, 166],
	    [6, 30, 58, 86, 114, 142, 170]
    ],

    G15 : (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0),
    G18 : (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0),
    G15_MASK : (1 << 14) | (1 << 12) | (1 << 10)	| (1 << 4) | (1 << 1),

    getBCHTypeInfo : function(data) {
	    var d = data << 10;
	    while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
		    d ^= (QRUtil.G15 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) ) ); 	
	    }
	    return ( (data << 10) | d) ^ QRUtil.G15_MASK;
    },

    getBCHTypeNumber : function(data) {
	    var d = data << 12;
	    while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
		    d ^= (QRUtil.G18 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) ) ); 	
	    }
	    return (data << 12) | d;
    },

    getBCHDigit : function(data) {

	    var digit = 0;

	    while (data != 0) {
		    digit++;
		    data >>>= 1;
	    }

	    return digit;
    },

    getPatternPosition : function(typeNumber) {
	    return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
    },

    getMask : function(maskPattern, i, j) {
	    
	    switch (maskPattern) {
		    
	    case QRMaskPattern.PATTERN000 : return (i + j) % 2 == 0;
	    case QRMaskPattern.PATTERN001 : return i % 2 == 0;
	    case QRMaskPattern.PATTERN010 : return j % 3 == 0;
	    case QRMaskPattern.PATTERN011 : return (i + j) % 3 == 0;
	    case QRMaskPattern.PATTERN100 : return (Math.floor(i / 2) + Math.floor(j / 3) ) % 2 == 0;
	    case QRMaskPattern.PATTERN101 : return (i * j) % 2 + (i * j) % 3 == 0;
	    case QRMaskPattern.PATTERN110 : return ( (i * j) % 2 + (i * j) % 3) % 2 == 0;
	    case QRMaskPattern.PATTERN111 : return ( (i * j) % 3 + (i + j) % 2) % 2 == 0;

	    default :
		    throw new Error("bad maskPattern:" + maskPattern);
	    }
    },

    getErrorCorrectPolynomial : function(errorCorrectLength) {

	    var a = new QRPolynomial([1], 0);

	    for (var i = 0; i < errorCorrectLength; i++) {
		    a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0) );
	    }

	    return a;
    },

    getLengthInBits : function(mode, type) {

	    if (1 <= type && type < 10) {

		    // 1 - 9

		    switch(mode) {
		    case QRMode.MODE_NUMBER 	: return 10;
		    case QRMode.MODE_ALPHA_NUM 	: return 9;
		    case QRMode.MODE_8BIT_BYTE	: return 8;
		    case QRMode.MODE_KANJI  	: return 8;
		    default :
			    throw new Error("mode:" + mode);
		    }

	    } else if (type < 27) {

		    // 10 - 26

		    switch(mode) {
		    case QRMode.MODE_NUMBER 	: return 12;
		    case QRMode.MODE_ALPHA_NUM 	: return 11;
		    case QRMode.MODE_8BIT_BYTE	: return 16;
		    case QRMode.MODE_KANJI  	: return 10;
		    default :
			    throw new Error("mode:" + mode);
		    }

	    } else if (type < 41) {

		    // 27 - 40

		    switch(mode) {
		    case QRMode.MODE_NUMBER 	: return 14;
		    case QRMode.MODE_ALPHA_NUM	: return 13;
		    case QRMode.MODE_8BIT_BYTE	: return 16;
		    case QRMode.MODE_KANJI  	: return 12;
		    default :
			    throw new Error("mode:" + mode);
		    }

	    } else {
		    throw new Error("type:" + type);
	    }
    },

    getLostPoint : function(qrCode) {
	    
	    var moduleCount = qrCode.getModuleCount();
	    
	    var lostPoint = 0;
	    
	    // LEVEL1
	    
	    for (var row = 0; row < moduleCount; row++) {

		    for (var col = 0; col < moduleCount; col++) {

			    var sameCount = 0;
			    var dark = qrCode.isDark(row, col);

				for (var r = -1; r <= 1; r++) {

				    if (row + r < 0 || moduleCount <= row + r) {
					    continue;
				    }

				    for (var c = -1; c <= 1; c++) {

					    if (col + c < 0 || moduleCount <= col + c) {
						    continue;
					    }

					    if (r == 0 && c == 0) {
						    continue;
					    }

					    if (dark == qrCode.isDark(row + r, col + c) ) {
						    sameCount++;
					    }
				    }
			    }

			    if (sameCount > 5) {
				    lostPoint += (3 + sameCount - 5);
			    }
		    }
	    }

	    // LEVEL2

	    for (var row = 0; row < moduleCount - 1; row++) {
		    for (var col = 0; col < moduleCount - 1; col++) {
			    var count = 0;
			    if (qrCode.isDark(row,     col    ) ) count++;
			    if (qrCode.isDark(row + 1, col    ) ) count++;
			    if (qrCode.isDark(row,     col + 1) ) count++;
			    if (qrCode.isDark(row + 1, col + 1) ) count++;
			    if (count == 0 || count == 4) {
				    lostPoint += 3;
			    }
		    }
	    }

	    // LEVEL3

	    for (var row = 0; row < moduleCount; row++) {
		    for (var col = 0; col < moduleCount - 6; col++) {
			    if (qrCode.isDark(row, col)
					    && !qrCode.isDark(row, col + 1)
					    &&  qrCode.isDark(row, col + 2)
					    &&  qrCode.isDark(row, col + 3)
					    &&  qrCode.isDark(row, col + 4)
					    && !qrCode.isDark(row, col + 5)
					    &&  qrCode.isDark(row, col + 6) ) {
				    lostPoint += 40;
			    }
		    }
	    }

	    for (var col = 0; col < moduleCount; col++) {
		    for (var row = 0; row < moduleCount - 6; row++) {
			    if (qrCode.isDark(row, col)
					    && !qrCode.isDark(row + 1, col)
					    &&  qrCode.isDark(row + 2, col)
					    &&  qrCode.isDark(row + 3, col)
					    &&  qrCode.isDark(row + 4, col)
					    && !qrCode.isDark(row + 5, col)
					    &&  qrCode.isDark(row + 6, col) ) {
				    lostPoint += 40;
			    }
		    }
	    }

	    // LEVEL4
	    
	    var darkCount = 0;

	    for (var col = 0; col < moduleCount; col++) {
		    for (var row = 0; row < moduleCount; row++) {
			    if (qrCode.isDark(row, col) ) {
				    darkCount++;
			    }
		    }
	    }
	    
	    var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
	    lostPoint += ratio * 10;

	    return lostPoint;		
    }

};


//---------------------------------------------------------------------
// QRMath
//---------------------------------------------------------------------

var QRMath = {

	glog : function(n) {
	
		if (n < 1) {
			throw new Error("glog(" + n + ")");
		}
		
		return QRMath.LOG_TABLE[n];
	},
	
	gexp : function(n) {
	
		while (n < 0) {
			n += 255;
		}
	
		while (n >= 256) {
			n -= 255;
		}
	
		return QRMath.EXP_TABLE[n];
	},
	
	EXP_TABLE : new Array(256),
	
	LOG_TABLE : new Array(256)

};
	
for (var i = 0; i < 8; i++) {
	QRMath.EXP_TABLE[i] = 1 << i;
}
for (var i = 8; i < 256; i++) {
	QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4]
		^ QRMath.EXP_TABLE[i - 5]
		^ QRMath.EXP_TABLE[i - 6]
		^ QRMath.EXP_TABLE[i - 8];
}
for (var i = 0; i < 255; i++) {
	QRMath.LOG_TABLE[QRMath.EXP_TABLE[i] ] = i;
}

//---------------------------------------------------------------------
// QRPolynomial
//---------------------------------------------------------------------

function QRPolynomial(num, shift) {

	if (num.length == undefined) {
		throw new Error(num.length + "/" + shift);
	}

	var offset = 0;


	while (offset < num.length && num[offset] == 0) {
		offset++;
	}

	this.num = new Array(num.length - offset + shift);
	for (var i = 0; i < num.length - offset; i++) {
		this.num[i] = num[i + offset];
	}
}

QRPolynomial.prototype = {

	get : function(index) {
		return this.num[index];
	},
	
	getLength : function() {
		return this.num.length;
	},
	
	multiply : function(e) {
	
		var num = new Array(this.getLength() + e.getLength() - 1);
	
		for (var i = 0; i < this.getLength(); i++) {
			for (var j = 0; j < e.getLength(); j++) {
				num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i) ) + QRMath.glog(e.get(j) ) );
			}
		}
	
		return new QRPolynomial(num, 0);
	},
	
	mod : function(e) {
	
		if (this.getLength() - e.getLength() < 0) {
			return this;
		}
	
		var ratio = QRMath.glog(this.get(0) ) - QRMath.glog(e.get(0) );
	
		var num = new Array(this.getLength() );
		
		for (var i = 0; i < this.getLength(); i++) {
			num[i] = this.get(i);
		}
		
		for (var i = 0; i < e.getLength(); i++) {
			num[i] ^= QRMath.gexp(QRMath.glog(e.get(i) ) + ratio);
		}
	
		// recursive call
		return new QRPolynomial(num, 0).mod(e);
	}
};

//---------------------------------------------------------------------
// QRRSBlock
//---------------------------------------------------------------------

function QRRSBlock(totalCount, dataCount) {
	this.totalCount = totalCount;
	this.dataCount  = dataCount;
}

QRRSBlock.RS_BLOCK_TABLE = [

	// L
	// M
	// Q
	// H

	// 1
	[1, 26, 19],
	[1, 26, 16],
	[1, 26, 13],
	[1, 26, 9],
	
	// 2
	[1, 44, 34],
	[1, 44, 28],
	[1, 44, 22],
	[1, 44, 16],

	// 3
	[1, 70, 55],
	[1, 70, 44],
	[2, 35, 17],
	[2, 35, 13],

	// 4		
	[1, 100, 80],
	[2, 50, 32],
	[2, 50, 24],
	[4, 25, 9],
	
	// 5
	[1, 134, 108],
	[2, 67, 43],
	[2, 33, 15, 2, 34, 16],
	[2, 33, 11, 2, 34, 12],
	
	// 6
	[2, 86, 68],
	[4, 43, 27],
	[4, 43, 19],
	[4, 43, 15],
	
	// 7		
	[2, 98, 78],
	[4, 49, 31],
	[2, 32, 14, 4, 33, 15],
	[4, 39, 13, 1, 40, 14],
	
	// 8
	[2, 121, 97],
	[2, 60, 38, 2, 61, 39],
	[4, 40, 18, 2, 41, 19],
	[4, 40, 14, 2, 41, 15],
	
	// 9
	[2, 146, 116],
	[3, 58, 36, 2, 59, 37],
	[4, 36, 16, 4, 37, 17],
	[4, 36, 12, 4, 37, 13],
	
	// 10		
	[2, 86, 68, 2, 87, 69],
	[4, 69, 43, 1, 70, 44],
	[6, 43, 19, 2, 44, 20],
	[6, 43, 15, 2, 44, 16],

	// 11
	[4, 101, 81],
	[1, 80, 50, 4, 81, 51],
	[4, 50, 22, 4, 51, 23],
	[3, 36, 12, 8, 37, 13],

	// 12
	[2, 116, 92, 2, 117, 93],
	[6, 58, 36, 2, 59, 37],
	[4, 46, 20, 6, 47, 21],
	[7, 42, 14, 4, 43, 15],

	// 13
	[4, 133, 107],
	[8, 59, 37, 1, 60, 38],
	[8, 44, 20, 4, 45, 21],
	[12, 33, 11, 4, 34, 12],

	// 14
	[3, 145, 115, 1, 146, 116],
	[4, 64, 40, 5, 65, 41],
	[11, 36, 16, 5, 37, 17],
	[11, 36, 12, 5, 37, 13],

	// 15
	[5, 109, 87, 1, 110, 88],
	[5, 65, 41, 5, 66, 42],
	[5, 54, 24, 7, 55, 25],
	[11, 36, 12],

	// 16
	[5, 122, 98, 1, 123, 99],
	[7, 73, 45, 3, 74, 46],
	[15, 43, 19, 2, 44, 20],
	[3, 45, 15, 13, 46, 16],

	// 17
	[1, 135, 107, 5, 136, 108],
	[10, 74, 46, 1, 75, 47],
	[1, 50, 22, 15, 51, 23],
	[2, 42, 14, 17, 43, 15],

	// 18
	[5, 150, 120, 1, 151, 121],
	[9, 69, 43, 4, 70, 44],
	[17, 50, 22, 1, 51, 23],
	[2, 42, 14, 19, 43, 15],

	// 19
	[3, 141, 113, 4, 142, 114],
	[3, 70, 44, 11, 71, 45],
	[17, 47, 21, 4, 48, 22],
	[9, 39, 13, 16, 40, 14],

	// 20
	[3, 135, 107, 5, 136, 108],
	[3, 67, 41, 13, 68, 42],
	[15, 54, 24, 5, 55, 25],
	[15, 43, 15, 10, 44, 16],

	// 21
	[4, 144, 116, 4, 145, 117],
	[17, 68, 42],
	[17, 50, 22, 6, 51, 23],
	[19, 46, 16, 6, 47, 17],

	// 22
	[2, 139, 111, 7, 140, 112],
	[17, 74, 46],
	[7, 54, 24, 16, 55, 25],
	[34, 37, 13],

	// 23
	[4, 151, 121, 5, 152, 122],
	[4, 75, 47, 14, 76, 48],
	[11, 54, 24, 14, 55, 25],
	[16, 45, 15, 14, 46, 16],

	// 24
	[6, 147, 117, 4, 148, 118],
	[6, 73, 45, 14, 74, 46],
	[11, 54, 24, 16, 55, 25],
	[30, 46, 16, 2, 47, 17],

	// 25
	[8, 132, 106, 4, 133, 107],
	[8, 75, 47, 13, 76, 48],
	[7, 54, 24, 22, 55, 25],
	[22, 45, 15, 13, 46, 16],

	// 26
	[10, 142, 114, 2, 143, 115],
	[19, 74, 46, 4, 75, 47],
	[28, 50, 22, 6, 51, 23],
	[33, 46, 16, 4, 47, 17],

	// 27
	[8, 152, 122, 4, 153, 123],
	[22, 73, 45, 3, 74, 46],
	[8, 53, 23, 26, 54, 24],
	[12, 45, 15, 28, 46, 16],

	// 28
	[3, 147, 117, 10, 148, 118],
	[3, 73, 45, 23, 74, 46],
	[4, 54, 24, 31, 55, 25],
	[11, 45, 15, 31, 46, 16],

	// 29
	[7, 146, 116, 7, 147, 117],
	[21, 73, 45, 7, 74, 46],
	[1, 53, 23, 37, 54, 24],
	[19, 45, 15, 26, 46, 16],

	// 30
	[5, 145, 115, 10, 146, 116],
	[19, 75, 47, 10, 76, 48],
	[15, 54, 24, 25, 55, 25],
	[23, 45, 15, 25, 46, 16],

	// 31
	[13, 145, 115, 3, 146, 116],
	[2, 74, 46, 29, 75, 47],
	[42, 54, 24, 1, 55, 25],
	[23, 45, 15, 28, 46, 16],

	// 32
	[17, 145, 115],
	[10, 74, 46, 23, 75, 47],
	[10, 54, 24, 35, 55, 25],
	[19, 45, 15, 35, 46, 16],

	// 33
	[17, 145, 115, 1, 146, 116],
	[14, 74, 46, 21, 75, 47],
	[29, 54, 24, 19, 55, 25],
	[11, 45, 15, 46, 46, 16],

	// 34
	[13, 145, 115, 6, 146, 116],
	[14, 74, 46, 23, 75, 47],
	[44, 54, 24, 7, 55, 25],
	[59, 46, 16, 1, 47, 17],

	// 35
	[12, 151, 121, 7, 152, 122],
	[12, 75, 47, 26, 76, 48],
	[39, 54, 24, 14, 55, 25],
	[22, 45, 15, 41, 46, 16],

	// 36
	[6, 151, 121, 14, 152, 122],
	[6, 75, 47, 34, 76, 48],
	[46, 54, 24, 10, 55, 25],
	[2, 45, 15, 64, 46, 16],

	// 37
	[17, 152, 122, 4, 153, 123],
	[29, 74, 46, 14, 75, 47],
	[49, 54, 24, 10, 55, 25],
	[24, 45, 15, 46, 46, 16],

	// 38
	[4, 152, 122, 18, 153, 123],
	[13, 74, 46, 32, 75, 47],
	[48, 54, 24, 14, 55, 25],
	[42, 45, 15, 32, 46, 16],

	// 39
	[20, 147, 117, 4, 148, 118],
	[40, 75, 47, 7, 76, 48],
	[43, 54, 24, 22, 55, 25],
	[10, 45, 15, 67, 46, 16],

	// 40
	[19, 148, 118, 6, 149, 119],
	[18, 75, 47, 31, 76, 48],
	[34, 54, 24, 34, 55, 25],
	[20, 45, 15, 61, 46, 16]
];

QRRSBlock.getRSBlocks = function(typeNumber, errorCorrectLevel) {
	
	var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);
	
	if (rsBlock == undefined) {
		throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
	}

	var length = rsBlock.length / 3;
	
	var list = new Array();
	
	for (var i = 0; i < length; i++) {

		var count = rsBlock[i * 3 + 0];
		var totalCount = rsBlock[i * 3 + 1];
		var dataCount  = rsBlock[i * 3 + 2];

		for (var j = 0; j < count; j++) {
			list.push(new QRRSBlock(totalCount, dataCount) );	
		}
	}
	
	return list;
}

QRRSBlock.getRsBlockTable = function(typeNumber, errorCorrectLevel) {

	switch(errorCorrectLevel) {
	case QRErrorCorrectLevel.L :
		return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
	case QRErrorCorrectLevel.M :
		return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
	case QRErrorCorrectLevel.Q :
		return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
	case QRErrorCorrectLevel.H :
		return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
	default :
		return undefined;
	}
}

//---------------------------------------------------------------------
// QRBitBuffer
//---------------------------------------------------------------------

function QRBitBuffer() {
	this.buffer = new Array();
	this.length = 0;
}

QRBitBuffer.prototype = {

	get : function(index) {
		var bufIndex = Math.floor(index / 8);
		return ( (this.buffer[bufIndex] >>> (7 - index % 8) ) & 1) == 1;
	},
	
	put : function(num, length) {
		for (var i = 0; i < length; i++) {
			this.putBit( ( (num >>> (length - i - 1) ) & 1) == 1);
		}
	},
	
	getLengthInBits : function() {
		return this.length;
	},
	
	putBit : function(bit) {
	
		var bufIndex = Math.floor(this.length / 8);
		if (this.buffer.length <= bufIndex) {
			this.buffer.push(0);
		}
	
		if (bit) {
			this.buffer[bufIndex] |= (0x80 >>> (this.length % 8) );
		}
	
		this.length++;
	}
};
(function( $ ){
	$.fn.qrcode = function(options) {
		// if options is string, 
		if( typeof options === 'string' ){
			options	= { text: options };
		}

		// set default values
		// typeNumber < 1 for automatic calculation
		options	= $.extend( {}, {
			render		: "canvas",
			width		: 256,
			height		: 256,
			typeNumber	: -1,
			correctLevel	: QRErrorCorrectLevel.H,
                        background      : "#ffffff",
                        foreground      : "#000000"
		}, options);

		var createCanvas	= function(){
			// create the qrcode itself
			var qrcode	= new QRCode(options.typeNumber, options.correctLevel);
			qrcode.addData(options.text);
			qrcode.make();

			// create canvas element
			var canvas	= document.createElement('canvas');
			canvas.width	= options.width;
			canvas.height	= options.height;
			var ctx		= canvas.getContext('2d');

			// compute tileW/tileH based on options.width/options.height
			var tileW	= options.width  / qrcode.getModuleCount();
			var tileH	= options.height / qrcode.getModuleCount();

			// draw in the canvas
			for( var row = 0; row < qrcode.getModuleCount(); row++ ){
				for( var col = 0; col < qrcode.getModuleCount(); col++ ){
					ctx.fillStyle = qrcode.isDark(row, col) ? options.foreground : options.background;
					var w = (Math.ceil((col+1)*tileW) - Math.floor(col*tileW));
					var h = (Math.ceil((row+1)*tileW) - Math.floor(row*tileW));
					ctx.fillRect(Math.round(col*tileW),Math.round(row*tileH), w, h);  
				}	
			}
			// return just built canvas
			return canvas;
		}

		// from Jon-Carlos Rivera (https://github.com/imbcmdth)
		var createTable	= function(){
			// create the qrcode itself
			var qrcode	= new QRCode(options.typeNumber, options.correctLevel);
			qrcode.addData(options.text);
			qrcode.make();
			
			// create table element
			var $table	= $('<table></table>')
				.css("width", options.width+"px")
				.css("height", options.height+"px")
				.css("border", "0px")
				.css("border-collapse", "collapse")
				.css('background-color', options.background);
		  
			// compute tileS percentage
			var tileW	= options.width / qrcode.getModuleCount();
			var tileH	= options.height / qrcode.getModuleCount();

			// draw in the table
			for(var row = 0; row < qrcode.getModuleCount(); row++ ){
				var $row = $('<tr></tr>').css('height', tileH+"px").appendTo($table);
				
				for(var col = 0; col < qrcode.getModuleCount(); col++ ){
					$('<td></td>')
						.css('width', tileW+"px")
						.css('background-color', qrcode.isDark(row, col) ? options.foreground : options.background)
						.appendTo($row);
				}	
			}
			// return just built canvas
			return $table;
		}
  

		return this.each(function(){
			var element	= options.render == "canvas" ? createCanvas() : createTable();
			jQuery(element).appendTo(this);
		});
	};
})( jQuery );
