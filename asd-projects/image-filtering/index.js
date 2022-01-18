// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads and is where you should call your functions.
$(document).ready(function(){
    const $display = $('#display');

    // TODO: Call your apply function(s) here

applyFilter(reddify);



    render($display, image);
});

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here
function applyFilter() {
    for (var r = 0; r < image.length; r++) { 
        var row = image[r];
     
        for (var c = 0; c < row.length; c++) { 
        var rgbString = rgbString[r][c];
        var  rgbNumbers = rgbStringToArray (rgbString)   
    rgbNumbers [RED] = 255;

    rgbString = rgbArrayToString (rgbNumbers);
    
    }
    }
}

function reddify (){

}


function keepInBounds(boundColors) {

    if (boundColors < 0)
 return  0;
 if (boundColors > 255)
 return 255
 return boundColors
}
 

// CHALLENGE code goes below her