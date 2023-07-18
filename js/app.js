// target all the element 
let wrapper = document.querySelector(".wrapper")
let noteTitle = document.querySelector("#noteTitle")
let noteDesc = document.querySelector("#noteDesc")
let addNote = document.querySelector("#addNote")
let My_form = document.querySelector("#My_form")
let modal_title = document.querySelector(".modal-title")
let UpdateaddNote = document.querySelector("#UpdateaddNote")
let UpdatenoteTitle = document.querySelector("#UpdatenoteTitle")
let UpdatenoteDesc = document.querySelector("#UpdatenoteDesc")
let NoteappWrap = document.querySelector(".NoteappWrap")
//Data Array
let dataArray = JSON.parse(localStorage.getItem('DataList')) || []
// Get date 
$(document).ready(function () {


    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var AcDate = new Date();
    var simpleDate = AcDate.getDate();
    var dateYear = AcDate.getFullYear()
    var dateMonth = AcDate.getMonth()
    var monthName = month[dateMonth]

    var FullDate = monthName + "," + simpleDate + " " + dateYear

    // addNote eventlistener 
    addNote.addEventListener("click", (e) => {
        e.preventDefault()
        var noteTitleVal = noteTitle.value
        var noteDescVal = noteDesc.value
        if (noteTitleVal || noteDescVal) {
            let template = `<div class="noteBox">
        <h2>${noteTitleVal}</h2>
        <p>${noteDescVal}</p>
        <div class="bottomBox">
            <div class="row">
                <div class="col-6">
                    <p>${FullDate}</p>
                </div>
                <div class="col-6 bottom_dropdown">
                    <div class="dropdown">
                        <i class="fa-solid fa-ellipsis-vertical" id="dropdownMenuButton1"
                            data-bs-toggle="dropdown" arial-expanded="false"></i>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a href="#" class="dropdown-item">Edit</a></li>
                            <li id="deleteBtn"><a href="#" class="dropdown-item delete" >Delete</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `
            wrapper.innerHTML = wrapper.innerHTML + template
            dataArray.push({
                noteTitle: noteTitleVal,
                noteDesc: noteDescVal,
                date: FullDate
            })
            localStorage.setItem("DataList", JSON.stringify(dataArray))
            let noteBoxDiv = document.querySelectorAll(".noteBox")// target li from the class
            let arrayfrom = Array.from(noteBoxDiv)// convert node list into array
            arrayfrom.forEach((data, index) => {
                data.setAttribute("id", index)// added id on the li
            })
            My_form.reset();
            $('#exampleModal').modal('hide');
        }
    })



    dataArray.forEach((data, index) => {
        wrapper.innerHTML = wrapper.innerHTML + `<div class="noteBox">
    <h2>${data.noteTitle}</h2>
    <p>${data.noteDesc}</p>
    <div class="bottomBox">
        <div class="row">
            <div class="col-6">
                <p>${data.date}</p>
            </div>
            <div class="col-6 bottom_dropdown">
                <div class="dropdown">
                    <i class="fa-solid fa-ellipsis-vertical" id="dropdownMenuButton1"
                        data-bs-toggle="dropdown" arial-expanded="false"></i>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li onclick="UpdateNote(${index}, '${data.noteTitle}','${data.noteDesc}')"><a href="#" class="dropdown-item">Edit</a></li>
                        <li id="deleteBtn"><a href="#" class="dropdown-item delete" >Delete</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
    `
    })
    let deleteBtn = document.querySelectorAll("#deleteBtn")

    deleteBtn.forEach((data, index) => {
        data.addEventListener("click", (e) => {
            e.preventDefault()
            if (confirm("Are you sure to delete this item?") == true) {
                if (e.target.classList.contains("delete")) {
                    e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.remove()
                    var targrtid = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id
                    dataArray.splice(targrtid, 1)
                    localStorage.setItem("DataList", JSON.stringify(dataArray))
                    let noteBoxDiv = document.querySelectorAll(".noteBox")// target li from the class
                    let arrayfrom = Array.from(noteBoxDiv)// convert node list into array
                    arrayfrom.forEach((data, index) => {
                        console.log(data, index)
                        data.setAttribute("id", index)// added id on the li
                    })
                }

            } else {
                console.log("You canceled!")
            }
        })
    })
});

function UpdateNote(index, title, desc) {
    $('#exampleModal2').modal('show');
    UpdatenoteTitle.value = title
    UpdatenoteDesc.value = desc

    UpdateaddNote.addEventListener("click", () => {
        dataArray[index].noteTitle = UpdatenoteTitle.value
        dataArray[index].noteDesc = UpdatenoteDesc.value
        localStorage.clear(dataArray)
        localStorage.setItem("DataList", JSON.stringify(dataArray))
        dataArray.forEach((data, index) => {
            wrapper.innerHTML = wrapper.innerHTML + `<div class="noteBox">
    <h2>${data.noteTitle}</h2>
    <p>${data.noteDesc}</p>
    <div class="bottomBox">
        <div class="row">
            <div class="col-6">
                <p>${data.date}</p>
            </div>
            <div class="col-6 bottom_dropdown">
                <div class="dropdown">
                    <i class="fa-solid fa-ellipsis-vertical" id="dropdownMenuButton1"
                        data-bs-toggle="dropdown" arial-expanded="false"></i>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li onclick="UpdateNote(${index}, '${data.noteTitle}','${data.noteDesc}')"><a href="#" class="dropdown-item">Edit</a></li>
                        <li id="deleteBtn"><a href="#" class="dropdown-item delete" >Delete</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
    `
        })

    })
}
