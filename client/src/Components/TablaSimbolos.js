import React from "react";

function SymbolTable(props){

    let val = []

    return(
        props.valores ? <div style={
            {
                height: '100%',
                width: '100%',
                backgroundColor: '#6373C5',
                marginTop: '35px'
            }
        }>
            <table class="table">
            <thead class="table-dark">
                <tr>
                    <th scope="col">NOMBRE</th>
                    <th scope="col">TIPO_SIMBOLO</th>
                    <th scope="col">TIPO_VAR</th>
                    <th scope="col">ENTORNO</th>
                    <th scope="col">LINEA</th>
                    <th scope="col">COLUMNA</th>
                </tr>
            </thead>
            <tbody>
            {props.valores.map((value, index) => {
                    return(
                    <tr key={index}>
                        <th scope="col">{value.identificador}</th>
                        <th scope="col">{value.tipoSimbolo}</th>
                        <th scope="col">{value.tipoVar}</th>
                        <th scope="col">{value.entorno}</th>
                        <th scope="col">{value.linea}</th>
                        <th scope="col">{value.columna}</th>
                    </tr>
                    )
                })}
            </tbody>
            </table>
        </div>
        :
        <div style={
            {
                height: '100%',
                width: '100%',
                backgroundColor: '#6373C5',
                marginTop: '35px'
            }
        }>
            <table class="table">
            <thead class="table-dark">
                <tr>
                    <th scope="col">NOMBRE</th>
                    <th scope="col">TIPO_SIMBOLO</th>
                    <th scope="col">TIPO_VAR</th>
                    <th scope="col">ENTORNO</th>
                    <th scope="col">LINEA</th>
                    <th scope="col">COLUMNA</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="col">sin data</th>
                    <th scope="col">sin data</th>
                    <th scope="col">sin data</th>
                    <th scope="col">sin data</th>
                    <th scope="col">sin data</th>
                    <th scope="col">sin data</th>
                </tr>
            </tbody>
            </table>
        </div>
    )

}

export default SymbolTable;

