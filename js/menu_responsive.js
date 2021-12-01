"use strict"
document.addEventListener("DOMContentLoaded", paginaJuegos);
function paginaJuegos(){
    let menu=document.querySelector(".menu-responsive")
    menu.addEventListener("click", mostarNav)

    function mostarNav(){
        document.querySelector("nav").classList.toggle("show");
    }
}