console.log("Settings loaded");


const desktop = document.getElementById("desktop");


const wallpapers = {

    wall1:
    "linear-gradient(135deg,#0066ff,#001a33)",


    wall2:
    "linear-gradient(135deg,#8000ff,#220033)",


    wall3:
    "linear-gradient(135deg,#000428,#004e92)"

};



document.querySelectorAll(".wallpaper-option")
.forEach(button=>{


    button.onclick=function(){


        const selected = this.dataset.wall;


        desktop.style.background =
        wallpapers[selected];


        localStorage.setItem(
            "rima_wallpaper",
            selected
        );


    };


});



const saved =
localStorage.getItem("rima_wallpaper");


if(saved){

    desktop.style.background =
    wallpapers[saved];

}
