console.log("Settings loaded");


function startSettings() {

    const desktop =
        document.getElementById("desktop");


    if (!desktop) {

        console.error("Desktop not found");

        return;

    }


    console.log("Settings initialized");


    // ==========================
    // Wallpaper
    // ==========================

    const wallpaperButtons =
        document.querySelectorAll(
            ".wallpaper-option"
        );


    function applyWallpaper(name) {

        desktop.style.background = "";


        if (name === "black") {

            desktop.style.background = "#000000";

        }

        else if (name === "blue") {

            desktop.style.background = "#123b70";

        }

        else if (name === "green") {

            desktop.style.background = "#123d2a";

        }

        else if (name === "purple") {

            desktop.style.background = "#42206b";

        }


        wallpaperButtons.forEach(button => {

            button.classList.remove("active");

        });


        const selected =
            document.querySelector(
                `[data-wall="${name}"]`
            );


        if (selected) {

            selected.classList.add("active");

        }

    }


    wallpaperButtons.forEach(button => {

        button.onclick = function() {

            const wallpaper =
                this.dataset.wall;

            localStorage.setItem(
                "rimaos_wallpaper",
                wallpaper
            );

            applyWallpaper(wallpaper);

        };

    });


    const savedWallpaper =
        localStorage.getItem(
            "rimaos_wallpaper"
        );


    applyWallpaper(
        savedWallpaper || "current"
    );



    // ==========================
    // Terminal Color
    // ==========================

    const terminalColor =
        document.getElementById(
            "terminal-color"
        );


    const savedTerminalColor =
        localStorage.getItem(
            "rimaos_terminal_color"
        ) || "#00ff88";


    terminalColor.value =
        savedTerminalColor;


    terminalColor.oninput = function() {

        localStorage.setItem(
            "rimaos_terminal_color",
            this.value
        );


        document.documentElement.style
            .setProperty(
                "--terminal-color",
                this.value
            );

    };


    document.documentElement.style
        .setProperty(
            "--terminal-color",
            savedTerminalColor
        );


    // ==========================
    // Time Format
    // ==========================

    const timeFormat =
        document.getElementById(
            "time-format"
        );


    const savedTimeFormat =
        localStorage.getItem(
            "rimaos_time_format"
        ) || "24";


    timeFormat.value =
        savedTimeFormat;


    timeFormat.onchange = function() {

        localStorage.setItem(
            "rimaos_time_format",
            this.value
        );

        if (typeof updateTime === "function") {

            updateTime();

        }

    };

}


if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        startSettings
    );

}

else {

    startSettings();

}