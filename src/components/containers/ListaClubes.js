import React, { Component } from 'react'
import Spinner from '../Spinner'
import FiltrarClubes from '../containers/FiltrarClubes'
import ListaFiltrada from '../presentation/ListaFiltrada'

export default class ListaClubes extends Component {
    constructor() {
        super()
        this.state = {
            clubes: [],
            filtro: ''
        }
    }    

    actualizarClub(value) {
        this.setState({ filtro: value })
    }

    render() {
        console.log('lista de clubes en render: ', this.props.listado)
        if (!this.props.listado) { return <Spinner /> } else {
            return (
                <div>
                    <FiltrarClubes 
                        actualizarFiltro={this.actualizarClub.bind(this)}
                        filtrarClub={this.state.filtro}
                    />
                    <ListaFiltrada 
                        filtrarClub={this.state.filtro}
                        listado={this.props.listado}
                    />
                </div>
            )            
        }
    }
}