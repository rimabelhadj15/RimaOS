// ======================================
// RimaOS Notes App
// ======================================


let notes = "";


function saveNote(){


    notes = document.querySelector("#noteArea").value;


    localStorage.setItem(
        "rima_notes",
        notes
    );


}



function loadNote(){


    let saved = localStorage.getItem(
        "rima_notes"
    );


    if(saved){


        document.querySelector("#noteArea").value = saved;


    }


}



document.addEventListener(
"DOMContentLoaded",
function(){


    let area = document.querySelector("#noteArea");


    if(area){


        area.addEventListener(
        "input",
        saveNote
        );


        loadNote();


    }


});