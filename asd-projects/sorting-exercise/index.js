/* IMPORTANT VALUES
 
This section contains a list of all variables predefined for you to use (that you will need)
 
The CSS ids you will work with are:
 
1. bubbleCounter -- the container for the counter text for bubble sort
2. quickCounter  -- the container for the counter text for quick sort
 
*/
 
///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES BELOW HERE /////////////////////
///////////////////////////////////////////////////////////////////////
 
// TODO 2: Implement bubbleSort
async function bubbleSort(array){
 
    //console.log("I have bee called...bubble    Length->" + array.length  +   "  First Value->"  + parseInt(array[0].value + ""));
     
        for (var i = 0; i < array.length ; i++){
           
        for (var j = 0; j < array.length-i-1 ; j++){
     
                //console.log("INdex j="  + j  +  " j+1=" + (j+1)  );
     
                if (array[j].value > array[j+1].value){
                   
                  // console.log(" Bubble Sort : Swapping " + array[j].value  + " with  " + array[j+1].value);
                  //console.log(" Bubble Sort : Swapping " + array[j].id  + " with  " + array[j+1].id);
     
                swap(j, j+1, array);
     
                // var coutnter=parseInt( $(bubbleCounter).html()) ;
                // counter++';
                // $(bubbleCounter).html(counter);
     
                updateCounter(bubbleCounter);
           
                drawSwap(array[j].id, array[j+1].id);
     
               await  sleep(100);
                }  
            }
     
           // console.log(array);
        }
     
        displayList(array);
    }
    // TODO 3: Implement quickSort
         async function quickSort(array,low,high ){
         
            if (low < high) {
   
                // find the pivot element such that
                // elements smaller than pivot are on left of pivot
                // elements greater than pivot are on right of pivot
                var partitionIndex  =await  partition(array, low, high);
               
                // recursive call on the left of pivot
                await quickSort(array, low, partitionIndex - 1);
               
                // recursive call on the right of pivot
                await quickSort(array, partitionIndex  + 1, high);
 
             
 
              }
             
        }
         
   
     
    // // TODOs 4 & 5: Implement partition
       async function partition(array,low,high){
 
            //assuming last element is pivot
            let  pivot=array[high].value;
 
            let partitionIndex =low-1;
         
           for(let  i=low;i<high;i++){
               
                if(array[i].value <= pivot){
 
                   // console.log("Found : " + array[i].value  + "  < " + pivot);
                 
                    partitionIndex++;
 
                    swap(partitionIndex ,i,array);
                    drawSwap(array[partitionIndex].id, array[i].id);
 
                   
                    updateCounter(quickCounter);
 
                    await  sleep(100);
                }
            }
 
            swap(partitionIndex+1,high,array);
            drawSwap(array[partitionIndex +1 ].id, array[high].id);
           
            await  sleep(100);
 
           
            return (partitionIndex+1);
 
        }
 
     
     
    // TODO 1: Implement swap
    function swap(i, j, array){
        var temp;
     
     
        temp=array[i].value;
        array[i].value=array[j].value;
        array[j].value=temp;
     
     
    }
     
     
     
    ///////////////////////////////////////////////////////////////////////
    /////////////////////// YOUR WORK GOES ABOVE HERE /////////////////////
    ///////////////////////////////////////////////////////////////////////
     
    //////////////////////////// HELPER FUNCTIONS /////////////////////////
     
    // this function makes the program pause by SLEEP_AMOUNT milliseconds whenever it is called
    function sleep(){
        return new Promise(resolve => setTimeout(resolve, SLEEP_AMOUNT));
    }
     
    // This function draws the swap on the screen
    function drawSwap( i, j){
        let element1 =i;
        let element2 =j;
     
       
       // console.log(" Bubble Sort : Swapping " + element1  + " with  " + element2);
        //console.log(" Bubble Sort : Swapping " + element1  + " with  " + element2);
       // console.log("----------------------");
     
        let temp = parseFloat($(element1).css("top")) + "px";
     
        $(element1).css("top", parseFloat($(element2).css("top")) + "px");
        $(element2).css("top", temp);
    }
     
    // This function updates the specified counter
    function updateCounter(counter){
        $(counter).text("Move Count: " + (parseFloat($(counter).text().replace(/^\D+/g, '')) + 1));
    }
   
   

