import React, { Component } from 'react'
import Spinner from '../Spinner'
import FiltrarClubes from '../containers/FiltrarClubes'
import ListaFiltrada from '../presentation/ListaFiltrada'

export default class ListaClubes extends Component {
    constructor() {
        super()
        this.state = {
            clubes: [],
            atletas: [],
            filtro: '',
            selected: null
        }
    }    

    actualizarClub(value) {
        this.setState({ filtro: value })
    }
    seleccionarClub(index){
        this.setState({ selected: index })
    }


    render() {
        console.log('lista de clubes en render: ', this.props.clubes)
        console.log('lista de atletas en render: ', this.props.atletas)
        if (!this.props.clubes) { return <Spinner /> } else {
            return (
                <div>
                    <FiltrarClubes 
                        actualizarFiltro={this.actualizarClub.bind(this)}
                        filtrarClub={this.state.filtro}
                    />
                    <ListaFiltrada 
                        index={this.state.selected}
                        seleccionarClub={this.seleccionarClub.bind(this)}
                        filtrarClub={this.state.filtro}
                        clubes={this.props.clubes}
                        atletas={this.props.atletas}
                    />
                </div>
            )            
        }
    }
}