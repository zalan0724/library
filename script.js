let addButton = document.querySelector('.addButton')
let content = document.querySelector('.content')
let navList = document.querySelector('.list')


//Adding new book elements
let newBookInterface = document.querySelector('.newBookInterface')
let newBookAdd = document.querySelector('#newBookAdd')
let newBookCancel = document.querySelector('#newBookCancel')
let newBookInputs = document.querySelectorAll('.newBookTab input')
let giveBookName = document.querySelector('#giveBookName')
let giveBookAuthor = document.querySelector('#giveBookAuthor')
let giveBookTotal = document.querySelector('#giveBookTotal')
let giveBookCurrent = document.querySelector('#giveBookCurrent')

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
        <div class="book" id="${this.id}">
            <div class="bookTop">
                <p class="bookTitle">${this.name}</p>
                <p class="bookAuthor">by ${this.author}</p>
            </div>
            <div class="bookBottom">
                <p class="bookPages" id="currentPages">Current: ${this.currentPage}</p>
                <p class="bookPages" id="totalPages">Total pages: ${this.totalPage}</p>
                <div class="bookBottomButtons">
                    <button class="bookButton" id="editButton">Edit</button>
                    <button class="bookButton" id="minusButton">-</button>
                    <button class="bookButton" id="plusButton" onclick="modifyCurrent(${this.id})">+</button>
                </div>
            </div>
        </div>`
        return bookTemplate
    }

    get listItem(){
        const listTemplate = `<div class="listItem">${this.name}</div>`
        return listTemplate
    }
}

function getID(){
    let id = bookLibrary.length
    return id
}

function modifyCurrent(id){
    console.log(bookLibrary[id].currentPage)
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
}

function addBookToLibrary(){
    let newBook = new Book(giveBookName.value, giveBookAuthor.value, giveBookTotal.value, giveBookCurrent.value, getID())
    bookLibrary.push(newBook)
    refreshLibrary()
}

function addCurrentPage(){

}


//EventListeners
addButton.addEventListener('click',()=>{
    newBookInterface.style.display = 'flex'
    document.querySelector('#giveBookName').value = ''
    document.querySelector('#giveBookAuthor').value = ''
    document.querySelector('#giveBookTotal').value = ''
    document.querySelector('#giveBookCurrent').value = ''
})

newBookCancel.addEventListener('click', ()=>{
    newBookInterface.style.display = 'none'

})

newBookAdd.addEventListener('click', ()=>{
    addBookToLibrary();
    newBookInterface.style.display = 'none'
})



console.log(bookLibrary.length)