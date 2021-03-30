let addButton = document.querySelector('.addButton')
let content = document.querySelector('.content')
let navList = document.querySelector('.list')
let emptyContainer = document.querySelector('.emptyContainer')
let inputs = document.querySelectorAll('input')

//Adding new book elements
let newBookInterface = document.querySelector('.newBookInterface')
let newBookAdd = document.querySelector('#newBookAdd')
let newBookCancel = document.querySelector('#newBookCancel')
let newBookInputs = document.querySelectorAll('.newBookTab input')
let giveBookName = document.querySelector('#giveBookName')
let giveBookAuthor = document.querySelector('#giveBookAuthor')
let giveBookTotal = document.querySelector('#giveBookTotal')
let giveBookCurrent = document.querySelector('#giveBookCurrent')

//Editing book elements
let editBookInterface = document.querySelector('.editBookInterface')
let editBookSave = document.querySelector('#editBookSave')
let editBookCancel = document.querySelector('#editBookCancel')
let editBookInputs = document.querySelectorAll('.editBookTab input')
let editBookName = document.querySelector('#editBookName')
let editBookAuthor = document.querySelector('#editBookAuthor')
let editBookTotal = document.querySelector('#editBookTotal')
let editBookCurrent = document.querySelector('#editBookCurrent')

let bookLibrary = []

const Book = function(name, author, totalPage, currentPage, id) {
    this.name = name
    this.author = author
    this.totalPage = totalPage
    this.currentPage = currentPage
    this.id = id

    this.getBookCard = function(){
        const bookTemplate = `
        <div class="book">
            <div class="bookTop">
                <p class="bookTitle">${this.name}</p>
                <p class="bookAuthor">by ${this.author}</p>
            </div>
            <div class="bookBottom">
                <p class="bookPages" id="currentPages">Current: ${this.currentPage}</p>
                <p class="bookPages" id="totalPages">Total pages: ${this.totalPage}</p>
                <div class="bookBottomButtons">
                    <button class="bookButton" id="editButton" onclick="editBook(${this.id})">Edit</button>
                    <button class="bookButton" id="minusButton" onclick="reduceCurrent(${this.id})">-</button>
                    <button class="bookButton" id="plusButton" onclick="addCurrent(${this.id})">+</button>
                </div>
            </div>
        </div>`

        return bookTemplate
    }
    this.getListItem = function (){
        const listTemplate =`
        <div class="listItem">
            <div class="listName">${this.name}</div>
            <button class="listButton" id="listEditButton" onclick="editBook(${this.id})">Edit</button>
            <button class="listButton" id="listRemoveButton" onclick="removeBook(${this.id})">Remove</button>
        </div>`
        return listTemplate
    }
}

function getNextID(){
    let id = bookLibrary.length
    return id
}

function checkAddInputs(){
    bookValidationNumber = 0;

    if(giveBookAuthor.value!='') bookValidationNumber+=1;
    if(giveBookName.value!='') bookValidationNumber+=2;
    if(giveBookCurrent.value!='') bookValidationNumber+=4;
    if(parseInt(giveBookCurrent.value)<=parseInt(giveBookTotal.value)) bookValidationNumber+=8;
    if(parseInt(giveBookCurrent.value)>0) bookValidationNumber+=16;
    if(giveBookTotal.value!='') bookValidationNumber+=32;
    if(parseInt(giveBookTotal.value)>0) bookValidationNumber+=64;

    return bookValidationNumber;
}

function checkEditInputs(){
    bookValidationNumber = 0;

    if(editBookAuthor.value!='') bookValidationNumber+=1;
    if(editBookName.value!='') bookValidationNumber+=2;
    if(editBookCurrent.value!='') bookValidationNumber+=4;
    if(parseInt(editBookCurrent.value)<=parseInt(editBookTotal.value)) bookValidationNumber+=8;
    if(parseInt(editBookCurrent.value)>0) bookValidationNumber+=16;
    if(editBookTotal.value!='') bookValidationNumber+=32;
    if(parseInt(editBookTotal.value)>0) bookValidationNumber+=64;

    return bookValidationNumber;
}

function addCurrent(id){
    if(bookLibrary[id].currentPage<bookLibrary[id].totalPage){
        bookLibrary[id].currentPage++
        console.log('add')
        refreshLibrary()
    }

}

function reduceCurrent(id){
    if(bookLibrary[id].currentPage>1){
        bookLibrary[id].currentPage--
        refreshLibrary()
    }

}

