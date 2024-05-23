const carouselItems = document.querySelectorAll('.item');
const carouselItemsArray = [...carouselItems];
const divIndicators = document.getElementById('indicators');
console.log(divIndicators);

const iterator1 = carouselItemsArray.entries();
console.log(iterator1);
let arraySlides = [];
let arrayCircles = [];

carouselItemsArray.forEach((element) => {
    index = iterator1.next().value;
    console.log(index[0]);
    num = Number(index[0]);
    console.log(num);
    element.setAttribute('data', num + 1);
    element.setAttribute('id', `item${num + 1}`);
    arraySlides.push(index[1]);
    console.log(arraySlides);

    const circle = document.createElement('button');
    circle.classList.add('circle');
    circle.setAttribute('data', num + 1);
    circle.setAttribute('id', `circle${num + 1}`);
    arrayCircles.push(circle);
    console.log(arrayCircles);
    divIndicators.appendChild(circle);
});

const previous = document.getElementById('previous');
const next = document.getElementById('next');
let slideActive = '';
let previousSlide = '';
let nextSlide = '';
let selectedSlide ='';

previous.addEventListener('click', () => {
    clearCircle();
    getPreviousSlide();
    switchActive(slideActive, previousSlide);
    fillActiveCircle();
});

next.addEventListener('click', () => {
    clearCircle();
    getNextSlide();
    switchActive(slideActive,nextSlide);
    fillActiveCircle();
});

arrayCircles.forEach((button) => {
    button.addEventListener('click', () => {
        clearCircle();
        setSlide(button);
        switchActive(slideActive,selectedSlide);
        fillActiveCircle();
    });
});

function getPreviousSlide(){ 
    slideActive = document.querySelector('.active');
    console.log(slideActive);
    let indexActive = slideActive.getAttribute('data') - 1;
    let indexPrevious = indexActive - 1;
     if (indexPrevious < 0){
        indexPrevious = arraySlides.length - 1 ;
     }
     console.log(indexPrevious);
     previousSlide = arraySlides[indexPrevious];
     console.log(previousSlide);
    return {slideActive,previousSlide};
}

function getNextSlide(){ 
    slideActive = document.querySelector('.active');
    console.log(slideActive);
    let indexActive = slideActive.getAttribute('data') - 1;
    let indexNext = indexActive + 1;
     if (indexNext >= arraySlides.length){
        indexNext = 0;
     }
     console.log(indexNext);
     nextSlide = arraySlides[indexNext];
     console.log(nextSlide);
    return {slideActive,nextSlide};
}

function switchActive(slideActive , arg){
    slideActive.classList.remove('active');
    arg.classList.add('active');
}

function fillActiveCircle(){
    slideActive = document.querySelector('.active');
    console.log(slideActive);
    const getIndex = slideActive.getAttribute('data');
    const activeCircle = document.getElementById(`circle${getIndex}`);
    console.log(activeCircle);
    activeCircle.classList.remove('circle');
    activeCircle.classList.add('circle-active');
}

function clearCircle(){
    slideActive = document.querySelector('.active');
    console.log(slideActive);
    const getIndex = slideActive.getAttribute('data');
    const activeCircle = document.getElementById(`circle${getIndex}`);
    console.log(activeCircle);
    activeCircle.classList.remove('circle-active');
    activeCircle.classList.add('circle');
}

function setSlide(button){
    data = button.getAttribute('data');
    selectedSlide = arraySlides[(data - 1)];
    console.log(selectedSlide);
}

setInterval( () => {
        clearCircle();
        getNextSlide();
        switchActive(slideActive,nextSlide);
        fillActiveCircle();
    }, 5000 )

window.addEventListener("load", fillActiveCircle()) ;
