-"use strict"
document.addEventListener("DOMContentLoaded", paginaJuegos);
function paginaJuegos(){

/*creo numero aleatorio y lo muestro en el html*/

function createCaptcha() {
    document.querySelector("#escribir-captcha").value= "";
    document.querySelector("#resultado-captcha").innerHTML= "";
    let captcha =  Math.floor(Math.random() * ((500000+1) - 100000) + 100000); ;
    document.querySelector("#texto-captcha").innerHTML = captcha;
}

/*valido que el numero antes creado sea igual al valor que pone el usuario en el input, en caso de que sea igual le avisa al usuario*/
function validarCaptcha() {
    let valorUsuario = document.querySelector("#escribir-captcha").value;
    let captcha = document.querySelector("#texto-captcha").innerHTML;
    if (valorUsuario == captcha) {
        document.querySelector("#resultado-captcha").innerHTML = "valor correcto"
    }
    else {
        createCaptcha()
        document.querySelector("#resultado-captcha").innerHTML = "valor incorrecto"
    }
}

/*creo el numero*/
createCaptcha()

/*le doy al input boton el evento de hacer click y ejecutar la funcion de validar captcha*/

let btn = document.querySelector("#boton-captcha")
btn.addEventListener("click", validarCaptcha)

/*le doy al input boton el evento de hacer click y ejecutar la funcion de crear_captcha*/
let btnVolverAGenerar = document.querySelector("#volver-a-generar")
btnVolverAGenerar.addEventListener("click", createCaptcha)

}