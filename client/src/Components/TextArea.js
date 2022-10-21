import React from "react";

function TextArea(props){
    const handlerChangeEditor = (evt) => {
        props.handlerChange(evt.target.value)
    }

    return(
        <div style={
            {
                marginLeft: '5%',
                marginRight: "5%"                
            }
        }>
            <div class="form-floating">
                <textarea rows="80" cols="180" class="form-control" placeholder="Ingresar contenido aqui" id="floatingTextarea2" style={{backgroundSize: 'contain' , overflow: 'auto', height: '60vh'}} onChange={handlerChangeEditor} value={props.value}></textarea>
                <label for="floatingTextarea2" >{props.text} </label>
                {props.comp}
                {props.comp2}
            </div>
        </div>
    )

}

export default TextArea;

