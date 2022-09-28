import NoteList from "./noteList.js";
import NoteItem from "./noteItem.js";

const noteList = new NoteList();
let choose = true;

document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        initApp();
    }
});

function initApp() {
    const save = document.getElementById("save-button");
    save.addEventListener('click', (event) => {
        event.preventDefault();
        processSubmission();
    })
    loadListObject()
    refreshPage()
};

const clearItems = document.getElementById("clear");
clearItems.addEventListener("click", (event) => {
    document.getElementById("text-input").value = "";
})

const deleteSelection = document.getElementById("toggle");
deleteSelection.addEventListener("change", function() {
    if(this.checked) {
        choose = false;
    } else {
        choose = true;
    }
})

function title_check(title) {
    const list = noteList.get_list()
    if(list.length < 1) return true;
    for (let i = 0; i<list.length; i++) {
        if(list[i].getTitle() == title) {
            list[i].setText(getEntryText())
            return false;
        }
    }
    return true
}

function newItem(id, title, text, date_c, date_m) {
    const item = new NoteItem();
    item.setId(id);
    item.setTitle(title);
    item.setText(text);
    item.setDateCreated(date_c);
    item.setDateModified(date_m);
    return item;
};

function getEntryText() {
    return document.getElementById("text-input").value;
};

function getEntryTitle() {
    return document.getElementById("text-title").value;
};

function processSubmission() {
    const text_entry = getEntryText();
    const text_title = getEntryTitle();
    const date_created = "01/01/2022"
    const date_modified = "01/01/2022"
    if(title_check(text_title)) {
        if(!text_entry.length||!text_title.length) return;
        const nextId = calcId()
        const item = newItem(nextId, text_title, text_entry, date_created, date_modified);
        noteList.addItem(item)
    }
    updatePersistentData(noteList.get_list())
    refreshPage()
};

function calcId() {
    let nextItemId = 1;
    const list = noteList.get_list();
    if (list.length > 0) {
        nextItemId = list[list.length - 1].getId() + 1;
    }

    return nextItemId;
};

const updatePersistentData = (listArray) => {
    localStorage.setItem("NoteList", JSON.stringify(listArray));
};

const loadListObject = () => {
    const storedList = localStorage.getItem("NoteList");
    if (typeof storedList !== "string") return;
    const parseList = JSON.parse(storedList);
    parseList.forEach(itemObj => {
        const item = newItem(itemObj._id, itemObj._title, itemObj._text, itemObj._date_created, itemObj._date_modified);
        noteList.addItem(item)
    })    
}

function refreshPage() {
    clearDisplay()
    renderList()
    clearItemEntryField()
    setEntryFocus()
};

function clearDisplay() {
    const parentElement = document.getElementById("note-list");
    deleteContents(parentElement);
};

const deleteContents = (parentElement) => {
    let child = parentElement.lastElementChild;
    while (child) {
        parentElement.removeChild(child);
        child = parentElement.lastElementChild;
    }
};

const addClickListenerToSelection = (list_item) => {
    list_item.addEventListener('click', (event) =>{
        if(choose==true) {
            const note = noteList.get_list()[parseInt(list_item.id)-1];
            document.getElementById("text-input").value = note.getText();
            document.getElementById("text-title").value = note.getTitle();
        } else {
            noteList.removeItem(list_item.id);
            updatePersistentData(noteList.get_list());
            refreshPage();
        }
    })
}

const renderList = () => {
    const list =  noteList.get_list();
    list.forEach(item => {
        buildListItem(item);
    })
}

const buildListItem = (item) => {
    const list_item = document.createElement("div");
    const note_detail = document.createElement("div");
    const date_details = document.createElement("div");
    const label = document.createElement("h5");
    const date_created = document.createElement("p");
    const date_modified = document.createElement("p")
    list_item.className = "list-item";
    list_item.id = item.getId();
    addClickListenerToSelection(list_item)
    note_detail.className = "note-detail";
    date_details.className = "date-details";
    label.className = "note-title";
    label.textContent = item.getTitle();
    date_created.className = "date-created";
    date_created.textContent = item.getDateCreated();
    date_modified.className = "date-modified";
    date_modified.textContent = item.getDateModified();
    note_detail.appendChild(label);
    date_details.appendChild(date_created);
    date_details.appendChild(date_modified);
    list_item.appendChild(note_detail);
    list_item.appendChild(date_details);
    const notesContainer = document.getElementById("note-list");
    notesContainer.appendChild(list_item);
}

const clearItemEntryField = () => {
    document.getElementById("text-input").value = "";
    document.getElementById("text-title").value = "";
}

const setEntryFocus = () => {
    document.getElementById("text-title").focus()
}