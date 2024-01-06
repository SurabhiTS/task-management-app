
const allTasks = document.getElementById("tasks-container");
let todaysHeading = document.createElement("h2");
todaysHeading.innerText = "Today";
const allDates =[]; // dates in strings, not sorted
let dates = []; // dates in date object , sorted -> it is used to get the position of the card if it exists
document.getElementById("btn").addEventListener("click",function(){
    const errorMessage = document.getElementById("errorMessage");
    const inputs = document.getElementsByTagName("input");
    let particularDaysTasks ;
    let heading;
    let dateTime = new Date(inputs[1].value);
    //input validation 
    
    let invalidInputs = (inputs[0].value == "") || (inputs[1].value == "") || (dateTime.getTime() < new Date().getTime());

    if(!invalidInputs){
   
        let pos = getIndex(dateTime);// gets the position of the existing card or new card
        let fullDate = dateTime.toDateString();
        console.log("fulldate",fullDate);
        /* particularDaysTasks indicates a card - each card has tasks for respective days. 
        If the card for the date is existing, then new task will be appended to the card 
        else a new card for the date is created and then new task is appended
        */
        errorMessage.innerText  = "";
        particularDaysTasks = createOrGetExisitingCard(fullDate,pos); // finds existing card for the date or created new card for the date 
       //creating a <div> element for each task 
       /*
          <div>
              <div>Task description</div>
              <div> Time</div>
              <i>check icon</i>
              <i>trash icon</i>
    
          </div>
       
       */ 
      
        const text = document.createElement("div");
        const task = document.createElement("div");
        const time = document.createElement("div");
        const tick = document.createElement("i");
        const del = document.createElement("i");
        
        tick.className ="bi bi-check-lg";
        del.className = "bi bi-trash";
        task.classList.add("task");
        time.classList.add("timeBox");
        text.classList.add("textStyle");
        
    
        text.innerText = document.getElementsByTagName("input")[0].value;
        time.innerText = dateTime.toLocaleTimeString();
        task.append(text,time,tick,del);
        particularDaysTasks.append(task);
        particularDaysTasks.classList.add("oneDayPlan");
       
    }
    else{
       errorMessage.innerText = "Please fill task and date";
    }

    }
  );


function getIndex(dateTime){
    let dateExists = false,place = dates.length;
    dateTime = new Date(dateTime.getFullYear(), dateTime.getMonth(),dateTime.getDate());
    for(let x of dates){
        if(x.getTime() == dateTime.getTime()){
          dateExists = true;
        }
      
    }
  
    if(!dateExists){
       for(let i=0;i < dates.length;i++){
        //below code sorts the dates in ascending order and loop executes as long as the input date is less than array item's value
        if(dates[i].getTime() > dateTime.getTime() && dates[i].getTime() != dateTime.getTime()){
            place = i;
            break;
        }
        
       }
    
       dates.splice(place,0,dateTime);
    }   

    return place;
}
   




function createOrGetExisitingCard(fullDate,pos){
    let particularDaysTasks,heading,allHeadings;
    
    if(!allDates.includes(fullDate)){
      
        allDates.push(fullDate);
        particularDaysTasks = document.createElement("div");
       
        heading = document.createElement("h3");
        heading.innerText = fullDate;
        if(new Date().toDateString() == fullDate){
            heading.style.opacity = "0";
            heading.style.position = "absolute";
            todaysHeading.style.zIndex = "1";
            particularDaysTasks.append(heading, todaysHeading);
        }
        else{
            particularDaysTasks.append(heading);   
        }
       
    
        allTasks.insertBefore(particularDaysTasks,allTasks.children[pos]);
    
    }
    else{
        allHeadings = document.getElementsByTagName("h3");
        
        for(let x of allHeadings){
           
            if(x.innerText.includes(fullDate)){
                particularDaysTasks = x.parentElement;
                break;
            }
           
        }
    }
   
   return particularDaysTasks;
}


document.getElementById("tasks-container").addEventListener("click",function(event){
    const target = event.target;
    let oneDayCard;
   
    if(target.className == "bi bi-check-lg"){
        target.parentElement.firstElementChild.style.textDecoration = "line-through";
        target.style.display = "none";
    }
    if(target.className == "bi bi-trash"){
        oneDayCard = target.parentElement.parentElement;
        target.parentElement.remove();
        // if the card has only one child which is heading , then the card is deleted
        if(oneDayCard.children.length == 1){
            for(let i in allDates){
                if(oneDayCard.firstElementChild.innerText == allDates[i]){
                      allDates.splice(i,1);
                      
                }
            }
            for(let i in dates){
                if(oneDayCard.firstElementChild.innerText == dates[i].toDateString()){
                    dates.splice(i,1);
                }
            }
                
            oneDayCard.remove(); // card is deleted if all the tasks on for the date is done
        }
        
       
        
    }
    
}); 