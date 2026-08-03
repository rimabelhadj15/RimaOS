// ======================================
// RimaOS Notes App
// ======================================

console.log("Notes loaded");


// ==========================
// Notes Storage System
// ==========================

window.notes = JSON.parse(
    localStorage.getItem("rima_notes")
) || [];




// ==========================
// Get Elements
// ==========================

const titleInput = document.getElementById("note-title");

const contentInput = document.getElementById("note-content");

const saveButton = document.getElementById("save-note");

const notesList = document.getElementById("notes-list");




// ==========================
// Display Notes
// ==========================

function displayNotes() {

    notesList.innerHTML = "";

    window.notes.forEach((note, index) => {

        const card = document.createElement("div");

        card.className = "note-card";

        card.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.date}</p>
        `;

        card.onclick = function () {
            openNote(index);
        };

        notesList.appendChild(card);

    });

}


// ==========================
// Save Note
// ==========================

saveButton.onclick = function () {

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (title === "" || content === "") {
        console.log("Empty note");
        return;
    }

    const note = {

        title: title,
        content: content,
        date: new Date().toLocaleDateString()

    };

    window.notes.push(note);

    localStorage.setItem(
        "rima_notes",
        JSON.stringify(window.notes)
    );

    titleInput.value = "";
    contentInput.value = "";

    displayNotes();

    console.log("Note saved");

};

// ==========================
// Open Full Note
// ==========================

function openNote(index){


    const note = window.notes[index];


    titleInput.value = note.title;


    contentInput.value = note.content;


}




// ==========================
// Start App
// ==========================

displayNotes();