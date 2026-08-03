// ======================================
// RimaOS Notes App
// ======================================
console.log("Notes.js loaded");
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
console.log("notesList:", notesList);




// ==========================
// Display Notes
// ==========================

function displayNotes() {
    console.log("DISPLAY NOTES START");

    console.log("notesList =", document.getElementById("notes-list"));

    notesList.innerHTML = "";

    

    window.notes.forEach((note, index) => {
        console.log("Card created:", note.title);

        const card = document.createElement("div");

        card.className = "note-card";

        card.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.date}</p>
        `;

        card.onclick = function () {
            console.log("CARD CLICKED", index);
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

function openNote(index) {
    alert("NEW OPEN NOTE");

    const note = window.notes[index];

    const noteWindow = document.createElement("div");

    noteWindow.className = "note-popup";

    noteWindow.innerHTML = `
        <div class="note-popup-header">
            <h2>${note.title}</h2>

            <button class="close-note">✕</button>
        </div>

        <div class="note-popup-content">
            ${note.content.replace(/\n/g,"<br>")}
        </div>
    `;

    document.body.appendChild(noteWindow);

    noteWindow.querySelector(".close-note").onclick = function () {
        noteWindow.remove();
    };

}




// ==========================
// Start App
// ==========================

displayNotes();