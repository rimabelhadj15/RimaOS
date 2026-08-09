console.log("Terminal loaded");


function startTerminal() {

    const terminalInput =
        document.getElementById("terminal-input");

    const terminalOutput =
        document.getElementById("terminal-output");


    if (!terminalInput || !terminalOutput) {

        console.error("Terminal elements not found");

        return;

    }


    console.log("Terminal initialized");


    let commandHistory = [];

    let historyIndex = -1;


    // ==========================
    // Auto Scroll
    // ==========================

    function scrollToBottom() {

        requestAnimationFrame(() => {

            terminalOutput.scrollTop =
                terminalOutput.scrollHeight;

        });

    }


    // ==========================
    // Print
    // ==========================

    function printTerminal(text, className = "") {

        const line =
            document.createElement("div");


        if (className) {

            line.className = className;

        }


        line.innerHTML = text;


        terminalOutput.appendChild(line);


        // Always move to the newest output

        scrollToBottom();

    }


    // ==========================
    // RimaOS Startup
    // ==========================

    printTerminal(
`<span class="terminal-success">
██████╗ ██╗███╗   ███╗ █████╗ 
██╔══██╗██║████╗ ████║██╔══██╗
██████╔╝██║██╔████╔██║███████║
██╔══██╗██║██║╚██╔╝██║██╔══██║
██║  ██║██║██║ ╚═╝ ██║██║  ██║
╚═╝  ╚═╝╚═╝╚═╝     ╚═╝╚═╝  ╚═╝x

RimaOS Terminal
Version 1.0

Type "help" to see available commands.
</span>`
    );


    // ==========================
    // Execute Command
    // ==========================

    function executeCommand(command) {

        const trimmed =
            command.trim();


        if (trimmed === "") {

            return;

        }


        printTerminal(
            `<span class="terminal-prompt">rima@rimaos:~$</span> ${trimmed}`
        );


        commandHistory.push(trimmed);

        historyIndex =
            commandHistory.length;


        const parts =
            trimmed.split(/\s+/);


        const mainCommand =
            parts[0].toLowerCase();


        // ==========================
        // HELP
        // ==========================

        if (mainCommand === "help") {

            printTerminal(
`<span class="terminal-info">
Available commands:

help        Show available commands
clear       Clear terminal
date        Show date
time        Show time
whoami      Show current user
about       About RimaOS
apps        Show installed apps
open        Open an app
echo        Print text
neofetch    Show RimaOS information
</span>`
            );

        }


        // ==========================
        // CLEAR
        // ==========================

        else if (mainCommand === "clear") {

            terminalOutput.innerHTML = "";

            scrollToBottom();

        }


        // ==========================
        // DATE
        // ==========================

        else if (mainCommand === "date") {

            printTerminal(
                new Date().toLocaleDateString()
            );

        }


        // ==========================
        // TIME
        // ==========================

        else if (mainCommand === "time") {

            printTerminal(
                new Date().toLocaleTimeString()
            );

        }


        // ==========================
        // WHOAMI
        // ==========================

        else if (mainCommand === "whoami") {

            printTerminal("rima");

        }


        // ==========================
        // ABOUT
        // ==========================

        else if (mainCommand === "about") {

            printTerminal(
`<span class="terminal-info">
RimaOS Terminal

Operating System: RimaOS
Version: 1.0
Creator: Rima
Built with HTML, CSS & JavaScript
</span>`
            );

        }


        // ==========================
        // APPS
        // ==========================

        else if (mainCommand === "apps") {

            printTerminal(
`<span class="terminal-info">
Installed applications:

• Welcome
• Terminal
• Settings
• Calculator
• Notes
</span>`
            );

        }


        // ==========================
        // OPEN
        // ==========================

        else if (mainCommand === "open") {

            const appName =
                parts[1]?.toLowerCase();


            if (!appName) {

                printTerminal(
                    "Usage: open [app]"
                );

                return;

            }


            const availableApps = [
                "welcome",
                "terminal",
                "settings",
                "calculator",
                "notes"
            ];


            if (!availableApps.includes(appName)) {

                printTerminal(
`<span class="terminal-error">
Application not found: ${appName}
</span>`
                );

                return;

            }


            if (typeof openApp === "function") {

                printTerminal(
`<span class="terminal-success">
Opening ${appName}...
</span>`
                );


                openApp(appName);

            }

            else {

                printTerminal(
`<span class="terminal-error">
RimaOS app manager is unavailable.
</span>`
                );

            }

        }


        // ==========================
        // ECHO
        // ==========================

        else if (mainCommand === "echo") {

            printTerminal(
                parts.slice(1).join(" ")
            );

        }


        // ==========================
        // NEOFETCH
        // ==========================

        else if (mainCommand === "neofetch") {

            printTerminal(
`<span class="terminal-success">
██████╗ ██╗███╗   ███╗ █████╗ 
██╔══██╗██║████╗ ████║██╔══██╗
██████╔╝██║██╔████╔██║███████║
██╔══██╗██║██║╚██╔╝██║██╔══██║
██║  ██║██║██║ ╚═╝ ██║██║  ██║
╚═╝  ╚═╝╚═╝╚═╝     ╚═╝╚═╝  ╚═╝

RimaOS
Version: 1.0
User: Rima
Shell: RimaShell
</span>`
            );

        }


        // ==========================
        // UNKNOWN
        // ==========================

        else {

            printTerminal(
`<span class="terminal-error">
Command not found: ${mainCommand}
Type "help" for available commands.
</span>`
            );

        }


        // Final scroll after command

        scrollToBottom();

    }


    // ==========================
    // Keyboard
    // ==========================

    terminalInput.addEventListener(
        "keydown",
        function(event) {


            // ENTER

            if (event.key === "Enter") {

                event.preventDefault();


                executeCommand(
                    terminalInput.value
                );


                terminalInput.value = "";

            }


            // UP

            else if (event.key === "ArrowUp") {

                event.preventDefault();


                if (commandHistory.length === 0) {

                    return;

                }


                if (historyIndex > 0) {

                    historyIndex--;

                }


                terminalInput.value =
                    commandHistory[historyIndex];

            }


            // DOWN

            else if (event.key === "ArrowDown") {

                event.preventDefault();


                if (
                    historyIndex <
                    commandHistory.length - 1
                ) {

                    historyIndex++;


                    terminalInput.value =
                        commandHistory[historyIndex];

                }

                else {

                    historyIndex =
                        commandHistory.length;

                    terminalInput.value = "";

                }

            }

        }
    );


    // ==========================
    // Focus
    // ==========================

    document
        .querySelector(".terminal-app")
        .addEventListener(
            "click",
            function() {

                terminalInput.focus();

            }
        );


    terminalInput.focus();

}

window.startTerminal = startTerminal;

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startTerminal);
} else {
    startTerminal();
}