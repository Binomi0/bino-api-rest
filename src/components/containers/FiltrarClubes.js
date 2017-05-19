import React, { Component } from 'react'
import '../../stylesheets/index.scss'

export default class FiltrarClubes extends Component {

    actualizarFiltro() {
        const val = this.myvalue.value
        this.props.actualizarFiltro(this.myvalue.value)
    }

    render() {
        return (
            <div>
                <h1>Filtro Inteligente</h1>
                <p>{this.props.filtrarClub}</p>
                <form action="">
                    <input 
                        className="filtro-clases"
                        type="text"
                        ref={ (value) => this.myvalue = value }
                        placeholder="Filtro Inteligente"
                        onChange={this.actualizarFiltro.bind(this)}
                    />
                </form>                
            </div>
        )
    }
}