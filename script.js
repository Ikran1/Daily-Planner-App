$(document).ready(function () {
    localStorage.clear();
    // Display the current day at the top of the calender when a user opens the planner.
    var date = dayjs();
    $("#currentDay").text(date.format("dddd, MMMM D"));


    // Create a click event for the save button 
    $(".saveBtn").on("click", function () {
        const hour = $(this).parent().attr("data-hour");
        const task = $(this).siblings(".description").val();
        saveTasks(hour, task);
    });

    // Create a function to save the tasks onto the local storage
    function saveTasks(hour, task) {
        localStorage.setItem(`task_${hour}`, task);
    }

    // Retrieve the tasks from the local storage
    function retrieveTasks() {
        for (let i = 9; i <= 21; i++) {
            const task = localStorage.getItem(`task_${i}`);
            $(`.time-block[data-hour='${i}'] .description`).val(task);
        }
    }
  
    //Color-code each timeblock based on past, present, and future when the timeblock is viewed.
    function updateTimeBlockClasses() {
        const currentHour = date.hour();
        
        $(".time-block").each(function () {
            const eachHour = parseInt($(this).attr("data-hour"));
            $(this).removeClass("past present future");
            
            if (eachHour < currentHour) {
                $(this).addClass("past"); 
            } else if (eachHour === currentHour) {
                $(this).addClass("present");
            } else {
                $(this).addClass("future");
            }
      });
    }
  
    // Call on the retrieveTasks function to load the tasks onto the page 
    retrieveTasks();
  
    // Update time block classes when the page has loaded
    updateTimeBlockClasses();
  
    // SetInterval so that the time block is updated every minute
    setInterval(updateTimeBlockClasses, 60000);
  
 
  
  });
  