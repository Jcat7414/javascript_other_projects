let buttonIncrease = document.querySelector('#increase');
let buttonDecrease = document.querySelector('#decrease');
let input = document.querySelector('input');

buttonIncrease.addEventListener('click', () =>{
    input.value = parseInt(input.value) + 1;
});

buttonDecrease.addEventListener('click', () =>{
    input.value = parseInt(input.value) - 1;
})
