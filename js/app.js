console.log("welcome")
shownotes();


// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function(e) {
        let addTxt = document.getElementById("addTxt");
        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObj = [];
        } else {
            notesObj = JSON.parse(notes);
        }

        if (addTxt.value == "") {} else {

            notesObj.push(addTxt.value);
        }
        localStorage.setItem("notes", JSON.stringify(notesObj));
        addTxt.value = "";
        console.log(notesObj);
        shownotes();
    })
    //function to show notes from local storage
function shownotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = ""

    notesObj.forEach(function(element, index) {
        html += `
        <div class="card my-2 mx-2 notescard" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Notes${index+1}</h5>
                    <p class="card-text">${element}</p>
                    <button  id=${index} onclick="deletenote(this.id)" class="btn btn-primary">Delete note</a>
                </div>
            </div>
        `
    });
    let noteselm = document.getElementById('notes');
    if (notesObj.length != 0) {
        noteselm.innerHTML = html
    } else {
        noteselm.innerHTML = `<div class="card my-2 mx-2 notescard bg-dark" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title text-light">example</h5>
            <p class="card-text text-light">your notes will appear here</p>
            <button id="0" onclick="deletenote(this.id)" class="btn btn-light">Delete note</a>
        </div>
    </div>`
    }
}
// function to delete notes

function deletenote(index) {
    console.log('i m deleting', index)
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1)
    localStorage.setItem("notes", JSON.stringify(notesObj));
    shownotes()
}

let search = document.getElementById('searchtxt');
search.addEventListener('input', function() {
    let inputvalue = search.value.toLowerCase();
    console.log('seach', inputvalue)
    let notescard = document.getElementsByClassName('notescard');
    Array.from(notescard).forEach(function(element) {
        let cardtxt = element.getElementsByTagName('p')[0].innerText;
        if (cardtxt.includes(inputvalue)) {
            element.style.display = "block"
        } else {
            element.style.display = "none"
        }
    })
})