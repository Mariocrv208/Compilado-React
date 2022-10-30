import React, { useState } from "react";
import { saveAs } from 'file-saver';

function NavBar(props){
    //Cosas para creacion de archivos y lectura de archivos
    const createFile = () =>{
        const blob = new Blob([props.value], {type: 'text/plain;charset=utf-8'})
        saveAs( blob, '../ArchivosSalida/Salida.olc')
    }

    

    return(
        <>
            <div class="collapse" id="navbarToggleExternalContent" style={{textAlign:'center'}}>
            <div class="bg-dark p-4" style={{height: '80px'}}>
                <h5 class="text-white h4">Encontraste lo que necesitabas? :D</h5>
                <span class="text-muted">OPCIONES</span>
            </div>
            <nav class="navbar bg-dark" >
                <form class="container-fluid justifyContent">
                    <button class="btn btn-outline-success me-2" type="button" style={{backgroundColor: '#E36246', borderColor: 'black', color: 'black'}} onClick={createFile}>Crear archivos</button>
                    {props.comp}
                    <button class="btn btn-outline-success me-2" type="button" style={{backgroundColor: '#99E346', borderColor: 'black', color: 'black'}}>Guardar el archivo</button>
                    <button class="btn btn-outline-success me-2" type="button" style={{backgroundColor: '#466AE3', borderColor: 'black', color: 'black'}}>Tabla de Símbolos General</button>
                </form>
            </nav>
            </div>
            <nav class="navbar navbar-dark bg-dark">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
            </div>
            </nav>
        </>
    )

}

export default NavBar;

