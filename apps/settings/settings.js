console.log("Settings loaded");


const desktop = document.getElementById("desktop");


const wallpapers = {

    current: "",

    black: "#000000",

    blue: "#071a3d",

    green: "#062b1b",

    purple: "#210b35"

};


document.querySelectorAll(".wallpaper-option")
.forEach(button => {

    button.onclick = function () {

        const selected = this.dataset.wall;


        if (selected === "current") {

            desktop.style.background = "";

        }

        else {

            desktop.style.background =
                wallpapers[selected];

        }


        localStorage.setItem(
            "rima_wallpaper",
            selected
        );

    };

});


const savedWallpaper =
    localStorage.getItem("rima_wallpaper");


if (savedWallpaper &&
    savedWallpaper !== "current") {

    desktop.style.background =
        wallpapers[savedWallpaper];

}