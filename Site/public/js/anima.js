// funcao para acionar o botao de menu
let menu = document.querySelector('#menu');
let mostrar = document.querySelector('header nav');
menu.addEventListener('click', function (event) {
    mostrar.classList.toggle('show')
})

// carroussel
var slideIndex,slides,dots,captionText;
function initGallery(){
    slideIndex = 0;
    slides=document.getElementsByClassName("imageHolder");
    slides[slideIndex].style.opacity=1;
    captionText=document.querySelector(".captionTextHolder .captionText");
    captionText.innerText=slides[slideIndex].querySelector(".captionText").innerText;
    captionText.href = slides[slideIndex].querySelector(".captionText").href;

    // desativa o botão se a contagem de slides for um
    if(slides.length<2){
        var nextPrevBtns=document.querySelector(".leftArrow,.rightArrow");
        nextPrevBtns.style.display="none";
        for (i = 0; i < nextPrevBtn.length; i++) {
            nextPrevBtn[i].style.display="none";
        }
    }

    dots=[];
    var dotsContainer=document.getElementById("dotsContainer"),i;
    for (i = 0; i < slides.length; i++) {
        var dot=document.createElement("span");
        dot.classList.add("dots");
        dotsContainer.append(dot);
        dot.setAttribute("onclick","moveSlide("+i+")");
        dots.push(dot);
    }
    dots[slideIndex].classList.add("active");
}
initGallery();
function plusSlides(n) {
    moveSlide(slideIndex+n);
}
function moveSlide(n){
    var i;
    var current,next;
    var moveSlideAnimClass={
          forCurrent:"",
          forNext:""
    };
    var slideTextAnimClass;
    if(n>slideIndex) {
        if(n >= slides.length){n=0;}
        moveSlideAnimClass.forCurrent="moveLeftCurrentSlide";
        moveSlideAnimClass.forNext="moveLeftNextSlide";
        slideTextAnimClass="slideTextFromTop";
    }else if(n<slideIndex){
        if(n<0){n=slides.length-1;}
        moveSlideAnimClass.forCurrent="moveRightCurrentSlide";
        moveSlideAnimClass.forNext="moveRightPrevSlide";
        slideTextAnimClass="slideTextFromBottom";
    }

    if(n!=slideIndex){
        next = slides[n];
        current=slides[slideIndex];
        for (i = 0; i < slides.length; i++) {
            slides[i].className = "imageHolder";
            slides[i].style.opacity=0;
            dots[i].classList.remove("active");
        }
        current.classList.add(moveSlideAnimClass.forCurrent);
        next.classList.add(moveSlideAnimClass.forNext);
        dots[n].classList.add("active");
        slideIndex=n;
        captionText.style.display="none";
        captionText.className="captionText "+slideTextAnimClass;
        captionText.innerText=slides[n].querySelector(".captionText").innerText;
        captionText.style.display="block";
        captionText.href=slides[n].querySelector(".captionText").href;
    }
}
var timer=null;
function setTimer(){
    timer=setInterval(function () {
        plusSlides(1) ;
    },8000);
}
setTimer();

// ativar e desativar mapa
const sarandib = document.querySelector('#sarandib')
const sarandimapa = document.querySelector('#sarandi')

const maringab = document.querySelector('#maringab')
const maringamapa = document.querySelector('#maringa')

sarandib.addEventListener("click", (event)=> {
   sarandimapa.style.display = "block"
   maringamapa.style.display = "none"  
   sarandib.style.background = "#FFB612"  
   maringab.style.background = "#707070"
})

maringab.addEventListener("click", (event)=> {
    maringamapa.style.display = "block"
    sarandimapa.style.display = "none"
    maringab.style.background = "#FFB612"    
    sarandib.style.background = "#707070"
 })

 // popup
 var modal = document.querySelector(".modalb");
 var closeButton = document.querySelector(".close-button");
 function toggleModal() {
     modal.classList.toggle("show-modal");
 }
 function setDisabled() {
    modal.classList.toggle("show-modal");
}
 function windowOnClick(event) {
     if (event.target === modal) {
         toggleModal();
     }
 }

 closeButton.addEventListener("click", toggleModal);
 window.addEventListener("click", windowOnClick);

 // função add var para selecionar plano desejado
var buttonb = document.querySelector(".basico");
var buttonm = document.querySelector(".medio");
var buttona = document.querySelector(".avancado");

function planb(){
    window.location.href = "cadastro.html?plano=b"
}

function planm(){
    window.location.href = "cadastro.html?plano=m"
}

function plana(){
    window.location.href = "cadastro.html?plano=a"
}

buttonb.addEventListener("click",planb);
buttonm.addEventListener("click",planm);
buttona.addEventListener("click",plana);

