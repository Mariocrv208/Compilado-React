import React, { useState } from "react";
import NavBar from "../Components/Navbar";
import TextArea from "../Components/TextArea"
import Footer from "../Components/footer";
import Service from "../Services/Service";

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

    return(
        
        <>    
        <NavBar></NavBar>
        <body style={{backgroundColor: '#6373C5', height: '85vh', width: '100vw'}}>    
            <div >
                <h1 style={{textAlign: 'center', marginBottom: '35px'}}>BIENVENIDO A NUESTRA PAGINA :D</h1>
                <div
                class="container-fluid" style={{display: 'flex', wrap: 'wrap', direction: 'row'}}>
                    <TextArea id='input' text="INPUT" handlerChange={changeText} comp = {buttonEjecutar} comp2 = {buttonLimpiar}></TextArea>
                    <TextArea text ="CONSOLE" value={response}></TextArea>
                </div>
                
            </div>
        </body>
        <footer>
            <Footer></Footer>
        </footer>
        </> 
    )

}

export default Index;

