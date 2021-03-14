let addButton = document.querySelector(".addButton");
let newBookInterface = document.querySelector('.newBookInterface');
let newBookCancel = document.querySelector('#newBookCancel');








addButton.addEventListener('click',()=>{
    newBookInterface.style.display = 'flex';
})
newBookCancel.addEventListener('click', ()=>{
    newBookInterface.style.display = 'none';
})