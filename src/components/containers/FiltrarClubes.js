import React, { Component } from 'react'

export default class FiltrarClubes extends Component {

    actualizarFiltro() {
        const val = this.myvalue.value
        this.props.actualizarFiltro(this.myvalue.value)
    }

    render() {
        return (
            <div>
                <h1>FiltrarClubes</h1>
                <p>{this.props.filtrarClub}</p>
                <form action="">
                    <input 
                        type="text"
                        ref={ (value) => this.myvalue = value }
                        placeholder="Filtrar Clubes"
                        onChange={this.actualizarFiltro.bind(this)}
                    />
                </form>                
            </div>
        )
    }
}