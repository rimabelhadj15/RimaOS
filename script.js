// ======================================
// RimaOS Core System
// App Manager + Window Manager
// ======================================



// ==========================
// Global Variables
// ==========================


const desktop = document.getElementById("desktop");

const dock = document.querySelector(".dock");

const statusBar = document.querySelector(".status-bar");



let zIndex = 100;



let windows = [];





// ==========================
// Applications Database
// ==========================


const apps = {


    welcome: {

        name: "Welcome",

        icon: "&#9881;",

        window: null,
        permanent: true

    },



    terminal: {

        name: "Terminal",

        icon: "&#xE756;",

        window: null,
        permanent: true

    },



    settings: {

        name: "Settings",

        icon: "&#xE713;",

        window: null,
        permanent: true

    },
    notes: {
    name: "Notes",
    icon: "icons/notes.png",
    window: null,
    permanent: false
    }



};



// ==========================
// Create Desktop Icon
// ==========================

function createDesktopIcon(appName){

    const app = apps[appName];

    const icon = document.createElement("div");

    icon.className = "desktop-icon";


    let iconContent;


    if(app.icon.includes("&#")){

        iconContent = `<div class="emoji-icon">${app.icon}</div>`;

    }
    else{

        iconContent = `<img src="${app.icon}">`;

    }



    icon.innerHTML = `

        ${iconContent}

        <p>${app.name}</p>

    `;



    icon.onclick = function(){

        openApp(appName);

    };



    document
    .getElementById("desktop")
    .appendChild(icon);

}

// ==========================
// Clock
// ==========================


function updateTime(){


    const time = document.getElementById("time");



    if(!time){

        return;

    }



    const now = new Date();



    time.textContent =

    now.getHours().toString().padStart(2,"0")

    + ":"

    +

    now.getMinutes().toString().padStart(2,"0");


}





setInterval(updateTime,1000);


updateTime();







// ==========================
// Window Focus
// ==========================


function focusWindow(win){


    if(!win){

        return;

    }



    zIndex++;


    win.style.zIndex = zIndex;



    windows.forEach(w=>{


        w.classList.remove("active");


    });



    win.classList.add("active");



}







// ==========================
// Create Window
// ==========================


function createWindow(title,content,appName){



    const win = document.createElement("div");


    win.className = "window opening";



    win.style.zIndex = ++zIndex;



    win.innerHTML = `


        <div class="window-bar">


            <div class="window-title">

                ${title}

            </div>



            <div class="buttons">


                <button class="minimize">

                    _

                </button>



                <button class="maximize">

                    □

                </button>



                <button class="close">

                    X

                </button>


            </div>


        </div>



        <div class="separator"></div>



        <div class="window-content">


            ${content}


        </div>


    `;



    desktop.appendChild(win);



    windows.push(win);



    apps[appName].window = win;



    setupWindow(win,appName);



    setTimeout(()=>{


        win.classList.remove("opening");


    },300);



    focusWindow(win);



    return win;


}
// ======================================
// Window Controls + Drag System
// ======================================





function setupWindow(win,appName){



    const bar = win.querySelector(".window-bar");


    const minimize = win.querySelector(".minimize");


    const maximize = win.querySelector(".maximize");


    const close = win.querySelector(".close");



    let maximized = false;


    let oldPosition = {};





    // ==========================
    // Dragging
    // ==========================


    let dragging = false;


    let offsetX = 0;


    let offsetY = 0;



    bar.addEventListener("mousedown",function(e){



        if(e.target.tagName === "BUTTON"){

            return;

        }



        if(maximized){

            return;

        }



        dragging = true;



        win.classList.add("dragging");



        const rect = win.getBoundingClientRect();


        win.style.transform = "none";


        win.style.left = rect.left + "px";

        win.style.top = rect.top + "px";



        offsetX = e.clientX - rect.left;

        offsetY = e.clientY - rect.top;


        focusWindow(win);



    });





    document.addEventListener("mousemove",function(e){



        if(!dragging){

            return;

        }



        win.style.left =

        (e.clientX - offsetX) + "px";



        win.style.top =

        (e.clientY - offsetY) + "px";



    });





    document.addEventListener("mouseup",function(){



        dragging = false;


        win.classList.remove("dragging");



    });









    // ==========================
    // Minimize
    // ==========================



minimize.onclick = function(){

    win.style.display = "none";

};







    // ==========================
// Maximize
// ==========================

maximize.onclick = function(){


    if(!maximized){


        const rect = win.getBoundingClientRect();


        oldPosition = {

            left: rect.left,

            top: rect.top,

            width: rect.width,

            height: rect.height

        };


        // Reset dragging position
        
        win.style.width = "";
        win.style.height = "";

        win.style.transform = "none";

        win.classList.add("maximized");

        statusBar.classList.add("fullscreen");


        maximized = true;


    }

    else{


    win.classList.remove("maximized");


    win.style.left = oldPosition.left + "px";
    win.style.top = oldPosition.top + "px";

    win.style.width = oldPosition.width + "px";
    win.style.height = oldPosition.height + "px";


    statusBar.classList.remove("fullscreen");


    maximized = false;


}

};




    // ==========================
    // Close
    // ==========================



   close.onclick = function(){


    win.remove();
    const dockIcon = document.querySelector(
        `.dock-icon[data-app="${appName}"]`
    );


    if(!apps[appName].permanent && dockIcon){

    dockIcon.remove();

}


    windows = windows.filter(w=>w !== win);


    apps[appName].window = null;



    document
    .querySelector(`[data-app="${appName}"]`)
    .classList.remove("running");


};



}
// ======================================
// App Loader System
// ======================================





