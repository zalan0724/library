let addButton = document.querySelector('.addButton')
let content = document.querySelector('.content')
let navList = document.querySelector('.list')
let emptyContainer = document.querySelector('.emptyContainer')

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

class Book{
    constructor(name, author, totalPage, currentPage, id){
        this.name = name
        this.author = author
        this.totalPage = totalPage
        this.currentPage = currentPage
        this.id = id
    }

    get bookCard(){
        const bookTemplate =`
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

    get listItem(){
        const listTemplate = `
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
    let result = 0
    if(giveBookAuthor.value!='') result++
    if(giveBookName.value!='') result++
    if(giveBookCurrent.value!='' && giveBookCurrent.value<=giveBookTotal.value && giveBookCurrent.value>0) result++
    if(giveBookTotal.value!='' && giveBookTotal.value>0) result++
    return result
}

function checkEditInputs(){
    let result = 0
    if(editBookAuthor.value!='') result++
    if(editBookName.value!='') result++
    if(editBookCurrent.value!='' && editBookCurrent.value<=editBookTotal.value && editBookCurrent.value>0) result++
    if(editBookTotal.value!='' && editBookTotal.value>0) result++
    return result
}

function addCurrent(id){
    if(bookLibrary[id].currentPage<bookLibrary[id].totalPage){
        bookLibrary[id].currentPage++
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
    if(checkEditInputs()==4){
        bookLibrary[id].name = editBookName.value
        bookLibrary[id].author = editBookAuthor.value
        bookLibrary[id].totalPage = editBookTotal.value
        bookLibrary[id].currentPage = editBookCurrent.value
        refreshLibrary()
        editBookInterface.style.display = 'none'
    }
    else{
        if(editBookAuthor.value=='') editBookAuthor.style.backgroundColor = 'rgb(177, 83, 83)'
        if(editBookName.value=='') editBookName.style.backgroundColor = 'rgb(177, 83, 83)'
        if(editBookTotal.value=='' || editBookTotal.value<=0) editBookTotal.style.backgroundColor = 'rgb(177, 83, 83)'
        if(editBookCurrent.value=='' || editBookCurrent.value>editBookTotal.value || editBookCurrent.value <= 0) editBookCurrent.style.backgroundColor = 'rgb(177, 83, 83)'
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
        bookTemplate.innerHTML = bookLibrary[i].bookCard
        listTemplate.innerHTML = bookLibrary[i].listItem
        content.appendChild(bookTemplate)
        navList.appendChild(listTemplate)
    }
    if(bookLibrary.length==0){
        emptyContainer.style.display = 'flex'
    }
    else if(bookLibrary!=0){
        emptyContainer.style.display = 'none'
    }
}

function addBookToLibrary(){
    if(checkAddInputs()==4){
        let newBook = new Book(giveBookName.value, giveBookAuthor.value, giveBookTotal.value, giveBookCurrent.value, getNextID())
        bookLibrary.push(newBook)
        refreshLibrary()
        newBookInterface.style.display = 'none'
    }
    else{
        if(giveBookAuthor.value=='') giveBookAuthor.style.backgroundColor = 'rgb(177, 83, 83)'
        if(giveBookName.value=='') giveBookName.style.backgroundColor = 'rgb(177, 83, 83)'
        if(giveBookTotal.value=='' || giveBookTotal.value<=0) giveBookTotal.style.backgroundColor = 'rgb(177, 83, 83)'
        if(giveBookCurrent.value=='' || giveBookCurrent.value>giveBookTotal.value || giveBookCurrent.value<=0) giveBookCurrent.style.backgroundColor = 'rgb(177, 83, 83)'
    }
}

//EventListeners
addButton.addEventListener('click',()=>{
    newBookInterface.style.display = 'flex'
    giveBookName.value = ''
    giveBookAuthor.value = ''
    giveBookTotal.value = ''
    giveBookCurrent.value = ''
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
})

newBookInputs.forEach(element => element.addEventListener('input', ()=>{
    element.style.backgroundColor = 'white'
}))

editBookInputs.forEach(element => element.addEventListener('input', ()=>{
    element.style.backgroundColor = 'white'
}))

