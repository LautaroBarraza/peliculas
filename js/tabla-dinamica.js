"use strict"
document.addEventListener("DOMContentLoaded", paginaJuegos);
function paginaJuegos(){
    const url = 'https://60d4de14c6549200173a5119.mockapi.io/api/usuario';
    
    /*obtengo el json y cargo inicialmente la pagina*/
    async function obtenerDatos() {
        try {
            let res = await fetch(url);
            let json = await res.json();
            console.log(json);
            cargarTabla(json)
        } catch (error) {
            console.log(error);
        }
    }
    obtenerDatos();
    /*funcion para traer el json y cargarlo en una tabla a su vez que crear los botones para editar e eliminar las filas*/

    async function cargarTabla(json){

        let tabla = document.querySelector("#tbody")
        tabla.innerHTML = "";
            for (const elem of json) {
                let tr = document.createElement("tr");
                let td1 = document.createElement("td");
                let td2 = document.createElement("td");
                let tdBotones = document.createElement("td");
                
                /*creo btn borrar*/
                let btnBorrar= document.createElement("button");                                            
                btnBorrar.classList.add("btnBorrar");
                btnBorrar.innerHTML = "x";
                btnBorrar.addEventListener("click", (event)=> {
                    event.preventDefault;
                    borrarFila(elem.id, json);
                })
                /*creo btn editar */
                let btnEditar= document.createElement("button");
                btnEditar.classList.add("boton-contactanos");
                btnEditar.innerHTML = "Editar";

                btnEditar.addEventListener("click", (e)=> {
                    e.preventDefault();
                    editar(elem.id, json, elem.nombre, elem.apellido);
                })
                td1.innerHTML += elem.nombre.charAt(0).toUpperCase() + elem.nombre.slice(1);
                td2.innerHTML += elem.apellido.charAt(0).toUpperCase() + elem.apellido.slice(1);
                tdBotones.appendChild(btnBorrar);
                tdBotones.appendChild(btnEditar);
                
    
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(tdBotones);
    
                tabla.appendChild(tr);
                
                
            }
    
    }



        /*cre btn para mostrar toda la lista*/
        let btnMostrarTodos = document.querySelector("#mostrar-todos")
        btnMostrarTodos.addEventListener("click", obtenerDatos)
    
        /*creo funcion para poder agregar datos nuevos la api desde un input*/
        let btnAgregar = document.querySelector("#agregar")
        btnAgregar.addEventListener("click", agregarDatos)
        
        async function agregarDatos(){
            let nombre= document.querySelector("#nombre").value;
            let apellido= document.querySelector("#apellido").value;
    
            let profile={
                "nombre": nombre.charAt(0).toUpperCase() + nombre.slice(1),
                "apellido": apellido.charAt(0).toUpperCase() + apellido.slice(1)
            }
            try{
                let res = await fetch(url, {
                    "method": "POST",
                    "headers": { "Content-type": "application/json"},
                    "body": JSON.stringify(profile)
                })
                if (res.ok){
                    obtenerDatos()
                }
                
            }catch (error){
                console.log(error);
            }
            
        } 
        
        


    /* funcion para poder borrar una fila y datos*/
    async function borrarFila(id, ){
        console.log(id)
        try{
            let res = await fetch (url+"/"+id, {
                "method" : "delete"
            })
            console.log(res)
        }   catch (error) {
            console.log(error);
        }
        obtenerDatos();
        
    }
   
   
    /*funcion para crear inputs para editar datos */
    async function editar(id, json, nombre, apellido){
        let lugar= document.querySelector("#formularioEdicion")
        lugar.innerHTML="";
        let inputNombre= document.createElement("input");
        let inputApellido = document.createElement("input");
        inputNombre.classList.add("inputNombre");
        inputApellido.classList.add("inputApellido");
        lugar.appendChild(inputNombre);
        lugar.appendChild(inputApellido);
        inputNombre.value=nombre;
        inputApellido.value=apellido;


        let btn=document.createElement("button");
        btn.classList.add("boton-contactanos");
        btn.innerHTML = "Editar";

        btn.addEventListener("click", (event)=> {
            event.preventDefault();
            modificarDatos(id, inputNombre, inputApellido, json)
        })
        lugar.appendChild(btn);
        
    }

    /* modifico los datos de la api con los nuevos que ingreso el usuario*/
    async function modificarDatos(id, inputNombre, inputApellido, json){


        let profile={
            "nombre": inputNombre.value,
            "apellido": inputApellido.value
        }
        try{
            let res = await fetch(url+"/"+id, {
                "method": "PUT",
                "headers": { "Content-type": "application/json"},
                "body": JSON.stringify(profile)
            })
            if (res.ok){
                obtenerDatos();
            }
            
        }catch (error){
            console.log(error);
        }
        inputNombre.value="";
        inputApellido.value=""
    } 
    
    
    
    let btnBuscar= document.querySelector("#buscar")
    btnBuscar.addEventListener("click", buscarDatos)
    
    
    /*filtra por nombre y/o apellido los usuario y los muestra en la tabla*/
    
    async function buscarDatos(){
        let nombre= document.querySelector("#filtro-nombre").value;
        let apellido= document.querySelector("#filtro-apellido").value;
            let name = nombre.charAt(0).toUpperCase() + nombre.slice(1)
            let lastName = apellido.charAt(0).toUpperCase() + apellido.slice(1)

            console.log(name)
            try{
                let res = await fetch(url);
                let json = await res.json();
                
                if (res.ok){
                    if (nombre!=""){
                        let datos= []
                        console.log(json)
                        for (let elem of json){
                            if(elem.nombre==name){
                                console.log(elem.nombre)
                                datos.push(elem)
                                console.log(datos)
                            }
                        }
                        cargarTabla(datos)
                        console.log(datos)
                    }
                    else if (apellido!=""){
                        let datos= []
                        console.log(json)
                        for (let elem of json){
                            if(elem.apellido==lastName){
                                console.log(elem.apellido)
                                datos.push(elem)
                            }
                        }
                        cargarTabla(datos)
                        console.log(datos)
                    }
                    else if ((apellido!="") && (nombre!="")){
                        let datos= []
                        console.log(json)
                        for (let elem of json){
                            if(elem.apellido==lastName && elem.nombre==name){
                                console.log(elem.apellido)
                                datos.push(elem)
                            }
                        }
                        cargarTabla(datos)
                        console.log(datos)
                    }
                    else{
                        obtenerDatos()
                    }
                }
            }catch (error){
                console.log(error);
            }
        
    } 

}