async function openApp(appName){



    const app = apps[appName];



    if(!app){

        console.error("App does not exist:",appName);

        return;

    }







    // ==========================
    // If already open
    // ==========================



    if(app.window){



        if(app.window.classList.contains("closed")){


            app.window.classList.remove("closed");


        }



        focusWindow(app.window);



        return;


    }







    try{



        const htmlResponse = await fetch(

            `apps/${appName}/${appName}.html`

        );



        const html = await htmlResponse.text();








        createWindow(

            app.name,

            html,

            appName

        );
        addToDock(appName);
        const dockButton = document.querySelector(
            `.app-button[data-app="${appName}"]`
        );


        if(dockButton){

            dockButton.classList.add("running");

        }
        document
        .querySelector(`[data-app="${appName}"]`)
        .classList.add("running");







        // Load app CSS



        const css = document.createElement("link");



        css.rel = "stylesheet";



        css.href =

        `apps/${appName}/${appName}.css`;



        document.head.appendChild(css);








        // Load app JS



        const js = document.createElement("script");



        js.src =

        `apps/${appName}/${appName}.js`;



        document.body.appendChild(js);







    }


    catch(error){



        console.error(

            "Failed loading app:",

            appName,

            error

        );



    }




}









// ======================================
// Dock Buttons
// ======================================





document.querySelectorAll(".app-button")
.forEach(button=>{


    button.addEventListener("click",()=>{


        const appName = button.dataset.app;


        const app = apps[appName];



        console.log("Clicked:", appName);



        if(app.window){


            console.log("Window exists");



            app.window.style.display = "flex";



            focusWindow(app.window);



        }

        else{


            console.log("Opening new app");


            openApp(appName);


        }



    });


});





// ======================================
// Hide / Show Dock
// ======================================





function hideDock(){



    dock.classList.add("hidden");



}







function showDock(){



    dock.classList.remove("hidden");



}








// Check if a window covers the dock



function checkDock(){

    const visibleWindow = windows.find(w=>
        !w.classList.contains("closed")
    );


    if(!visibleWindow){

        showDock();

        return;

    }


    const rect = visibleWindow.getBoundingClientRect();


    // Fullscreen window
    if(visibleWindow.classList.contains("maximized")){

        if(dock.matches(":hover")){

            showDock();

        }
        else if(!dock.matches(":hover")){

            hideDock();

        }

        return;

    }



    if(rect.bottom >= window.innerHeight - 60){

        hideDock();

    }

    else{

        showDock();

    }

}






// Mouse reveal dock



document.addEventListener("mousemove",e=>{



    if(e.clientY > window.innerHeight - 50){



        showDock();



    }

    else{


        checkDock();


    }



});
// ======================================
// Status Bar System
// ======================================





function hideStatusBar(){



    statusBar.style.top = "-60px";



}







function showStatusBar(){



    statusBar.style.top = "13px";



}








function checkStatusBar(){


    const visibleWindow = windows.find(w=>
        !w.classList.contains("closed")
    );


    if(!visibleWindow){

        showStatusBar();

        return;

    }



    const rect = visibleWindow.getBoundingClientRect();



    // Fullscreen window
    if(visibleWindow.classList.contains("maximized")){

        if(statusBar.matches(":hover")){

            showStatusBar();

        }
        else{

            hideStatusBar();

        }

        return;

    }



    if(rect.top <= 40){

        hideStatusBar();

    }
    else{

        showStatusBar();

    }

}







// Mouse reveal status bar



document.addEventListener("mousemove",e=>{



    // Top of screen



    if(e.clientY < 50){



        showStatusBar();



    }

    else{



        checkStatusBar();



    }






    // Bottom dock



    if(e.clientY > window.innerHeight - 50){



        showDock();



    }

    else{



        checkDock();



    }



});









// ======================================
// Window Collision Updates
// ======================================





setInterval(()=>{



    checkStatusBar();



    checkDock();



},300);









// ======================================
// Start RimaOS
// ======================================





window.addEventListener("load",()=>{



    console.log("RimaOS Started");



    openApp("welcome");



});

window.onload = function(){

    createDesktopIcon("notes");
    createDesktopIcon("welcome");

};

// ==========================
// Add App To Dock
// ==========================

function addToDock(appName){


    const app = apps[appName];


    if(document.querySelector(
        `.app-button[data-app="${appName}"]`
    )){
        return;
    }


    const icon = document.createElement("div");


    icon.className = "dock-icon app-button";

    icon.dataset.app = appName;


    if(app.icon.includes(".png")){


        icon.innerHTML = `

            <img src="${app.icon}">

        `;


    }
    else{


        icon.innerHTML = app.icon;


    }


    icon.onclick = function(){


        openApp(appName);


    };


    dock.appendChild(icon);


}