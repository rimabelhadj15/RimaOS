// =====================
// Window System
// =====================

const windowBox = document.querySelector(".window");
const windowBar = document.querySelector(".window-bar");
const dock = document.querySelector(".dock");


let isDragging = false;

let offsetX = 0;
let offsetY = 0;


let isMaximized = false;

let savedWindow = {};




// =====================
// Dragging
// =====================

windowBar.addEventListener("mousedown", function(event){


    if(event.target.tagName === "BUTTON"){
        return;
    }


    if(isMaximized){
        return;
    }



    const rect = windowBox.getBoundingClientRect();



    windowBox.style.transform = "none";

    windowBox.style.left = rect.left + "px";

    windowBox.style.top = rect.top + "px";



    offsetX = event.clientX - rect.left;

    offsetY = event.clientY - rect.top;



    isDragging = true;


});





document.addEventListener("mousemove", function(event){


    if(isDragging){


        windowBox.style.left =
        event.clientX - offsetX + "px";


        windowBox.style.top =
        event.clientY - offsetY + "px";


        checkDockCollision();


    }


});





document.addEventListener("mouseup", function(){


    isDragging = false;


});





// =====================
// Buttons
// =====================


const minimizeBtn = document.querySelector(".minimize");

const maximizeBtn = document.querySelector(".maximize");

const closeBtn = document.querySelector(".close");





// =====================
// Minimize
// =====================

minimizeBtn.onclick = function(){

    windowBox.style.display = "none";

};





// =====================
// Maximize
// =====================

maximizeBtn.onclick = function(){


    if(!isMaximized){


        const rect = windowBox.getBoundingClientRect();



        savedWindow = {

            left: rect.left,

            top: rect.top,

            width: windowBox.offsetWidth,

            height: windowBox.offsetHeight

        };



        windowBox.style.transform = "none";


        windowBox.style.left = "0px";

        windowBox.style.top = "0px";


        windowBox.style.width = "100vw";

        windowBox.style.height = "100vh";


        windowBox.style.borderRadius = "0px";



        isMaximized = true;



        hideDock();


    }

    else{


        windowBox.style.left =
        savedWindow.left + "px";


        windowBox.style.top =
        savedWindow.top + "px";


        windowBox.style.width =
        savedWindow.width + "px";


        windowBox.style.height =
        savedWindow.height + "px";


        windowBox.style.borderRadius = "16px";



        isMaximized = false;



        showDock();


    }


};





// =====================
// Close
// =====================

closeBtn.onclick = function(){

    windowBox.remove();

};





// =====================
// Dock Control
// =====================


function hideDock(){

    if(dock){

        dock.style.bottom = "-60px";

    }

}





function showDock(){

    if(dock){

        dock.style.bottom = "13px";

    }

}





function checkDockCollision(){


    const windowRect = windowBox.getBoundingClientRect();


    const dockHeight = 70;



    if(windowRect.bottom > window.innerHeight - dockHeight){


        hideDock();


    }

    else{


        showDock();


    }


}





document.addEventListener("mousemove", function(event){


    if(event.clientY > window.innerHeight - 50){


        showDock();


    }

    else{


        checkDockCollision();


    }


});