function editBook(id){
    editBookName.value = bookLibrary[id].name
    editBookAuthor.value = bookLibrary[id].author
    editBookTotal.value = bookLibrary[id].totalPage
    editBookCurrent.value = bookLibrary[id].currentPage
    editBookSave.setAttribute('onclick',`saveBook(${id})`)
    editBookInterface.style.display = 'flex'
}

function saveBook(id){
    if(checkEditInputs()===127){
        bookLibrary[id].name = editBookName.value
        bookLibrary[id].author = editBookAuthor.value
        bookLibrary[id].totalPage = editBookTotal.value
        bookLibrary[id].currentPage = editBookCurrent.value
        refreshLibrary()
        editBookInterface.style.display = 'none'
    }
    else{
        if(editBookAuthor.value==='') editBookAuthor.style.backgroundColor = 'rgb(177, 83, 83)'
        if(editBookName.value==='') editBookName.style.backgroundColor = 'rgb(177, 83, 83)'
        if(editBookTotal.value==='' 
        || parseInt(editBookTotal.value)<=0) editBookTotal.style.backgroundColor = 'rgb(177, 83, 83)'
        if(editBookCurrent.value==='' 
        || parseInt(editBookCurrent.value)>parseInt(editBookTotal.value) 
        || parseInt(editBookCurrent.value) <= 0) editBookCurrent.style.backgroundColor = 'rgb(177, 83, 83)'
    }
}

function removeBook(id){
    bookLibrary.splice(id, 1)
    for(let i=id; i<bookLibrary.length; i++){
        bookLibrary[i].id--
    }
    refreshLibrary()
}

function refreshLibrary(){
    content.innerHTML=''
    navList.innerHTML=''
    for(let i=0; i<=bookLibrary.length-1; i++){
        let bookTemplate = document.createElement('div');
        let listTemplate = document.createElement('div');
        bookTemplate.innerHTML = bookLibrary[i].getBookCard()
        listTemplate.innerHTML = bookLibrary[i].getListItem()
        content.appendChild(bookTemplate)
        navList.appendChild(listTemplate)
    }
    if(bookLibrary.length===0){
        emptyContainer.style.display = 'flex'
    }
    else if(bookLibrary!=0){
        emptyContainer.style.display = 'none'
    }
}

function addBookToLibrary(){
    if(checkAddInputs()===127){
        let newBook = new Book(giveBookName.value, giveBookAuthor.value, giveBookTotal.value, giveBookCurrent.value, getNextID())
        bookLibrary.push(newBook)
        refreshLibrary()
        newBookInterface.style.display = 'none'
    }
    else{
        if(giveBookAuthor.value==='') giveBookAuthor.style.backgroundColor = 'rgb(177, 83, 83)'
        if(giveBookName.value==='') giveBookName.style.backgroundColor = 'rgb(177, 83, 83)'
        if(giveBookTotal.value==='' 
        || parseInt(giveBookTotal.value)<=0) giveBookTotal.style.backgroundColor = 'rgb(177, 83, 83)'
        if(giveBookCurrent.value==='' 
        || parseInt(giveBookCurrent.value)>parseInt(giveBookTotal.value) 
        || parseInt(giveBookCurrent.value<=0)) giveBookCurrent.style.backgroundColor = 'rgb(177, 83, 83)'
    }
}

//EventListeners
addButton.addEventListener('click',()=>{
    newBookInterface.style.display = 'flex'
    giveBookName.value = ''
    giveBookAuthor.value = ''
    giveBookTotal.value = ''
    giveBookCurrent.value = ''
    newBookInputs.forEach(element => element.style.backgroundColor = 'white')
})

newBookCancel.addEventListener('click', ()=>{
    newBookInterface.style.display = 'none'

})

newBookAdd.addEventListener('click', ()=>{
    addBookToLibrary();
})

editBookCancel.addEventListener('click', ()=>{
    editBookName.value = ''
    editBookAuthor.value = ''
    editBookTotal.value = ''
    editBookCurrent.value = ''
    editBookInterface.style.display = 'none'
    editBookInputs.forEach(element => element.style.backgroundColor = 'white')
})

newBookInputs.forEach(element => element.addEventListener('input', ()=>{
    element.style.backgroundColor = 'white'
}))

editBookInputs.forEach(element => element.addEventListener('input', ()=>{
    element.style.backgroundColor = 'white'
}))

