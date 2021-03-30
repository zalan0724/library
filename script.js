const addButton = document.querySelector('.addButton')
const content = document.querySelector('.content')
const navList = document.querySelector('.list')
const emptyContainer = document.querySelector('.emptyContainer')
const inputs = document.querySelectorAll('input')
const loadingScreen = document.querySelector('#loadingScreen')

//Adding new book elements
const newBookInterface = document.querySelector('.newBookInterface')
const newBookAdd = document.querySelector('#newBookAdd')
const newBookCancel = document.querySelector('#newBookCancel')
const newBookInputs = document.querySelectorAll('.newBookTab input')
const giveBookName = document.querySelector('#giveBookName')
const giveBookAuthor = document.querySelector('#giveBookAuthor')
const giveBookTotal = document.querySelector('#giveBookTotal')
const giveBookCurrent = document.querySelector('#giveBookCurrent')

//Editing book elements
const editBookInterface = document.querySelector('.editBookInterface')
const editBookSave = document.querySelector('#editBookSave')
const editBookCancel = document.querySelector('#editBookCancel')
const editBookRemove = document.querySelector('#editBookRemove')
const editBookInputs = document.querySelectorAll('.editBookTab input')
const editBookName = document.querySelector('#editBookName')
const editBookAuthor = document.querySelector('#editBookAuthor')
const editBookTotal = document.querySelector('#editBookTotal')
const editBookCurrent = document.querySelector('#editBookCurrent')

let bookLibrary = []

const getBookCard = function(name, author, currentPage, totalPage, id){
    const bookTemplate = `
    <div class="book">
        <div class="bookTop">
            <p class="bookTitle">${name}</p>
            <p class="bookAuthor">by ${author}</p>
        </div>
        <div class="bookBottom">
            <p class="bookPages" id="currentPages">Current: ${currentPage}</p>
            <p class="bookPages" id="totalPages">Total pages: ${totalPage}</p>
            <div class="bookBottomButtons">
                <button class="bookButton" id="editButton" onclick="editBook(${id})">Edit</button>
                <button class="bookButton" id="minusButton" onclick="reduceCurrent(${id})">-</button>
                <button class="bookButton" id="plusButton" onclick="addCurrent(${id})">+</button>
            </div>
        </div>
    </div>`

    return bookTemplate
}

const getListItem = function (name, id){
    const listTemplate =`
    <div class="listItem">
        <div class="listName">${name}</div>
        <button class="listButton" id="listEditButton" onclick="editBook(${id})">Edit</button>
        <button class="listButton" id="listRemoveButton" onclick="removeBook(${id})">Remove</button>
    </div>`

    return listTemplate
}

const Book = function(name, author, totalPage, currentPage, id) {
    this.name = name
    this.author = author
    this.totalPage = totalPage
    this.currentPage = currentPage
    this.id = id
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
        console.log('Increased by one')
        refreshLibrary()
    }

}

function reduceCurrent(id){
    if(bookLibrary[id].currentPage>1){
        bookLibrary[id].currentPage--
        console.log('Decreased by one')
        refreshLibrary()
    }

}

function editBook(id){
    editBookName.value = bookLibrary[id].name
    editBookAuthor.value = bookLibrary[id].author
    editBookTotal.value = bookLibrary[id].totalPage
    editBookCurrent.value = bookLibrary[id].currentPage
    editBookSave.setAttribute('onclick',`saveBook(${id})`)
    editBookRemove.setAttribute('onclick',`removeBook(${id})`)
    editBookInterface.style.display = 'flex'
}

function saveBook(id){
    if(checkEditInputs()===127){
        bookLibrary[id].name = editBookName.value
        bookLibrary[id].author = editBookAuthor.value
        bookLibrary[id].totalPage = editBookTotal.value
        bookLibrary[id].currentPage = editBookCurrent.value
        console.log(`Book saved (id: ${id})`)
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
    editBookInterface.style.display = 'none'
}

function refreshLibrary(){
    content.innerHTML=''
    navList.innerHTML=''
    for(let i=0; i<=bookLibrary.length-1; i++){
        let bookTemplate = document.createElement('div')
        let listTemplate = document.createElement('div')
        bookTemplate.innerHTML = getBookCard(
            bookLibrary[i].name, bookLibrary[i].author, bookLibrary[i].currentPage, bookLibrary[i].totalPage, bookLibrary[i].id)
        listTemplate.innerHTML = getListItem(
            bookLibrary[i].name, bookLibrary[i].id)
        content.appendChild(bookTemplate)
        navList.appendChild(listTemplate)
    }
    if(bookLibrary.length===0){
        emptyContainer.style.display = 'flex'
    }
    else if(bookLibrary!=0){
        emptyContainer.style.display = 'none'
    }
    saveData()
}

function addBookToLibrary(){
    if(checkAddInputs()===127){
        let newBook = new Book(giveBookName.value, giveBookAuthor.value, giveBookTotal.value, giveBookCurrent.value, getNextID())
        bookLibrary.push(newBook)
        console.log('New book added')
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

function saveData(){
    localStorage['bookLibrary'] = JSON.stringify(bookLibrary)
}

function restoreData(){
    bookLibrary = JSON.parse(localStorage.getItem('bookLibrary'))
}

(function prepareLocalLibrary(){
    if(localStorage.getItem('bookLibrary')==null){
        localStorage.setItem('bookLibrary', JSON.stringify(bookLibrary))
    }
    else{
        restoreData()
        refreshLibrary()
    }
})()

function removeLoadingScreen(){
    loadingScreen.style.display = 'none'
    console.log('Loading screen removed')
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

removeLoadingScreen()

