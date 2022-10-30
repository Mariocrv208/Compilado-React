import React, { useState } from "react";
import NavBar from "../Components/Navbar";
import TextArea from "../Components/TextArea"
import Footer from "../Components/footer";
import Service from "../Services/Service";
import { RViewerTrigger, RViewer} from 'react-viewerjs';

function Index(){
    const [ value, setValue ] = useState("")
    const [ response, setResponse ] = useState("")

    const changeText = (valueA) => {
        setValue(valueA)
    }

    const handlerPostParse = () => {
        Service.parse(value).then(({consola}) => {
            setResponse(consola)
        })
    }

    const buttonEjecutar = <button class="btn btn-outline-success me-2" type="button" style={{backgroundColor: '#46E1E3', borderColor: 'black', color: 'black'}} onClick={handlerPostParse}>Ejecutar</button>
    const buttonLimpiar = <button class="btn btn-outline-success me-2" type="button" style={{backgroundColor: '#466AE3', borderColor: 'black', color: 'black'}} onClick={eraseText}>Limpiar</button>

    function eraseText() {
        setResponse("")
    }

    let imagenes= [
        require("../Imagenes/ast.jpg")
    ]

    let imagenesErr= [
        require("../Imagenes/err.jpg")
    ]

    return(
        
        <>    
        <NavBar></NavBar>
        <body style={{backgroundColor: '#6373C5', height: '100%', width: '100vw'}}>    
            <div style={{backgroundColor: '#6373C5'}}>
                <h1 style={{textAlign: 'center', marginBottom: '35px'}}>BIENVENIDO A NUESTRA PAGINA :D</h1>
                <div
                class="container-fluid" style={{display: 'flex', wrap: 'wrap', direction: 'row', backgroundColor: '#6373C5'}}>
                    <TextArea id='input' text="INPUT" handlerChange={changeText} comp = {buttonEjecutar} comp2 = {buttonLimpiar}></TextArea>
                    <TextArea text ="CONSOLE" value={response}></TextArea>
                </div>
                <div style={{backgroundColor: '#6373C5'}}>
                    <h2 style={{textAlign: 'center', marginBottom: '35px'}}>REPORTE AST</h2>
                    <RViewer imageUrls={imagenes}>
                        <div style={{display: 'flex', marginTop:"35px"}}>
                            {imagenes.map((imagen, index)=>{
                                        console.log(index)
                                return(
                                    <RViewerTrigger index={index}>
                                        <img src={imagen} style={{width: '90%', height: '100%', marginLeft:'5%', border:'1px solid black'}}></img>
                                    </RViewerTrigger>
                                )
                            })}
                        </div>
                    </RViewer>
                </div>
                <div style={{backgroundColor: '#6373C5'}}>
                    <h2 style={{textAlign: 'center', marginBottom: '35px', marginTop:"35px"}}>REPORTE ERRORES</h2>
                    <RViewer imageUrls={imagenes}>
                        <div style={{display: 'flex', marginTop:"35px"}}>
                            {imagenes.map((imagen, index)=>{
                                        console.log(index)
                                return(
                                    <RViewerTrigger index={index}>
                                        <img src={imagen} style={{width: '90%', height: '100%', marginLeft:'5%', border:'1px solid black'}}></img>
                                    </RViewerTrigger>
                                )
                            })}
                        </div>
                    </RViewer>
                </div>
            </div>
            <Footer></Footer>
        </body>
        </> 
    )

}

export default Index;

